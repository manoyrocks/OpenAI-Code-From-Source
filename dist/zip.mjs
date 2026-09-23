// Stored ZIP writer: no third-party scripts, compression, or network service.
const encoder = new TextEncoder();
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) { crc ^= byte; for(let bit=0;bit<8;bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0); }
  return (crc ^ 0xffffffff) >>> 0;
}
function header(size) { const bytes = new Uint8Array(size); return {bytes, view:new DataView(bytes.buffer)}; }
export function makeZip(files) {
  const chunks=[], central=[]; let offset=0, centralSize=0;
  for (const [path, text] of Object.entries(files)) {
    if (!/^[a-zA-Z0-9_.\-/]+$/.test(path) || path.startsWith('/') || path.split('/').some(p=>!p || p==='..' || p==='.') || typeof text !== 'string') throw Error('Unsafe archive entry');
    const name=encoder.encode(path), body=encoder.encode(text), crc=crc32(body);
    if (body.length > 2_000_000) throw Error('File too large');
    const local=header(30), v=local.view;
    v.setUint32(0,0x04034b50,true); v.setUint16(4,20,true); v.setUint16(6,0x800,true); v.setUint16(12,33,true);
    v.setUint32(14,crc,true); v.setUint32(18,body.length,true); v.setUint32(22,body.length,true); v.setUint16(26,name.length,true);
    chunks.push(local.bytes,name,body);
    const dir=header(46), d=dir.view;
    d.setUint32(0,0x02014b50,true);d.setUint16(4,20,true);d.setUint16(6,20,true);d.setUint16(8,0x800,true);d.setUint16(14,33,true);
    d.setUint32(16,crc,true);d.setUint32(20,body.length,true);d.setUint32(24,body.length,true);d.setUint16(28,name.length,true);d.setUint32(42,offset,true);
    central.push(dir.bytes,name); centralSize+=46+name.length; offset+=30+name.length+body.length;
  }
  const end=header(22), v=end.view, count=Object.keys(files).length;
  v.setUint32(0,0x06054b50,true);v.setUint16(8,count,true);v.setUint16(10,count,true);v.setUint32(12,centralSize,true);v.setUint32(16,offset,true);
  return new Blob([...chunks,...central,end.bytes],{type:'application/zip'});
}

try {
  const palette = localStorage.getItem('ofd-palette');
  if (['ocean', 'violet', 'ember', 'forest'].includes(palette)) document.documentElement.dataset.palette = palette;
  if (localStorage.getItem('ofd-theme') === 'dark') document.documentElement.classList.add('dark');
} catch {}

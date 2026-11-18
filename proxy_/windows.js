// Draggable, stackable windows
(() => {
  let z = 20;
  const raise = w => (w.style.zIndex = ++z);
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-open]');
    if (!b) return;
    const w = document.getElementById(b.dataset.open), frame = w.querySelector('iframe');
    if (frame && !frame.getAttribute('src')) frame.src = w.dataset.src;
    w.hidden = false; raise(w);
  });

  document.querySelectorAll('.win').forEach(w => {
    const bar = w.querySelector('header');
    w.addEventListener('pointerdown', () => raise(w));
    if (!w.hasAttribute('data-pinned')) bar.querySelector('.x')?.addEventListener('click', () => { w.hidden = true; });
    bar.addEventListener('pointerdown', e => {
      if (e.target.closest('button, a')) return;
      const r = w.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top;
      bar.setPointerCapture(e.pointerId);
      const bar0 = document.querySelector('.topbar')?.offsetHeight ?? 0;
      const move = m => { w.style.left = m.clientX - dx + 'px'; w.style.top = Math.max(bar0, m.clientY - dy) + 'px'; };
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', () => bar.removeEventListener('pointermove', move), { once: true });
    });
  });
})();

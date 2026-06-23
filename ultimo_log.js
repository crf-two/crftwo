window.LATEST_LOG = { message: 'Adiciona Seletor UC x Evaporador', dateIso: '2026-06-23T19:36:47-03:00' };

(function adicionarSeletorUcEvaporador() {
  function montar() {
    if (document.querySelector('a[href="seletor-evaporador.html"]')) return;
    var grid = document.getElementById('gridCamara');
    if (!grid) return;
    grid.insertAdjacentHTML('beforeend', '<a class="tool-card" href="seletor-evaporador.html" style="--card-color:#10b981" title="Cruza UC Danfoss com evaporador Trineva compatível."><div class="tool-top"><div class="icon-box"><svg viewBox="0 0 24 24"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h10"></path><path d="M17 15l2 2 4-4"></path></svg></div><span class="tool-kind">Câmara fria</span></div><div class="tool-body"><div class="tool-name">Seletor UC x Evaporador</div><p class="tool-short">Danfoss x Trineva.</p><span class="tool-action">Abrir</span></div><div class="detail-pop">Indica o menor evaporador Trineva compatível com a UC Danfoss pela evaporação e ambiente informados.</div></a>');
    var camaraTitle = document.getElementById('camaraTitle');
    var section = camaraTitle && camaraTitle.closest ? camaraTitle.closest('.section') : null;
    var count = section && section.querySelector ? section.querySelector('.section-count') : null;
    if (count) count.textContent = '4 ferramentas';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();

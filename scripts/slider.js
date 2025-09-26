// scripts/slider.js
// 編集: 画像追加は index.html の <img> タグを増やすだけでOK
// スワイプ対応・フェード切替・自動ループ
(function() {
  const container = document.getElementById('slider-container');
  if (!container) return;
  const slides = Array.from(container.querySelectorAll('img'));
  let current = 0;
  let timer;

  function showSlide(idx) {
    slides.forEach((img, i) => {
      img.style.opacity = i === idx ? '1' : '0';
      img.style.display = i === idx ? '' : 'none';
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startLoop() {
    timer = setInterval(nextSlide, 4000);
  }

  function stopLoop() {
    clearInterval(timer);
  }

  // タッチスワイプ
  let startX = null;
  container.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    stopLoop();
  });
  container.addEventListener('touchend', e => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
      showSlide((current - 1 + slides.length) % slides.length);
    } else if (startX - endX > 50) {
      nextSlide();
    }
    startX = null;
    startLoop();
  });

  showSlide(0);
  startLoop();
})();

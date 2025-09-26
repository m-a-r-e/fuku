
// Swiper.jsによるレスポンシブスライダー
function decodeHTMLEntities(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

async function loadCarouselImages() {
  const res = await fetch('src/assets/carousel/');
  const text = await res.text();
  const files = Array.from(text.matchAll(/href="(?:[^"/]*\/)?([^"/]+\.(jpg|jpeg|png|webp|gif))"/gi)).map(m => decodeHTMLEntities(m[1])).sort();
  const sliderContainer = document.getElementById('slider-container');
  sliderContainer.innerHTML = '';

  // Swiper構造を生成
  const swiperEl = document.createElement('div');
  swiperEl.className = 'swiper w-full';
  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';
  files.forEach((file, idx) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    const img = document.createElement('img');
    img.src = file;
    img.alt = '寿司画像' + (idx+1);
    img.className = 'w-full';
    img.style.aspectRatio = '3/4';
    img.style.objectFit = 'cover';
    img.loading = 'lazy';
    slide.appendChild(img);
    wrapper.appendChild(slide);
  });
  swiperEl.appendChild(wrapper);
  // ドットのみ
  const pag = document.createElement('div'); pag.className = 'swiper-pagination';
  swiperEl.appendChild(pag);
  sliderContainer.appendChild(swiperEl);

  // Swiper初期化
  const swiper = new Swiper('.swiper', {
    loop: true,
    centeredSlides: false,
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      }
    }
  });
}

async function loadFooterImages() {
  const res = await fetch('src/assets/footer/');
  const text = await res.text();
  const files = Array.from(text.matchAll(/href="(?:[^"/]*\/)?([^"/]+\.(jpg|jpeg|png|webp|gif))"/gi)).map(m => decodeHTMLEntities(m[1])).sort();
  const footerContainer = document.getElementById('footer-images');
  footerContainer.innerHTML = '';
  for(let i=0; i<20; i++) {
    const img = document.createElement('img');
    img.src = files[i % files.length];
    img.className = 'h-32 w-auto object-contain flex-shrink-0';
    img.loading = 'lazy';
    footerContainer.appendChild(img);
  }
}

function adjustSliderMargin() {
  const slider = document.querySelector('.slider');
  if(window.innerWidth <= 768) {
    slider.style.marginTop = '136px';
  } else {
    slider.style.marginTop = '176px';
  }
}
window.addEventListener('resize', adjustSliderMargin);
adjustSliderMargin();
loadCarouselImages();
loadFooterImages();

// フッタのPageTopアンカーをスムーズスクロールに
document.addEventListener('DOMContentLoaded', () => {
  const pageTop = document.querySelector('a[href="#top"]');
  if(pageTop) {
    pageTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

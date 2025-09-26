
// Swiper.jsによるレスポンシブスライダー
function decodeHTMLEntities(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

async function loadCarouselImages() {
  const sliderContainer = document.getElementById('slider-container');
  sliderContainer.innerHTML = '';

  // IMG_0.jpg 〜 IMG_9.jpg を順に試す
  const maxImages = 10;
  const swiperEl = document.createElement('div');
  swiperEl.className = 'swiper w-full';
  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';
  for(let i=0; i<maxImages; i++) {
    const file = "assets/carousel/IMG_" + i + ".jpg";
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    const img = document.createElement('img');
    img.src = file;
    img.alt = '寿司画像' + (i+1);
    img.className = 'w-full';
    img.style.aspectRatio = '3/4';
    img.style.objectFit = 'cover';
    img.loading = 'lazy';
    img.onerror = function() { this.remove(); };
    slide.appendChild(img);
    wrapper.appendChild(slide);
  }
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
  const footerContainer = document.getElementById('footer-images');
  footerContainer.innerHTML = '';
  // 画像ファイル名を配列で用意
  const files = [];
  for(let i=0; i<10; i++) {
    files.push(`assets/footer/IMG_${i}.jpg`);
  }
  // 20枚分繰り返し表示
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

document.addEventListener('DOMContentLoaded', () => {
  adjustSliderMargin();
  loadCarouselImages();
  loadFooterImages();

  // フッタのPageTopアンカーをスムーズスクロールに
  const pageTop = document.querySelector('a[href="#top"]');
  if(pageTop) {
    pageTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ...existing code...

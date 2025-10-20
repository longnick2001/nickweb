// script.js - tạo hoa & trái tim động, handle nút bấm
document.addEventListener("DOMContentLoaded", function () {
  const layer = document.getElementById('float-layer');
  const sendBtn = document.getElementById('sendWish');
  const wishPopup = document.getElementById('wish-popup');
  const closeWish = document.getElementById('closeWish');
  const wishText = document.getElementById('wish-text');

  // (Toàn bộ phần code còn lại giữ nguyên ở đây)
 // Utility: random int/float
  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (a, b) => Math.floor(rand(a, b + 1));

  // create a heart DOM element and animate it upward
  function spawnHeart(xPercent) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    // starting horizontal position as percentage of width
    const startLeft = (typeof xPercent === 'number') ? xPercent : rand(5, 95);
    heart.style.left = `${startLeft}%`;
    // give slight random starting bottom offset so they appear from below card
    heart.style.bottom = `${rand(-6, 6)}vh`;
    const size = rand(18, 34);
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    // add small rotation and floating animation duration
    const dur = rand(6, 14);
    heart.style.animation = `floatUp ${dur}s cubic-bezier(.2,.9,.2,1) forwards`;
    heart.style.transform = `translateZ(0) rotate(${rand(-30,30)}deg)`;

    // optional beat
    if (Math.random() > 0.4) heart.classList.add('beat');

    // small horizontal drift via translateX animation using inline keyframe-like approach
    const drift = rand(-8, 8);
    heart.animate([
      { transform: `translateX(0) rotate(${rand(-10,10)}deg)` },
      { transform: `translateX(${drift}px) rotate(${rand(-30,30)}deg)` }
    ], { duration: dur * 1000, easing: 'ease-in-out', fill: 'forwards' });

    layer.appendChild(heart);

    // remove after animation end
    setTimeout(() => {
      if (heart && heart.parentNode) heart.parentNode.removeChild(heart);
    }, dur * 1000 + 200);
  }

  // create a flower DOM element (SVG-like via divs)
  function spawnFlower(xPercent) {
    const f = document.createElement('div');
    f.className = 'flower';
    const startLeft = (typeof xPercent === 'number') ? xPercent : rand(8, 92);
    f.style.left = `${startLeft}%`;
    f.style.bottom = `${rand(-8, 6)}vh`;
    const size = rand(26, 56);
    f.style.width = `${size}px`;
    f.style.height = `${size}px`;

    const petals = 5;
    for (let i = 0; i < petals; i++) {
      const p = document.createElement('div');
      p.className = `petal p${i+1}`;
      // change color slightly
      p.style.background = `radial-gradient(circle at 30% 20%, #fff, rgba(255,255,255,0.3)), linear-gradient(180deg, ${pickFlowerShade()} , ${pickFlowerShade(true)})`;
      f.appendChild(p);
    }
    const c = document.createElement('div');
    c.className = 'center';
    f.appendChild(c);

    const dur = rand(8, 16);
    f.style.animation = `floatUpFlowers ${dur}s linear forwards`;
    // small spin variation
    f.style.transform = `translateZ(0) rotate(${rand(-15,15)}deg)`;

    layer.appendChild(f);
    setTimeout(() => {
      if (f && f.parentNode) f.parentNode.removeChild(f);
    }, dur * 1000 + 200);
  }

  // pick pretty flower colors
  function pickFlowerShade(alt = false) {
    const pinks = [
      ['#ffd1f0','#ff8ccf'],
      ['#ffe5d6','#ff9b6b'],
      ['#ffe6f7','#ff9fe6'],
      ['#ffdede','#ff7fb5'],
      ['#fff2c9','#ffd36b']
    ];
    const choice = pinks[randInt(0, pinks.length - 1)];
    return alt ? choice[1] : choice[0];
  }

  // on load: spawn some decorative corner hearts (static subtle)
  function createCornerHearts() {
    const h1 = document.createElement('div');
    h1.className = 'corner-heart top-left';
    h1.innerHTML = '<div class="heart" style="width:60px;height:60px; transform: rotate(10deg);"><span></span></div>';
    document.body.appendChild(h1);

    const h2 = document.createElement('div');
    h2.className = 'corner-heart bottom-right';
    h2.innerHTML = '<div class="heart" style="width:60px;height:60px; transform: rotate(-12deg);"><span></span></div>';
    document.body.appendChild(h2);
  }

  // gentle continuous spawn for ambient effect
  let ambientInterval;
  function startAmbient() {
    // create small random bursts periodically
    ambientInterval = setInterval(() => {
      // every tick spawn 1-3 hearts and sometimes flowers
      const heartsCount = randInt(1, 3);
      for (let i = 0; i < heartsCount; i++) {
        spawnHeart(rand(10, 90));
      }
      if (Math.random() > 0.6) spawnFlower(rand(8, 92));
    }, 900);
  }

  // On click event: big burst + show popup text
  function burstCelebrate() {
    // big burst: hearts + flowers in quick succession across width
    for (let i = 0; i < 18; i++) {
      setTimeout(() => spawnHeart(rand(5,95)), i * 60);
      if (i % 3 === 0) setTimeout(() => spawnFlower(rand(8,92)), i * 70);
    }
  }

  // handle button events
  sendBtn.addEventListener('click', () => {
    // show popup
    //wishPopup.hidden = false;
    // burst visuals
    burstCelebrate();
    // small text animation
    animateWishText();
  });
  closeWish.addEventListener('click', () => {
    wishPopup.hidden = true;
  });

  function animateWishText() {
    const messages = [
      "Chúc bạn luôn xinh đẹp, hạnh phúc và đầy yêu thương!",
      "Cảm ơn vì đã làm thế giới này dịu dàng hơn.",
      "Mong bạn có một ngày 20/10 thật rạng rỡ!",
      "Luôn tỏa sáng theo cách riêng của mình ✨"
    ];
    let i = 0;
    wishText.style.opacity = 0;
    const step = () => {
      wishText.textContent = messages[i % messages.length];
      wishText.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, fill: 'forwards' });
      i++;
      if (i < messages.length) {
        setTimeout(step, 1400);
      }
    };
    step();
  }

  // start ambient on page ready
  document.addEventListener('DOMContentLoaded', () => {
    createCornerHearts();
    startAmbient();
  });

  // also trigger DOMContentLoaded handler now if script loaded after DOM
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // small delay to allow CSS to apply
    setTimeout(() => {
      createCornerHearts();
      startAmbient();
    }, 30);
  }

  // cleanup on unload (good practice)
  window.addEventListener('beforeunload', () => {
    clearInterval(ambientInterval);
  });
});

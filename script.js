document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendWish");
  const closeWish = document.getElementById("closeWish");
  const wishPopup = document.getElementById("wish-popup");
  const floatLayer = document.getElementById("float-layer");
  const wishText = document.getElementById('wish-text');

  // Mở popup
  sendBtn.addEventListener("click", () => {
    wishPopup.classList.add("show");
    animateWishText();
    spawnBurst();
  });

  // Đóng popup
  closeWish.addEventListener("click", () => {
    
    wishPopup.classList.remove("show");
    
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
        setTimeout(step, 1500);
      }
    };
    step();
  }

  // Random tiện ích
  const rand = (min, max) => Math.random() * (max - min) + min;

  // Tạo trái tim bay lên
  function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = `${rand(5, 95)}%`;
    heart.style.bottom = "0px";
    heart.style.animation = `floatUp ${rand(6, 12)}s linear forwards`;
    floatLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }

  // Hiệu ứng khi gửi lời chúc
  function spawnBurst() {
    for (let i = 0; i < 15; i++) {
      setTimeout(spawnHeart, i * 150);
    }
  }

  // Hiệu ứng nền trái tim nhẹ nhàng
  setInterval(() => {
    if (Math.random() > 0.5) spawnHeart();
  }, 1000);
});


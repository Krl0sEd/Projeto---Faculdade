// Carrousel do banner da home
document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slides img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let slideInterval = setInterval(nextSlide, 5000);

  function updateSlide() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
    updateDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  }

  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      currentIndex = idx;
      updateSlide();
      resetInterval();
    });
  });

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  updateSlide();
});

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. ONBOARDING SPOTLIGHT OVERLAY DISMISSAL
     ========================================== */
  const spotlightOverlay = document.getElementById('spotlightOverlay');
  const recommendedSection = document.getElementById('recommendedSection');

  function dismissSpotlight() {
    document.body.classList.remove('onboarding-active');
  }

  if (spotlightOverlay) {
    spotlightOverlay.addEventListener('click', dismissSpotlight);
  }

  if (recommendedSection) {
    recommendedSection.addEventListener('click', dismissSpotlight);
  }


  /* ==========================================
     2. PROFILE COMPLETION HOVER ANIMATION
     (Counter Starts & Progress Bar Animates on Hover)
     ========================================== */
  const completionItems = document.querySelectorAll('.completion-item');

  function runCompletionAnimation(item) {
    const targetVal = parseFloat(item.getAttribute('data-target'));
    const counterText = item.querySelector('.counter-text');
    const progressBar = item.querySelector('.progress-fill');

    if (item.animFrame) {
      cancelAnimationFrame(item.animFrame);
    }

    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth; // Force Reflow

    progressBar.style.transition = 'width 1.2s cubic-bezier(0.1, 0.5, 0.1, 1)';
    progressBar.style.width = `${targetVal}%`;

    const duration = 1200;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = targetVal * easeProgress;

      counterText.textContent = `${currentCount.toFixed(2)}%`;

      if (progress < 1) {
        item.animFrame = requestAnimationFrame(updateCounter);
      } else {
        counterText.textContent = targetVal === 100 ? '100%' : `${targetVal}%`;
      }
    }

    item.animFrame = requestAnimationFrame(updateCounter);
  }

  completionItems.forEach((item) => {
    runCompletionAnimation(item);

    item.addEventListener('mouseenter', () => {
      runCompletionAnimation(item);
    });
  });


  /* ==========================================
     3. DASHBOARD TOGGLE BUTTONS
     ========================================== */
  const personalBtn = document.getElementById('personalBtn');
  const businessBtn = document.getElementById('businessBtn');

  if (personalBtn && businessBtn) {
    personalBtn.addEventListener('click', () => {
      personalBtn.classList.add('active');
      businessBtn.classList.remove('active');
    });

    businessBtn.addEventListener('click', () => {
      businessBtn.classList.add('active');
      personalBtn.classList.remove('active');
    });
  }


  /* ==========================================
     4. MY OFFERS CAROUSEL SLIDER
     ========================================== */
  const slides = document.querySelectorAll('.offer-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let autoSlideTimer;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    });

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  if (slides.length > 0) {
    startAutoSlide();
  }

});
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  // Toggle the mobile menu visibility
  hamburger.addEventListener("click", function () {
    mobileMenu.style.display =
      mobileMenu.style.display === "block" ? "none" : "block";
  });
});

// Add this script at the end of the HTML file or in an external JS file
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");

  // Check if the page has been scrolled more than 50 pixels (adjust if needed)
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled"); // Add the shadow class
  } else {
    navbar.classList.remove("scrolled"); // Remove the shadow class
  }
});

//Sign-up button
// const signUpButton = document.getElementById("sign-up-btn");
// signUpButton.addEventListener("click", function () {
//   window.location.href = "{% url 'login' %}";
// });

// Add animation when cards come into view
const cards = document.querySelectorAll(".card");

const cards_observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
  }
);

cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  cards_observer.observe(card);
});

// Add hover effect
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
  });
});

// personalized features

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observe all feature cards
document.querySelectorAll(".feature-card").forEach((card) => {
  observer.observe(card);
});

// AI bot section
const smart_observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  }
);

document.querySelectorAll(".smart-container").forEach((container) => {
  smart_observer.observe(container);
});

// Frequently asked question section
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const currentlyActive = document.querySelector(".faq-item.active");

    if (currentlyActive && currentlyActive !== item) {
      currentlyActive.classList.remove("active");
    }

    item.classList.toggle("active");
  });
});

// Add keyboard accessibility
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      question.click();
    }
  });
});

// Popular Diet Section JS
const carousel = document.querySelector('.diet-carousel');
const popular_cards = document.querySelectorAll('.diet-card');
const dotsContainer = document.querySelector('.dots-container');
const totalCards = popular_cards.length;
let currentIndex = 0;
const visibleCards = 3;
let cardWidth;

function createDots() {
  const numberOfDots = Math.ceil(totalCards / visibleCards);
  dotsContainer.innerHTML = '';
  for (let i = 0; i < numberOfDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function updateLayout() {
  const containerWidth = carousel.parentElement.offsetWidth - 100;
  cardWidth = containerWidth / visibleCards;

  popular_cards.forEach(card => {
    card.style.flex = `0 0 ${cardWidth}px`;
    card.style.width = `${cardWidth}px`;
  });

  createDots();
  goToSlide(0);
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === Math.floor(currentIndex / visibleCards)) {
      dot.classList.add('active');
    }
  });
}

function goToSlide(index) {
  currentIndex = index * visibleCards;
  if (currentIndex > totalCards - visibleCards) {
    currentIndex = totalCards - visibleCards;
  }
  carousel.style.transform = `translateX(-${currentIndex * (cardWidth + 30)}px)`;
  updateDots();
}

function nextSlide() {
  if (currentIndex < totalCards - visibleCards) {
    currentIndex++;
    carousel.style.transform = `translateX(-${currentIndex * (cardWidth + 30)}px)`;
    updateDots();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    carousel.style.transform = `translateX(-${currentIndex * (cardWidth + 30)}px)`;
    updateDots();
  }
}

// Initialize layout
updateLayout();

// Update layout on window resize
window.addEventListener('resize', updateLayout);

// Add touch support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX) nextSlide();
  if (touchEndX > touchStartX) prevSlide();
});

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

// How its works

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
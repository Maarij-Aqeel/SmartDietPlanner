document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput")
  const filterButtons = document.querySelectorAll(".filter-btn")
  const planCards = document.querySelectorAll(".plan-card")
  const noResults = document.getElementById("noResults")
  const plansContainer = document.getElementById("plansContainer")

  let currentFilter = "all"

  // Search functionality
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase().trim()
    filterPlans(searchTerm, currentFilter)
  })

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      currentFilter = this.getAttribute("data-filter")
      const searchTerm = searchInput.value.toLowerCase().trim()
      filterPlans(searchTerm, currentFilter)
    })
  })

  // Main filtering function
  function filterPlans(searchTerm, filter) {
    let visibleCount = 0

    planCards.forEach((card) => {
      const title = card.querySelector(".plan-title").textContent.toLowerCase()
      const description = card.querySelector(".description").textContent.toLowerCase()
      const tags = card.getAttribute("data-tags").toLowerCase()

      // Check if card matches search term
      const matchesSearch =
        searchTerm === "" || title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)

      // Check if card matches filter
      const matchesFilter = filter === "all" || tags.includes(filter)

      if (matchesSearch && matchesFilter) {
        card.classList.remove("hidden")
        visibleCount++
      } else {
        card.classList.add("hidden")
      }
    })

    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.style.display = "block"
      plansContainer.style.display = "none"
    } else {
      noResults.style.display = "none"
      plansContainer.style.display = "grid"
    }
  }

  // Clear search functionality (ESC key)
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      this.value = ""
      filterPlans("", currentFilter)
      this.blur() // Remove focus from input
    }
  })

  // Optional: Add search on Enter key
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault()
      const searchTerm = this.value.toLowerCase().trim()
      filterPlans(searchTerm, currentFilter)
    }
  })

  // Optional: Clear search button functionality
  function addClearButton() {
    const clearBtn = document.createElement("button")
    clearBtn.innerHTML = "×"
    clearBtn.className = "clear-search-btn"
    clearBtn.style.cssText = `
            position: absolute;
            right: 45px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 20px;
            color: #999;
            cursor: pointer;
            display: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            line-height: 1;
        `

    searchInput.parentNode.appendChild(clearBtn)

    // Show/hide clear button
    searchInput.addEventListener("input", function () {
      clearBtn.style.display = this.value ? "block" : "none"
    })

    // Clear search on click
    clearBtn.addEventListener("click", function () {
      searchInput.value = ""
      filterPlans("", currentFilter)
      this.style.display = "none"
      searchInput.focus()
    })
  }

  // Initialize clear button
  addClearButton()
})

/* jshint esversion: 6 */
/* jshint esversion: 8 */


document.addEventListener("DOMContentLoaded", function () {


  // 2. Dropdown toggle icon logic
  const dropdownToggle = document.getElementById("recipesDropdown");
  const dropdownMenu = document.querySelector(
    "#recipesDropdown + .dropdown-menu"
  );
  const dropdownIcon = document.querySelector("#dropdown-icon i");

  if (dropdownToggle && dropdownMenu && dropdownIcon) {
    dropdownToggle.addEventListener("shown.bs.dropdown", function () {
      dropdownIcon.classList.remove("fa-chevron-down");
      dropdownIcon.classList.add("fa-chevron-up");
    });
    dropdownToggle.addEventListener("hidden.bs.dropdown", function () {
      dropdownIcon.classList.remove("fa-chevron-up");
      dropdownIcon.classList.add("fa-chevron-down");
    });
  }

  // 4. Ripple effect on .btn-nav buttons
  document.querySelectorAll(".btn-nav").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");

      const rect = this.getBoundingClientRect();
      ripple.style.width = ripple.style.height =
        Math.max(rect.width, rect.height) + "px";
      ripple.style.left =
        e.clientX - rect.left - parseInt(ripple.style.width) / 2 + "px";
      ripple.style.top =
        e.clientY - rect.top - parseInt(ripple.style.height) / 2 + "px";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Like button AJAX handling with smooth scroll to like section
  document.querySelectorAll('form[id^="like-form-"]').forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // prevent full page reload

      const postId = form.dataset.postId;
      const url = form.action;
      const csrftoken = form.querySelector("[name=csrfmiddlewaretoken]").value;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
            "X-Requested-With": "XMLHttpRequest",
          },
        });

        if (response.ok) {
          const data = await response.json(); // Expecting JSON from backend
          const container = document.querySelector(`#like-container-${postId}`);

          // Replace the container HTML with updated button + count
          container.innerHTML = data.html;

          // Scroll smoothly to the like section to prevent jumping
          const likeSection = document.getElementById(`like-section-${postId}`);
          if (likeSection) {
            likeSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else {
          console.error("Failed to toggle like");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  // 5. Recipe filter highlighting
  const filterButtons = document.querySelectorAll(".filter-option");
  const recipeCards = document.querySelectorAll(".card[data-age-group]");
  let activeFilter = null;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      activeFilter = activeFilter === filter ? null : filter;

      filterButtons.forEach((btn) => {
        btn.classList.toggle(
          "active",
          btn.getAttribute("data-filter") === activeFilter
        );
      });

      recipeCards.forEach((card) => {
        if (!activeFilter) {
          card.classList.remove("filtered-highlight");
        } else {
          if (card.getAttribute("data-age-group") === activeFilter) {
            card.classList.add("filtered-highlight");
          } else {
            card.classList.remove("filtered-highlight");
          }
        }
      });
    });
  });

  // 6. Order form select open/close class toggle
  const select = document.querySelector(".order-form select");
  if (select) {
    select.addEventListener("mousedown", () => {
      select.classList.add("open");
    });

    select.addEventListener("change", () => {
      select.classList.remove("open");
    });

    select.addEventListener("blur", () => {
      select.classList.remove("open");
    });
  }

  // 7. Add your other JS code here (edit buttons, delete modals, etc.)
});



  document.addEventListener("DOMContentLoaded", function () {
    const allRecipesLink = document.getElementById("allRecipesLink");

    if (allRecipesLink) {
      allRecipesLink.addEventListener("click", function (e) {
        const currentHash = window.location.hash;
        const targetHash = this.getAttribute("href");

        if (currentHash === targetHash) {
          e.preventDefault(); // prevent default scroll
          window.location.reload(); // force page reload
        }
      });
    }
  });


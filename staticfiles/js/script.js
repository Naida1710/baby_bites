/* jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", function () {

  // -----------------------------
  // 🍽️ Dropdown Toggle Icon Logic
  // -----------------------------
  const dropdownToggle = document.getElementById("recipesDropdown");
  const dropdownMenu = document.querySelector("#recipesDropdown + .dropdown-menu");
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

  // -----------------------------
  // 🌊 Ripple Effect on .btn-nav Buttons
  // -----------------------------
  document.querySelectorAll(".btn-nav").forEach(button => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");

      const rect = this.getBoundingClientRect();
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + "px";
      ripple.style.left = e.clientX - rect.left - parseInt(ripple.style.width) / 2 + "px";
      ripple.style.top = e.clientY - rect.top - parseInt(ripple.style.height) / 2 + "px";

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // -----------------------------
  // ❤️ Like Button AJAX Handling
  // -----------------------------
  document.querySelectorAll('form[id^="like-form-"]').forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
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
          const data = await response.json();
          const container = document.querySelector(`#like-container-${postId}`);
          if (container) container.innerHTML = data.html;

          const likeSection = document.getElementById(`like-section-${postId}`);
          if (likeSection) likeSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          console.error("Failed to toggle like");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  // -----------------------------
  // 🔽 Order Form Select Open/Close Toggle
  // -----------------------------
  const select = document.querySelector(".order-form select");
  if (select) {
    select.addEventListener("mousedown", () => select.classList.add("open"));
    select.addEventListener("change", () => select.classList.remove("open"));
    select.addEventListener("blur", () => select.classList.remove("open"));
  }

  // -----------------------------
  // 🔄 Reload if Same Anchor Clicked
  // -----------------------------
  const allRecipesLink = document.getElementById("allRecipesLink");
  if (allRecipesLink) {
    allRecipesLink.addEventListener("click", function (e) {
      const currentHash = window.location.hash;
      const targetHash = this.getAttribute("href");
      if (currentHash === targetHash) {
        e.preventDefault();
        window.location.reload();
      }
    });
  }

});

document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggle = document.getElementById("recipesDropdown");
    const dropdownMenu = document.querySelector("#recipesDropdown + .dropdown-menu");
    const dropdownIcon = document.querySelector("#dropdown-icon i");

    if (dropdownToggle && dropdownMenu && dropdownIcon) {
      // When dropdown is shown
      dropdownToggle.addEventListener("shown.bs.dropdown", function () {
        dropdownIcon.classList.remove("fa-chevron-down");
        dropdownIcon.classList.add("fa-chevron-up");
      });

      // When dropdown is hidden
      dropdownToggle.addEventListener("hidden.bs.dropdown", function () {
        dropdownIcon.classList.remove("fa-chevron-up");
        dropdownIcon.classList.add("fa-chevron-down");
      });
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll(".circle");

    circles.forEach(circle => {
      let value = circle.getAttribute("data-value");
      circle.style.setProperty('--value', value + '%');
    });
  });





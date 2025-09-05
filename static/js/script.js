document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('recipesDropdown');
    const dropdownIcon = document.getElementById('dropdown-icon');

    if (!dropdownToggle || !dropdownIcon) return;

    dropdownToggle.addEventListener('shown.bs.dropdown', function () {
        dropdownIcon.innerHTML = '<i class="fas fa-minus"></i>';
    });

    dropdownToggle.addEventListener('hidden.bs.dropdown', function () {
        dropdownIcon.innerHTML = '<i class="fas fa-plus"></i>';
    });
});

  document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll(".circle");

    circles.forEach(circle => {
      let value = circle.getAttribute("data-value");
      circle.style.setProperty('--value', value + '%');
    });
  });


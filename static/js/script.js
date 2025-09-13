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
    const circles = document.querySelectorAll(".animated-circle");
  
    const animateCircle = (circle) => {
      const value = +circle.dataset.value;
      let current = 0;
  
      const update = () => {
        if (current <= value) {
          circle.style.background = `conic-gradient(#ff9f68 ${current}%, #eee ${current}%)`;
          circle.querySelector(".percent").textContent = `${current}%`;
          current++;
          requestAnimationFrame(update);
        }
      };
  
      update();
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCircle(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    circles.forEach((circle) => observer.observe(circle));
  });
  





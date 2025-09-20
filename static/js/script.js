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


  document.querySelectorAll('.btn-nav').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
        ripple.style.left = e.clientX - rect.left - (parseInt(ripple.style.width) / 2) + 'px';
        ripple.style.top = e.clientY - rect.top - (parseInt(ripple.style.height) / 2) + 'px';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


  // 🌊 Ripple Effect for .btn-nav buttons
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-nav').forEach(button => {
      button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
        ripple.style.left = e.clientX - rect.left - (parseInt(ripple.style.width) / 2) + 'px';
        ripple.style.top = e.clientY - rect.top - (parseInt(ripple.style.height) / 2) + 'px';

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // 🍽️ Recipe Filter Highlighting
    const filterButtons = document.querySelectorAll('.filter-option');
    const recipeCards = document.querySelectorAll('.card[data-age-group]');
    let activeFilter = null;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Toggle filter
        activeFilter = (activeFilter === filter) ? null : filter;

        // Update active button state
        filterButtons.forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-filter') === activeFilter);
        });

        // Highlight matching recipe cards
        recipeCards.forEach(card => {
          if (!activeFilter) {
            card.classList.remove('filtered-highlight');
          } else {
            if (card.getAttribute('data-age-group') === activeFilter) {
              card.classList.add('filtered-highlight');
            } else {
              card.classList.remove('filtered-highlight');
            }
          }
        });
      });
    });
  });


 
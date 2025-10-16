/* jshint esversion: 6 */

  document.addEventListener("DOMContentLoaded", function () {

    // 🍽️ Recipe Dropdown Icon Toggle
    const dropdownToggle = document.getElementById("recipesDropdown");
    const dropdownIcon = document.querySelector("#dropdown-icon i");

    if (dropdownToggle && dropdownIcon) {
      dropdownToggle.addEventListener("shown.bs.dropdown", function () {
        dropdownIcon.classList.remove("fa-chevron-down");
        dropdownIcon.classList.add("fa-chevron-up");
      });

      dropdownToggle.addEventListener("hidden.bs.dropdown", function () {
        dropdownIcon.classList.remove("fa-chevron-up");
        dropdownIcon.classList.add("fa-chevron-down");
      });
    }

    const tips = [
      "At <strong>8 months</strong>, most babies are ready for soft finger foods. Try tiny pieces of banana or avocado!<br>Don’t worry if your baby doesn’t finish — it’s all about exploring textures.",
      "Introduce a sippy cup with water during mealtime to help develop drinking skills.",
      "Avoid honey before 1 year — it can cause infant botulism.",
      "Let your baby touch, squish, and play with food. It helps with sensory learning.",
      "Try iron-rich foods like mashed lentils or pureed meats around 6 months."
    ];
    
    let currentTip = 0;
    const tipElement = document.getElementById("feeding-tip");
    
    function showNextTip() {
      if (tipElement) {
        tipElement.innerHTML = tips[currentTip];
        currentTip = (currentTip + 1) % tips.length;
      }
    }
    
    showNextTip();
    setInterval(showNextTip, 5000);
    

    // 🌊 Ripple Effect
    document.querySelectorAll('.btn-nav').forEach(button => {
      button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
        ripple.style.left = e.clientX - rect.left - (parseInt(ripple.style.width) / 2) + 'px';
        ripple.style.top = e.clientY - rect.top - (parseInt(ripple.style.height) / 2) + 'px';

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // 🍽️ Filter Highlighting
    const filterButtons = document.querySelectorAll('.filter-option');
    const recipeCards = document.querySelectorAll('.card[data-age-group]');
    let activeFilter = null;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        activeFilter = (activeFilter === filter) ? null : filter;

        filterButtons.forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-filter') === activeFilter);
        });

        recipeCards.forEach(card => {
          if (!activeFilter || card.getAttribute('data-age-group') === activeFilter) {
            card.classList.add('filtered-highlight');
          } else {
            card.classList.remove('filtered-highlight');
          }
        });
      });
    });

    // 🔽 Select dropdown UI improvement
    const select = document.querySelector('.order-form select');
    if (select) {
      select.addEventListener('mousedown', () => select.classList.add('open'));
      select.addEventListener('change', () => select.classList.remove('open'));
      select.addEventListener('blur', () => select.classList.remove('open'));
    }
  });



 
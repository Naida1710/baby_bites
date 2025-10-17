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
      "At <strong>8 months</strong>, most babies are ready for soft finger foods. Try small pieces of banana or avocado. Exploring textures is just as important as eating!",
      
      "Offer a <strong>sippy cup</strong> with water during meals. It builds coordination and helps your baby practice drinking from a cup.",
      
      "Skip <strong>honey</strong> until after 12 months — it can carry bacteria that cause infant botulism, a serious illness in babies.",
      
      "Let your baby <strong>play with food</strong> — squishing and touching helps them learn about textures and builds confidence with new tastes.",
      
      "Start offering <strong>iron-rich foods</strong> like mashed lentils, soft tofu, or pureed meats from 6 months to support healthy development.",

      "Offer a variety of <strong>colors and textures</strong> on the plate. It encourages curiosity and helps build a love for healthy foods early on.",

  "Try soft-cooked <strong>veggies</strong> like carrots or zucchini cut into baby-safe pieces. Steamed sticks are perfect for little hands to grab.",

  "Around 7–8 months, try introducing <strong>allergens</strong> like peanut butter (thinned) or eggs — but always one at a time and in small amounts.",

  "Babies learn by watching — eat together and let your little one <strong>see you enjoying healthy food</strong>. Mealtime is social, too!",

  "Don’t stress about mess — <strong>messy meals</strong> are normal and help with motor skills. Keep wipes nearby and let them explore freely!"
]

    
    
    
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



 
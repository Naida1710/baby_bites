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

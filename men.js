document.addEventListener("DOMContentLoaded", function() {
    // Function to update cart count in the navbar
    function updateCartCount(count) {
        var cartCountElem = document.getElementById('cart-count');
        if (cartCountElem) {
            cartCountElem.textContent = count;
        }
    }

    // Function to get cart count from localStorage
    function getCartCount() {
        return localStorage.getItem('cartCount') || 0;
    }

    // Function to increment cart count and update localStorage
    function incrementCartCount() {
        var count = getCartCount();
        count++;
        localStorage.setItem('cartCount', count);
        updateCartCount(count);
    }

    // Add click event listener to "Add To Cart" buttons
    var addToCartButtons = document.querySelectorAll('.btn');
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            incrementCartCount();
        });
    });

    // Update cart count on page load
    updateCartCount(getCartCount());
});

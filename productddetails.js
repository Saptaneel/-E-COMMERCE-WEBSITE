document.addEventListener("DOMContentLoaded", function() {
    var p = document.getElementById("productimg");
    var s = document.getElementsByClassName("smallimg");

    for (var i = 0; i < s.length; i++) {
        s[i].addEventListener("click", function() {
        p.src = this.src;
        });
    }
    });


    document.addEventListener("DOMContentLoaded", function() {
        // Get the cart icon element
        var cartIcon = document.querySelector(".navbar a[href='cart.html'] img");

        // Function to update the cart count displayed on the navbar
        function updateCartCount(count) {
            var cartCountBadge = document.getElementById("cartCountBadge");
            if (cartCountBadge) {
                cartCountBadge.textContent = count; // Update the count if badge exists
            } else {
                cartCountBadge = document.createElement("span");
                cartCountBadge.textContent = count;
                cartCountBadge.id = "cartCountBadge";
                cartIcon.insertAdjacentElement("afterend", cartCountBadge); // Insert the updated count badge after the cart icon
            }
        }

        // Add an event listener to the "Add to Cart" button
        var addToCartBtn = document.querySelector(".btn");
        if (addToCartBtn) { // Check if the button exists
            addToCartBtn.addEventListener("click", function(event) {
                event.preventDefault(); // Prevent the default action of the link
                var cartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
                var inputQty = parseInt(document.querySelector("input[type='number']").value) || 1; // Get the input value, default to 1 if empty or invalid
                cartItemCount += inputQty; // Increment the cart item count by the input value
                localStorage.setItem("cartItemCount", cartItemCount); // Store the updated count in localStorage
                updateCartCount(cartItemCount); // Update the cart count displayed on the navbar
            });
        }

        // Initialize the cart count on page load
        var initialCartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
        localStorage.setItem("cartItemCount", 0); // Reset the cart count to 0
        updateCartCount(initialCartItemCount); // Update the cart count displayed on the navbar
    });

    document.addEventListener("DOMContentLoaded", function() {
            var addToCartBtn = document.querySelector(".btn");
            if (addToCartBtn) {
                addToCartBtn.addEventListener("click", function(event) {
                    event.preventDefault();
                    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
                    var productName = document.querySelector(".single-product h1").textContent;
                    var productPrice = document.querySelector(".single-product h4").textContent;
                    var productQty = parseInt(document.querySelector("input[type='number']").value) || 1;
                    var newItem = {
                        name: productName,
                        price: productPrice,
                        quantity: productQty
                    };
                    cartItems.push(newItem);
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    alert("Item added to cart!");
                });
            }

            var cartIcon = document.querySelector(".navbar a[href='cart.html'] img");

            function updateCartCount(count) {
                var cartCountBadge = document.getElementById("cartCountBadge");
                if (cartCountBadge) {
                    cartCountBadge.textContent = count;
                } else {
                    cartCountBadge = document.createElement("span");
                    cartCountBadge.textContent = count;
                    cartCountBadge.id = "cartCountBadge";
                    cartIcon.insertAdjacentElement("afterend", cartCountBadge);
                }
            }

            var initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            localStorage.setItem("cartItems", JSON.stringify(initialCartItems));
            var initialCartItemCount = initialCartItems.reduce((total, item) => total + item.quantity, 0);
            updateCartCount(initialCartItemCount);
        });
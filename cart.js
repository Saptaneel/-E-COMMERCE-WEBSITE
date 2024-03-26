document.addEventListener('DOMContentLoaded', function() {
    function formatCurrency(amount) {
        return "$" + amount.toFixed(2);
    }

    function calculateTotal() {
        var subtotal = 0;
        var cartRows = document.querySelectorAll('#cartTable tr');
        cartRows.forEach(function(row) {
            var price = parseFloat(row.cells[2].textContent.replace('$', ''));
            var quantity = parseInt(row.cells[1].querySelector('.cart-quantity').value);
            var rowSubtotal = price * quantity;
            row.cells[3].textContent = formatCurrency(rowSubtotal);
            subtotal += rowSubtotal;
        });
        document.getElementById('subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('total').textContent = formatCurrency(subtotal + 35); // Adding tax
    }

    function removeCartItem(button) {
        var row = button.parentElement.parentElement;
        row.remove();
        calculateTotal();
        saveCartItems(); // Save updated cart after removing item
    }

    function displayCartItems() {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        var cartTable = document.getElementById('cartTable');
        cartTable.innerHTML = ''; // Clear previous content

        cartItems.forEach(function(item) {
            cartTable.innerHTML += createCartItemHTML(item.name, item.price, item.quantity);
        });

        calculateTotal();
        addListenersToQuantityInputs();
        addListenersToRemoveButtons();
    }

    function createCartItemHTML(name, price, quantity) {
        return `
        <tr>
            <td>${name}</td>
            <td><input class="cart-quantity" type="number" value="${quantity}" min="1"></td>
            <td class="cart-price">${price}</td>
            <td class="cart-subtotal">${formatCurrency(parseFloat(price.replace('$', '')) * quantity)}</td>
            <td><button class="cart-remove">Remove</button></td>
        </tr>
        `;
    }

    function addListenersToQuantityInputs() {
        var quantityInputs = document.querySelectorAll('.cart-quantity');
        quantityInputs.forEach(function(input) {
            input.addEventListener('change', function() {
                calculateTotal();
                saveCartItems(); // Save updated cart after changing quantity
            });
        });
    }

    function addListenersToRemoveButtons() {
        var removeButtons = document.querySelectorAll('.cart-remove');
        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                removeCartItem(this);
            });
        });
    }

    function saveCartItems() {
        var cartRows = document.querySelectorAll('#cartTable tr');
        var cartItems = [];

        cartRows.forEach(function(row) {
            var name = row.cells[0].textContent;
            var price = row.cells[2].textContent;
            var quantity = parseInt(row.cells[1].querySelector('.cart-quantity').value);
            cartItems.push({ name: name, price: price, quantity: quantity });
        });

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Call displayCartItems function on page load
    displayCartItems();
});
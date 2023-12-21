// Selecting all checkboxes with class 'choco-checkbox'
const checkboxes = document.querySelectorAll('.choco-checkbox');

// Selecting elements to display selected chocolates and total price
const selectedList = document.querySelector('.selected-list');
const totalPrice = document.getElementById('total-price');

// Array to store selected chocolates
let selectedChocolates = [];

// Adding event listeners to each checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Retrieving price and name of the selected chocolate
        const price = parseFloat(this.getAttribute('data-price'));
        const name = this.nextElementSibling.textContent;

        if (this.checked) {
            // Checking if the maximum limit of selected chocolates (8) is reached
            if (selectedChocolates.length < 8) {
                // Adding selected chocolate to the array and updating the display
                selectedChocolates.push({ name, price });
                updateSelectedList();
            } else {
                // If the limit is reached, uncheck the checkbox and alert the user
                this.checked = false;
                alert('Maximum 8 chocolates allowed in the pack.');
            }
        } else {
            // Removing the deselected chocolate from the array and updating the display
            const index = selectedChocolates.findIndex(choco => choco.name === name);
            if (index !== -1) {
                selectedChocolates.splice(index, 1);
                updateSelectedList();
            }
        }
    });
});

// Function to update the list of selected chocolates and total price display
function updateSelectedList() {
    let totalPriceValue = 0;
    selectedList.innerHTML = '';

    // Iterating through selected chocolates and displaying them
    selectedChocolates.forEach(choco => {
        const listItem = document.createElement('li');
        listItem.textContent = `${choco.name}`;
        selectedList.appendChild(listItem);
        totalPriceValue += choco.price;
    });

    // Displaying the total price of selected chocolates
    totalPrice.textContent = totalPriceValue.toFixed(2);
}

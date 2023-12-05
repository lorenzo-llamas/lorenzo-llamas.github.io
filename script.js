// Function to toggle project options visibility
function toggleProjectOptions() {
    var projectRelated = document.getElementById('projectRelated');
    var projectOptions = document.getElementById('projectOptions');
    if (projectRelated.value === 'Yes') {
        projectOptions.style.display = 'block';
    } else {
        projectOptions.style.display = 'none';
    }
}

// Function to remove table row
function removeRow() {
    var removeButtons = document.querySelectorAll('.btn-danger');
    removeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            if (document.querySelectorAll('tbody tr').length > 1) {
                this.closest('tr').remove();
            }
        });
    });
}

// Function to add a new table row
function addRow() {
    var tableBody = document.querySelector('tbody');

    function createNewRowOnPartNumberInput() {
        var partNumberInputs = document.querySelectorAll('input[name="partNumber"]');
        partNumberInputs.forEach(function (input, index) {
            input.addEventListener('input', function (event) {
                var value = event.target.value.trim();
                if (value.length === 8 && index === partNumberInputs.length - 1) {
                    var newRow = `<tr>
                        <td><input type="text" name="partNumber" placeholder="Enter Part Number" class="form-control"></td>
                        <td><input type="text" placeholder="Description" class="form-control"></td>
                        <td><input type="number" placeholder="Enter Quantity" class="form-control"></td>
                        <td><input type="text" placeholder="Enter Comments" class="form-control"></td>
                        <td><button class="btn btn-danger">Remove</button></td>
                    </tr>`;
                    tableBody.insertAdjacentHTML('beforeend', newRow);
                    removeRow(); // Re-bind removeRow function after adding a new row
                    createNewRowOnPartNumberInput(); // Re-bind createNewRowOnPartNumberInput function after adding a new row
                    partNumberInputs[index + 1].focus(); // Move focus to the next part number input
                }
            });

            input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    if (index !== partNumberInputs.length - 1) {
                        partNumberInputs[index + 1].focus(); // Move focus to the next part number input
                    }
                }
            });
        });
    }

    // Add row when the "Add Row" button is clicked
    var addButton = document.getElementById('addRow');
    addButton.addEventListener('click', function () {
        var newRow = `<tr>
            <td><input type="text" name="partNumber" placeholder="Enter Part Number" class="form-control"></td>
            <td><input type="text" placeholder="Description" class="form-control"></td>
            <td><input type="number" placeholder="Enter Quantity" class="form-control"></td>
            <td><input type="text" placeholder="Enter Comments" class="form-control"></td>
            <td><button class="btn btn-danger">Remove</button></td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', newRow);
        removeRow(); // Re-bind removeRow function after adding a new row
        createNewRowOnPartNumberInput(); // Re-bind createNewRowOnPartNumberInput function after adding a new row
        var partNumberInputs = document.querySelectorAll('input[name="partNumber"]');
        partNumberInputs[partNumberInputs.length - 1].focus(); // Move focus to the newly added part number input
    });

    createNewRowOnPartNumberInput();
}

// Function to reset the form and table
function resetFormAndTable() {
    var resetButton = document.querySelector('.btn-warning');
    resetButton.addEventListener('click', function () {
        var inputs = document.querySelectorAll('input[type=text], input[type=number]');
        inputs.forEach(function (input) {
            input.value = '';
        });

        var tableBody = document.querySelector('tbody');
        var rows = tableBody.querySelectorAll('tr');
        if (rows.length > 1) {
            for (var i = 1; i < rows.length; i++) {
                rows[i].remove();
            }
        }

        // Reset department dropdown
        var departmentDropdown = document.getElementById('departmentDropdown');
        departmentDropdown.selectedIndex = 0;

        // Hide project options
        var projectOptions = document.getElementById('projectOptions');
        projectOptions.style.display = 'none';
    });
}

// Call functions on document load
document.addEventListener('DOMContentLoaded', function () {
    toggleProjectOptions();
    removeRow();
    addRow();
    resetFormAndTable();
});

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(document.getElementById('form'));

    fetch('https://script.google.com/macros/s/AKfycby7SFqqYDEMNcHXNWcPhAPLHWZMYSAwJxNeGphgRfM/dev', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Form submitted successfully!');
            document.getElementById('form').reset(); // Reset the form after successful submission
        } else {
            throw new Error('Form submission failed!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Form submission encountered an error. Please try again.'); // Generic error message
    });
});

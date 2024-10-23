const title = document.querySelector('.title'); // Selects the first element with "my-class"
const category = document.querySelector('.category'); // Selects all elements with "my-class"
const amount = document.querySelector('.amount'); // Selects all elements with "my-class"

cancelInputExpenses(() => {
  document.getElementsByClassName('title').value = '';
  document.getElementsByClassName('category').value = '';
  document.getElementsByClassName('amount').value = '';
});

const cancelButton = document.getElementById('cancelButton');

// Add click event listener to the button
cancelButton.addEventListener('click', () => {
  // Select all input fields with the class 'input-field'
  const inputs = document.querySelectorAll('.input-field');

  // Loop through each input field and add the 'hidden' class
  inputs.forEach((input) => {
    input.classList.add('hidden');
  });
});

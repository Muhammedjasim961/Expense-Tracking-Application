$(document).ready(() => {
  $(document).on('click', '.delete-expense', (e) => {
    e.preventDefault(); // Prevent default action

    const $target = $(e.target);
    const id = $target.attr('data-id');
    console.log('Deleting expense with ID:', id); // Log the ID

    if (confirm('Are you sure you want to delete this expense?')) {
      $.ajax({
        url: '/expense-table/' + id,
        type: 'DELETE',
        success: (response) => {
          alert('Expense deleted successfully');
          window.location.href = '/expense-table'; // Adjust this URL as needed
        },
        error: (err) => {
          console.log('Error deleting expense:', err);
        },
      });
    }
  });
});

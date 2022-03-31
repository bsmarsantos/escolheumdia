let updateForm = document.getElementById('updateForm');

function showHideForm() {
  if (updateForm.classList.value === 'd--none') {
    // Form is hidden and we have to show it
    updateForm.classList.remove('d--none')
  } else {
    // We have to hide the form
    updateForm.reset()
    updateForm.classList.add('d--none')
  }
}
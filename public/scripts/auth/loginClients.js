let form = document.getElementById('authForm');
let successEl = document.getElementById('successEl');

// Remove success message after 3s
setTimeout(() => {successEl.style.display = 'none'}, 3000);

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  let data = {}

  // SIGNIN
  let email = document.getElementById('loginEmail').value
  let password = document.getElementById('loginPassword').value
  data = {email, password}

  fetch(`${ baseUrl }/auth/clients`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  }).then( response => {
    if (response.status === 401) {
      alert('Utilizador ou password errada')
      form.reset()
    } else {
      window.location.href = `${baseUrl}/user`
    }
  }).catch(error => alert(error.message));
}
form.addEventListener("submit", handleSubmit)
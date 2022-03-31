let form = document.getElementById('authForm');
let successEl = document.getElementById('successEl');

// Remove success message after 3s
setTimeout(() => {successEl.style.display = 'none'}, 3000);

async function handleSubmit(event) {
  event.preventDefault();
  let data = {}

  if (document.getElementById('submitBtn').value === 'Login') {
    // SIGNIN
    let email = document.getElementById('loginEmail').value
    let password = document.getElementById('loginPassword').value
    data = {email, password}

    fetch(`${ baseUrl }/auth`, {
      method: "POST",
      mode: 'cors',
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
  } else {
    // SIGNUP
    let name = document.getElementById('signupName').value
    let email = document.getElementById('signupEmail').value
    let password = document.getElementById('signupPassword').value
    let rgpd = document.getElementById('signupRGPD').checked
    data = {name, email, password, rgpd}
    fetch(`${ baseUrl }/auth/signup`, {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    }).then( response => {
      if (response.status === 400) {
        alert('Utilizador já existe')
        form.reset()
      } else {
        alert('Utilizador criado com sucesso')
        window.location.href = `${baseUrl}/auth`
      }
    }).catch(error => alert(error.message));
  }
}

form.addEventListener("submit", handleSubmit)
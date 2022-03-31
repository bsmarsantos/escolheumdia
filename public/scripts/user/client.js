let form = document.getElementById("updateForm")

async function handleSubmit(event) {
  event.preventDefault()

  let data = {
    id: document.getElementById("clientId").value,
    logo: document.getElementById("clientLogo").value,
    name: document.getElementById("clientName").value,
    nif: document.getElementById("clientNIF").value,
    email: document.getElementById("clientEmail").value,
    street: document.getElementById("clientStreet").value,
    city: document.getElementById("clientCity").value,
    zip_code: document.getElementById("clientZipCode").value,
    country: document.getElementById("clientCountry").value,
    rgpd: document.getElementById("clientRGPD").checked
  }

  fetch(`${ baseUrl }/user/client`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status === 404) {
      alert('Algo correu mal')
    } else {
      alert('Cliente atualizado com sucesso')
      form.reset()
      form.classList.add('d--none')
      window.location.href = `${baseUrl}/user/clients`
    }
  }).catch(error => {
    alert(error)
  });
}

form.addEventListener("submit", handleSubmit)

function deleteClient(id) {
  let data = { id }

  fetch(`${ baseUrl }/user/client`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status === 404) {
      alert('Algo correu mal')
    } else {
      alert('Cliente apagado com sucesso')
      window.location.href = `${baseUrl}/user/clients`
    }
  }).catch(error => {
    alert(error)
  });
}

function updateClient(event) {
  let tableRow = event.target.parentNode.parentNode
  let data = { id: tableRow.getElementsByTagName('td')[1].innerText }

  fetch(`${ baseUrl }/user/getclient`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status === 404) {
      alert('Algo correu mal')
    } else {
      form.classList.remove('d--none')
      response.json().then( (res) => {
        document.getElementById("clientId").value = res.result[0].id,
        document.getElementById("clientLogo").value = res.result[0].logo,
        document.getElementById("clientName").value = res.result[0].name,
        document.getElementById("clientNIF").value = res.result[0].nif,
        document.getElementById("clientEmail").value = res.result[0].email,
        document.getElementById("clientStreet").value = res.result[0].street,
        document.getElementById("clientCity").value = res.result[0].city,
        document.getElementById("clientZipCode").value = res.result[0].zip_code,
        document.getElementById("clientCountry").value = res.result[0].country,
        document.getElementById("clientRGPD").checked = res.result[0].rgpd
      })
    }
  }).catch(error => {
    alert(error)
  });
}
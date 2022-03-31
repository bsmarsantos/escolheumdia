let form = document.getElementById("updateForm")

async function handleSubmit(event) {
  event.preventDefault()

  let data = {
    id: document.getElementById("serviceId").value,
    name: document.getElementById("serviceName").value,
    price: document.getElementById("servicePrice").value,
    duration: document.getElementById("serviceDuration").value,
  }

  fetch(`${ baseUrl }/user/services`, {
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
      alert('Serviço atualizado com sucesso')
      form.reset()
      form.classList.add('d--none')
      window.location.href = `${baseUrl}/user/services`
    }
  }).catch(error => {
    alert(error)
  });
}

form.addEventListener("submit", handleSubmit)

function deleteServices(id) {
  let data = { id }

  fetch(`${ baseUrl }/user/services`, {
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
      alert('Serviço apagado com sucesso')
      window.location.href = `${baseUrl}/user/services`
    }
  }).catch(error => {
    alert(error)
  });
}

function updateServices(event) {
  let tableRow = event.target.parentNode.parentNode
  let data = { id: tableRow.getElementsByTagName('td')[0].innerText }

  fetch(`${ baseUrl }/user/getService`, {
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
        document.getElementById("serviceId").value = res.result[0].id,
        document.getElementById("serviceName").value = res.result[0].name,
        document.getElementById("servicePrice").value = res.result[0].price,
        document.getElementById("serviceDuration").value = res.result[0].duration
      })
    }
  }).catch(error => {
    alert(error)
  });
}
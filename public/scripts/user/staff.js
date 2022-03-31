let form = document.getElementById("updateForm")

async function handleSubmit(event) {
  event.preventDefault()

  let data = {
    id: document.getElementById("staffId").value,
    photo: document.getElementById("staffPhoto").value,
    name: document.getElementById("staffName").value,
  }

  fetch(`${ baseUrl }/user/staff`, {
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
      alert('Funcionário atualizado com sucesso')
      form.reset()
      form.classList.add('d--none')
      window.location.href = `${baseUrl}/user/staff`
    }
  }).catch(error => {
    alert(error)
  });
}

form.addEventListener("submit", handleSubmit)

function deleteStaff(id) {
  let data = { id }

  fetch(`${ baseUrl }/user/staff`, {
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
      alert('Funcionário apagado com sucesso')
      window.location.href = `${baseUrl}/user/staff`
    }
  }).catch(error => {
    alert(error)
  });
}

function updateStaff(event) {
  let tableRow = event.target.parentNode.parentNode
  let data = { id: tableRow.getElementsByTagName('td')[1].innerText }

  fetch(`${ baseUrl }/user/getStaff`, {
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
        document.getElementById("staffId").value = res.result[0].id,
        document.getElementById("staffPhoto").value = res.result[0].photo,
        document.getElementById("staffName").value = res.result[0].name
      })
    }
  }).catch(error => {
    alert(error)
  });
}
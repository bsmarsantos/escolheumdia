function deleteReservation(id) {
  let data = { id }

  fetch(`${ baseUrl }/user/booking`, {
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
      window.location.href = `${baseUrl}/user/bookings`
    }
  }).catch(error => {
    alert(error)
  });
}
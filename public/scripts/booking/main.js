async function handleSubmit() {
  let data = {}

  let date_time = document.getElementById('reservationDate').value
  let id_client = document.getElementById('id_Client').value
  let id_service = document.getElementById('id_Service').value
  let id_staff = document.getElementById('id_Staff').value

  data = {date_time, id_client, id_service, id_staff}

  fetch(`${ baseUrl }/booking/reservation`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  }).then( response => {
    if (response.status === 401) {
      alert('ERRO')
    } else {
      alert('Reserva efetuada')
      window.location.href = `${baseUrl}/user/bookings`
    }
  }).catch(error => alert(error.message));
}
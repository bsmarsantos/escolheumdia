import { runQuery } from '../models/query.js';

/* Object that needs to be passed to every page */
const options = {
  title: 'booking',
  page: 'Reservas',
  error: '',
  success: '',
};

// Function that will fetch everything necessary to load the page
export const bookingPage = (req, res) => {
  // query will get everything from clients
  let query = `
    SELECT *
    FROM Clients
  `

  // function that will run the query
  runQuery(query, (err, result, fields) => {
    if (err) {
      // if there is an error
      res.status(404).send()
    } else {
      // will render the page booking.ejs with the result in data.clients
      res.render('booking', {data: { ...options, clients: result }});
    }
  })
}

// After choosing the client this is the next step, that is to show all services from that client
export const bookingClientPage = (req, res) => {
  // query that will get everything from services that have the id of the client the user choosed
  let query = `
    SELECT *
    FROM Services
    WHERE Services.id_client = ${ req.params.client }
  `

  // function to run the query
  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.render('bookingClient', {data: { ...options, services: result, id_client: req.params.client }});
    }
  })
}

export const bookingClientPage2 = (req, res) => {
  let query = `
    SELECT *
    FROM Staff
    WHERE Staff.id_client = ${ req.params.client }
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.render('bookingClient2', {data: { ...options, staff: result, id_client: req.params.client, id_service: req.params.service }});
    }
  })
}

export const bookingClientPage3 = (req, res) => {
  let id_client = req.params.client
  let id_service = req.params.service
  let id_staff = req.params.staff

  res.render('bookingClient3', {data: {
    ...options,
    id_staff,
    id_client,
    id_service
   }});
}

export const reservation = (req, res) => {
  let query = "INSERT INTO `Reservations`(`date_time`, `id_staff`, `id_service`, `id_user`) VALUES ('" + req.body.date_time + "', " + req.body.id_staff + ", " + req.body.id_service + ", " + req.session.user.id + ")"

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.render('bookingClient2', {data: { ...options, staff: result, id_client: req.params.client, id_service: req.params.service }});
    }
  })
}
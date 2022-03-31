import { runQuery } from '../models/query.js'

let options = {
  title: 'Perfil',
  page: '',
  error: ''
};

// BOOKINGS
export const bookingsPage = (req, res) => {
  options.page = 'Bookings'

  let query = `
    SELECT *
    FROM Reservations
    WHERE Reservations.id_user = ${req.session.user.id}
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.render('user', {data: { ...options, reservations: result }});
    }
  })
}

// function that deletes a specific booking using it's id
export const deleteBooking = (req, res) => {
  let query = `
    DELETE FROM Reservations
    WHERE Reservations.id = ${ req.body.id }
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.status(200).send()
    }
  })

  res.status(500).send()
}

// CARDS
// function to send data necessary to load cards page
export const cardsPage = (req, res) => {
  options.page = 'Cards'

  let query = `
    SELECT *
    FROM Cards
    WHERE Cards.id_user = ${req.session.user.id}
  `

  runQuery(query, (err, result, fields) => {
    if (result.length) {
      options = { ...options, card: {
        id: result[0].id,
        name: result[0].name,
        number: result[0].number,
        validity: result[0].validity,
        cvv: result[0].cvv,
      } }
    }
  })

  res.render('user', {data: options});
}

// function that creates or updates a card
export const updateCard = (req, res) => {
  let query;

  if (req.body.id) {
    // update card
    query = "UPDATE `Cards` SET `name`='" + req.body.name + "', `number`='" + req.body.number + "', `cvv`=" + req.body.cvv + ", `validity`='" + req.body.validity + "' WHERE Cards.id = " + req.body.id

    runQuery(query, (err, result, fields) => {
      if (err) {
        res.status(404).send()
      } else {
        res.status(200).send()
      }
    })
  } else {
    // create new card
    query = "INSERT INTO `Cards`(`name`, `number`, `cvv`, `validity`, `id_user`) VALUES ('" + req.body.name + "', '" + req.body.number + "', " + req.body.cvv + ", '" + req.body.validity + "', " + req.session.user.id + ")"

    runQuery(query, (err, result, fields) => {
      if (err) {
        res.status(404).send()
      } else {
        res.status(200).send()
      }
    })
  }
  res.status(500).send()
}

// CLIENTS
// function to send data necessary to load clients page
export const clientsPage = (req, res) => {
  options.page = 'Clients'

  let query = `
    SELECT *
    FROM Clients
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.render('user', {data: { ...options, clients: result }});
    }
  })
}

// function that return a specific client
export const getClient = (req, res) => {
  let query = `
    SELECT *
    FROM Clients
    WHERE Clients.id = ${ req.body.id }
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.status(200).json({result})
    }
  })
}

// function that creates or updates a client
export const updateClient = (req, res) => {
  let query;

  if (req.body.id) {
    // update client
    query = "UPDATE `Clients` SET `email`='" + req.body.email + "', `name`='" + req.body.name + "', `nif`=" + req.body.nif + ", `street`='" + req.body.street + "', `city`='" + req.body.city + "', `zip_code`= '" + req.body.zip_code + "', `country`= '" + req.body.country + "', `logo` = '" + req.body.logo + "', `rgpd`= " + (req.body.rgpd ? 1 : 0) + " WHERE Clients.id = " + req.body.id

    runQuery(query, (err, result, fields) => {
      if (err) {
        res.status(404).send()
      } else {
        res.status(200).send()
      }
    })
  } else {
    // create new client
    query = "INSERT INTO `Clients`(`email`, `password`, `name`, `nif`, `street`, `city`, `zip_code`, `country`, `logo`, `rgpd`) VALUES ('" + req.body.email + "', '1234', '" + req.body.name + "', " + req.body.nif + ", '" + req.body.street + "', '" + req.body.city + "', '" + req.body.zip_code + "', '" + req.body.country + "', '" + req.body.logo + "', " + (req.body.rgpd ? 1 : 0) + ")"

    runQuery(query, (err, result, fields) => {
      if (err) {
        res.status(404).send()
      } else {
        res.status(200).send()
      }
    })
  }
  res.status(500).send()
}

// function that deletes a specific client using it's id
export const deleteClient = (req, res) => {
  let query = `
    DELETE FROM Clients
    WHERE Clients.id = ${ req.body.id }
  `

  // TODO - Delete relevant info like staff, services and SDD

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.status(200).send()
    }
  })

  res.status(500).send()
}

// INVOICES
export const invoicesPage = (req, res) => {
  options.page = 'Invoices'

  res.render('user', {data: options});
}

// PROFILE
export const userPage = (req, res) => {
  options.page = req.url === '/' ? 'Profile' : req.url.substr(2)[0].toUpperCase() + req.url.substr(2).substr(1).toLowerCase();

  res.render('user', {data: options});
}

// SDD
export const sddPage = (req, res) => {
  options.page = 'Sdd'

  res.render('user', {data: options});
}

// SERVICES
// function to send data necessary to load services page
export const servicesPage = (req, res) => {
  options.page = 'Services'

  let query = `
    SELECT *
    FROM Services
    WHERE Services.id_client = ${req.session.user.id}
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.render('user', {data: { ...options, services: result }});
    }
  })
}

// function that return a specific service
export const getService = (req, res) => {
  let query = `
    SELECT *
    FROM Services
    WHERE Services.id = ${ req.body.id }
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.status(200).json({result})
    }
  })
}

// function that creates or updates a service
export const updateService = (req, res) => {
  let query;

  if (req.body.id) {
    // update service
    query = "UPDATE `Services` SET `name`='" + req.body.name + "', `price`=" + req.body.price + ", `duration`= " + req.body.duration + " WHERE Services.id = " + req.body.id

    runQuery(query, (err, result, fields) => {
      if (err) {
        res.status(404).send()
      } else {
        res.status(200).send()
      }
    })
  } else {
    // create new service
    query = "INSERT INTO `Services`(`name`, `price`, `duration`, `id_client`) VALUES ('" + req.body.name + "', " + req.body.price + ", " + req.body.duration + " ," + req.session.user.id + ")"

    runQuery(query, (err, result, fields) => {
      if (err) {
        res.status(404).send()
      } else {
        res.status(200).send()
      }
    })
  }
  res.status(500).send()
}

// function that deletes a specific service member using it's id
export const deleteService = (req, res) => {
  let query = `
    DELETE FROM Services
    WHERE Services.id = ${ req.body.id }
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.status(200).send()
    }
  })

  res.status(500).send()
}

// STAFF
// function to send data necessary to load staff page
export const staffPage = (req, res) => {
  options.page = 'Staff'

  let query = `
    SELECT *
    FROM Staff
    WHERE Staff.id_client = ${req.session.user.id}
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.render('user', {data: { ...options, staff: result }}); //shows page
    }
  })
}

// function that return a specific staff member
export const getStaff = (req, res) => {
  let query = `
    SELECT *
    FROM Staff
    WHERE Staff.id = ${ req.body.id }
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.status(200).json({result})
    }
  })
}

// function that creates or updates a staff member
export const updateStaff = (req, res) => {
  let query;

  if (req.body.id) {
    // update staff member
    query = "UPDATE `Staff` SET `name`='" + req.body.name + "', `photo`='" + req.body.photo + "' WHERE Staff.id = " + req.body.id

    runQuery(query, (err, result, fields) => {
      if (err) {
        res.status(404).send()
      } else {
        res.status(200).send()
      }
    })
  } else {
    // create new staff member
    query = "INSERT INTO `Staff`(`name`, `photo`, `id_client`) VALUES ('" + req.body.name + "', '" + req.body.photo + "', " + req.session.user.id + ")"

    runQuery(query, (err, result, fields) => {
      if (err) {
        res.status(404).send()
      } else {
        res.status(200).send()
      }
    })
  }
  res.status(500).send()
}

// function that deletes a specific staff member using it's id
export const deleteStaff = (req, res) => {
  let query = `
    DELETE FROM Staff
    WHERE Staff.id = ${ req.body.id }
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      res.status(200).send()
    }
  })

  res.status(500).send()
}

// USERS
export const usersPage = (req, res) => {
  options.page = 'Users'

  res.render('user', {data: options});
}
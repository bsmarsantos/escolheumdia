import { runQuery } from '../models/query.js';

const loginError = 'User or password incorrect';

/* Object that needs to be passed to every page */
const options = {
  title: 'user',
  page: 'Login',
  error: '',
  success: '',
};


// SIGNIN USERS
export const signinPage = (req, res) => {
  res.render('auth/login', {data: options});
}

// Function to login user
export const signin = (req, res) => {
  // Finds everythind about every user that has the email and password entered at form
  let query = `
    SELECT *
    FROM Users
    WHERE Users.email = '${ req.body.email }' AND Users.password = '${ req.body.password }'
  `

  // function to process query
  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      if (result.length) {
        req.session.user = (({password, ...o}) => o)(result[0]) // stores in session all user except password, helps us keep track of who is logged in
        res.status(200).send()
      } else {
        res.status(401).send()
      }
    }
  })
}

// SIGNIN CLIENTS
export const signinClientsPage = (req, res) => {
  res.render('auth/clients', {data: options});
}

// Funcions to log in our clients/partners
export const signinClients = (req, res) => {
  // Finds everythind about every user that has the email and password entered at form
  let query = `
    SELECT *
    FROM Clients
    WHERE Clients.email = '${ req.body.email }' AND Clients.password = '${ req.body.password }'
  `

  runQuery(query, (err, result, fields) => {
    if (err) {
      res.status(404).send()
    } else {
      if (result.length) {
        req.session.user = (({password, ...o}) => o)(result[0]) // stores in session all user except password, helps us keep track of who is logged in
        req.session.user = { ...req.session.user, role: 'CLIENT' } // when user is a client we need to specify that it's role is CLIENT
        res.status(200).send()
      } else {
        res.status(401).send()
      }
    }
  })
}

// SIGNUP
export const signupPage = (req, res) => {
  res.render('auth/signup', {data: { ...options, page: 'Signup' }});
}

// Function to create a new account
export const signup = async (req, res) => {
  // Query will insert into users table the columns email, password, name, rgpd and role with the values from the form
  let query = "INSERT INTO `Users`(`email`, `password`, `name`, `rgpd`, `role`) VALUES ('" + req.body.email + "', '" + req.body.password + "', '" + req.body.name + "', " + (req.body.rgpd ? 1 : 0) + ", 'USER')"

  // function that will run the query
  await runQuery(query, (err, result, fields) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') { // Error of duplicate entry that means the email already exists. We will not create a new account in this case
        res.status(500).send('Something went wrong!')
      }
    }

    // If we get to this point, it means that the email does not exist then the user was created
    res.status(201).send(true);
  })
}

// LOGOUT
export const logout = (req, res) => {
  // To logout a user we simply have to end it's session giving null to user object stored in session
  req.session.user = null
  // After that we will redirect the user to the homepage
  res.redirect('/')
}
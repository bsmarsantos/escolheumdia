import express from 'express';
import {
  bookingsPage, deleteBooking, // Bookings Controller
  cardsPage, updateCard, // Cards Controller
  clientsPage, deleteClient, getClient, updateClient, // Client Controller
  invoicesPage, // Invoices Controller
  sddPage, // SDD Controller
  servicesPage, updateService, getService, deleteService, // Services Controller
  staffPage, updateStaff, getStaff, deleteStaff, // Staff Controller
  userPage, // Profile Controller
  usersPage, // Users Controller
} from '../controllers/user.js';

const userRouter = express.Router()

// Profile
userRouter.get('/', userPage)

// Bookings
userRouter.get('/bookings', bookingsPage)
userRouter.delete('/booking', deleteBooking)

// Cards
userRouter.get('/cards', cardsPage)
userRouter.post('/card', updateCard)

// Clients
userRouter.get('/clients', clientsPage)
userRouter.post('/client', updateClient)
userRouter.post('/getclient', getClient)
userRouter.delete('/client', deleteClient)

// Invoices
userRouter.get('/invoices', invoicesPage)

// SDD
userRouter.get('/sdd', sddPage)

// Services
userRouter.get('/services', servicesPage)
userRouter.post('/services', updateService)
userRouter.post('/getservice', getService)
userRouter.delete('/services', deleteService)

// Staff
userRouter.get('/staff', staffPage)
userRouter.post('/staff', updateStaff)
userRouter.post('/getstaff', getStaff)
userRouter.delete('/staff', deleteStaff)

// Users
userRouter.get('/users', usersPage)

export default userRouter;
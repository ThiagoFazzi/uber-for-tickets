import * as request from 'superagent'
import { baseUrl } from '../constants'
import { logout } from './users'
import {isExpired} from '../jwt'

export const FETCH_TICKETS = 'FETCH_TICKETS'
export const FETCH_TICKET = 'FETCH_TICKET'

export const ADD_TICKET = 'ADD_TICKET'
export const SAVE_TICKET_FAILED = 'SAVE_TICKET_FAILED'

export const UPDATE_TICKET = 'UPDATE_TICKET'
export const UPDATE_TICKET_FAILED = 'UPDATE_TICKET_FAILED'

const ticketsFetched = tickets => ({
  type: FETCH_TICKETS,
  tickets
})

const ticketFeched = ticket => ({
  type: FETCH_TICKET,
  ticket
})

const ticketAdded = ticket => ({
  type: ADD_TICKET,
  ticket
})

const ticketUpdated = ticket => ({
  type: UPDATE_TICKET,
  ticket
})

const ticketSaveFailed = (error) => ({
  type: SAVE_TICKET_FAILED,
  payload: error || 'Unknown error'
})

const ticketUpdateFailed = (error) => ({
  type: UPDATE_TICKET_FAILED,
  payload: error || 'Unknown error'
})


export const getTickets = () => (dispatch) => {
  request
    .get(`${baseUrl}/tickets`)
    .then(result => dispatch(ticketsFetched(result.body)))
    .catch(err => console.error(err))
}

export const getTicket = (id) => (dispatch) => {
  console.log('tickets by Id')
  request
    .get(`${baseUrl}/tickets/${id}`)
    .then(result => dispatch(ticketFeched(result.body)))
    .catch(err => console.error(err))
}

export const addTicket = (ticket) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/tickets`)
    //.set('Authorization', `Bearer ${jwt}`)
    .send( ticket )
    .then(result => dispatch(ticketAdded(result.body)))
    .catch(err => {
    	if (err.status === 400) {
    		dispatch(ticketSaveFailed(err.response.body.message))
    	}
    	else {
    		console.error(err)
    	}
    })
}

export const updateTicket = (ticket) => (dispatch, getState) => {
  const ticketId = ticket.id
  const state = getState()
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/tickets/${ticketId}`)
    //.set('Authorization', `Bearer ${jwt}`)
    .send( ticket )
    .then(result => dispatch(ticketUpdated(result.body)))
    .catch(err => {
    	if (err.status === 400) {
    		dispatch(ticketUpdateFailed(err.response.body.message))
    	}
    	else {
    		console.error(err)
    	}
    })
}
import * as request from 'superagent'
import { baseUrl } from '../constants'
import { logout } from './users'
import {isExpired} from '../jwt'

export const FETCH_EVENTS = 'FETCH_EVENTS'
export const FETCH_EVENT = 'FETCH_EVENT'

export const ADD_EVENT = 'ADD_EVENT'
export const SAVE_EVENT_FAILED = 'SAVE_EVENT_FAILED'

export const UPDATE_EVENT = 'UPDATE_EVENT'
export const UPDATE_EVENT_FAILED = 'UPDATE_EVENT_FAILED'


const eventsFetched = events => ({
  type: FETCH_EVENTS,
  events
})

const fetchEvent = event => ({
  type: FETCH_EVENT,
  event
})

const eventAdded = event => ({
  type: ADD_EVENT,
  event
})

const eventUpdated = event => ({
  type: UPDATE_EVENT,
  event
})

const eventSaveFailed = (error) => ({
  type: SAVE_EVENT_FAILED,
  payload: error || 'Unknown error'
})

const eventUpdateFailed = (error) => ({
  type: UPDATE_EVENT_FAILED,
  payload: error || 'Unknown error'
})


export const getEvents = () => (dispatch) => {
  request
    .get(`${baseUrl}/events`)
    .then(result => dispatch(eventsFetched(result.body)))
    .catch(err => console.error(err))
}

export const getEvent = (id) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${id}`)
    .then(result => dispatch(fetchEvent(result.body)))
    .catch(err => console.error(err))
}

export const addEvent = (event) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())


  request
    .post(`${baseUrl}/events`)
    //.set('Authorization', `Bearer ${jwt}`)
    .send( event )
    .then(result => dispatch(eventAdded(result.body)))
    .catch(err => {
    	if (err.status === 400) {
    		dispatch(eventSaveFailed(err.response.body.message))
    	}
    	else {
    		console.error(err)
    	}
    })
}

export const updateEvent = (event) => (dispatch, getState) => {
  const eventId = event.id
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/events/${eventId}`)
    //.set('Authorization', `Bearer ${jwt}`)
    .send( event )
    .then(result => dispatch(eventUpdated(result.body)))
    .catch(err => {
    	if (err.status === 400) {
    		dispatch(eventUpdateFailed(err.response.body.message))
    	}
    	else {
    		console.error(err)
    	}
    })
}
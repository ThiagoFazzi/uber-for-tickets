import {FETCH_TICKETS, ADD_TICKET, UPDATE_TICKET, FETCH_TICKET} from '../actions/tickets'
 
export default (state = [], action={}) => {
  switch (action.type) {
    case FETCH_TICKETS:
      return action.tickets
      
    case ADD_TICKET:
      return [...state, action.ticket]

    case FETCH_TICKET:
      return{...state,
            ...action.ticket
      }
    

    case UPDATE_TICKET:
      return state.map(item => {
        if (item.id === action.ticket.id) return action.ticket;
        return item
      });


    default:
      return state
  }
}
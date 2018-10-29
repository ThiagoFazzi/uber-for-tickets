import {FETCH_EVENTS, ADD_EVENT, UPDATE_EVENT, FETCH_EVENT} from '../actions/events'

  
export default (state = [], action={}) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return action.events;
      
    case ADD_EVENT:
      return [...state, action.event]

    case FETCH_EVENT:
      const index = state.findIndex(item => item.id === action.event.id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.event.id) return action.event;
          return item;
        });
      } else {
        return [
          ...state,
          action.event
        ];
      }

    case UPDATE_EVENT:
      console.log(action.event)
      return state.map(item => {
        if (item.id === action.event.id) return action.event;
        return item;
      });


    default:
      return state
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import EventCard from './eventCard'

export default function EventsList({ events, user }) {

  const emptyMessage = (
    <p>There are no events.</p>
  );

  const eventsList = (
    <div style={{'display': 'inline-flex', 'overflowWrap': 'break-word', 'flexWrap': 'wrap', 'alignContent': 'center'}}>
      { events.map(event => <EventCard event={event} user={user} key={event.id} />) }
    </div>
  );

  return (
    <div>
      {events.length === 0 ? emptyMessage : eventsList}
    </div>
  );
}

EventsList.propTypes = {
  events: PropTypes.array.isRequired,
}
import type { NextPage } from 'next'
import { FC, useState } from 'react'
import axios from 'axios'

interface Event {
  id: number;
  name: string;
  active: boolean;
  items: Item[]
}

interface Item {
  id: number;
  name: string;
  purchased: boolean;
}

interface EventListProps {
  events: Event[]
}

interface EventProps {
  event: Event
}

interface ItemListProps{
  items: Item[];
  eventId: number
}


const Home: NextPage<EventListProps> = (props) => {
  return (
    <div className='font-extrabold text-5xl'>
      <EventList events={props.events}/>
    </div>
  )
}

Home.getInitialProps = async () => {

  let events: Event[] = [];
  try {

    let eventRequest = await axios.get<{events: Event[]}>('http://localhost:5000/event');
    events = eventRequest.data.events;
  } catch (e) {
    console.error(e);
  }

  return {events};
}




const EventList:FC<EventListProps> = (props) => {
  const [events, setEvents] = useState(props.events);


  return (<div>  
    EVENT LIST
    <EventSearch/>
    <NewEventForm/>
    {events && events.map(ev => {
      return <Event event={ev}/>
    })}
  </div>)
}

const Event:FC<EventProps> = (props) => {
  const [items, setItems] = useState(props.event.items);

  return (
    <div key={props.event.id}>
      EVENT {props.event.name}
      <ItemList items={props.event.items} eventId={props.event.id}/>
    </div>
  )
}

const EventSearch:FC = () => {
  return (<div>
    EVENT SEARCH
    <textarea/>
  </div>)
}

const NewEventForm:FC = () => {
  return (<div>
    NEW EVENT FORM
    <form>
      <textarea/> 
      <button type="submit">SUBMIT </button> 
    </form>
  </div>)
}



const ItemList:FC<ItemListProps> = (props) => {
  return (
    <div>
      ITEM LIST
      <Item />
    </div>
  )
}

const Item:FC = () => {
  return (
    <div>ITEM</div>
  )
}

export default Home

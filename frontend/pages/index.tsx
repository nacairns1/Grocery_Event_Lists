import type { NextPage } from 'next'
import { FC } from 'react'
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


const Home: NextPage<EventListProps> = (props) => {
  return (
    <div className='font-extrabold text-5xl'>
      <EventList events={props.events}/>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {

  let events: Event[] = [];
  try {

    let eventRequest = await axios.get<{events: Event[]}>('http://localhost:5000/event');
    events = eventRequest.data.events;
  } catch (e) {
    console.error(e);
  }

  return {events};
}




const EventList:FC<EventListProps> = () => {
  
  
  return (<div>  
    EVENT LIST
    <EventSearch/>
    <NewEventForm/>
    <Event/>
  </div>)
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

const Event:FC = () => {
  return (
    <div>
      EVENT

      <ItemList />
    </div>
  )
}

const ItemList:FC = () => {
  
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

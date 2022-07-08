import type { NextPage } from 'next'
import { FC, useCallback, useState } from 'react'
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

  const submitHandler = useCallback(async (e: SubmitEvent) => {
		e.preventDefault();
		let eventName = e.target[0].value;
    
		let newEventRes;
		let newEvent: Event;

		try {
			newEventRes = await axios.post<Event>("http://localhost:5000/event", {
				name: eventName,
				active: true,
			});
		} catch (e) {
			console.error(e);
      return;
		}
		newEvent = newEventRes.data.event;
  
		setEvents((events) => {
			let newEvents = events.slice(0);
			newEvents.push(newEvent);
			return newEvents;
		});
	}, []);

  return (<div>  
    EVENT LIST
    <EventSearch/>
    <NewEventForm onSubmit={submitHandler}/>
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
  return (<div className='flex items-center border-y-2 gap-3'>
    EVENT SEARCH
    <textarea className='border-2'/>
  </div>)
}


interface FormProps {
  onSubmit: () => Promise<void>
}
const NewEventForm:FC<FormProps> = (props) => {
  return (<div className='flex items-center border-y-2 gap-3'>
    NEW EVENT FORM
    <form className='flex flex-col items-center' onSubmit={props.onSubmit}>
      <textarea className='border-2'/> 
      <button type="submit" className='btn w-1/2'>SUBMIT </button> 
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

import type { NextPage } from 'next'
import { FC } from 'react'

const Home: NextPage = () => {
  return (
    <div className='font-extrabold text-5xl'>
      INITIAL SETUP PAGE
    </div>
  )
}


const EventList:FC = () => {
  
  
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

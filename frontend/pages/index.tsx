import type { NextPage } from "next";
import {
	EventHandler,
	FC,
	FormEvent,
	FormEventHandler,
	useCallback,
	useState,
} from "react";
import axios from "axios";
import { __ApiPreviewProps } from "next/dist/server/api-utils";

interface Event {
	id: number;
	name: string;
	active: boolean;
	items: Item[];
}

interface Item {
	id: number;
	name: string;
	purchased: boolean;
}

interface EventListProps {
	events: Event[];
}

interface EventProps {
	event: Event;
	deleteHandler: (eventId: number) => Promise<void>;
	updateHandler: (eventId: number, active: boolean) => Promise<void>;
}

interface ItemListProps {
	items: Item[];
	eventId: number;
}

interface ItemProps {
	item: Item;
	eventId: number;
	deleteHandler: (eventId: number) => Promise<void>;
	updateHandler: (eventId: number, active: boolean) => Promise<void>;
}

const Home: NextPage<EventListProps> = (props) => {
	return (
		<div className="font-extrabold text-5xl">
			<EventList events={props.events} />
		</div>
	);
};

Home.getInitialProps = async () => {
	let events: Event[] = [];
	try {
		let eventRequest = await axios.get<{ events: Event[] }>(
			"http://localhost:5000/event"
		);
		events = eventRequest.data.events;
	} catch (e) {
		console.error(e);
	}

	return { events };
};

const EventList: FC<EventListProps> = (props) => {
	const [events, setEvents] = useState(props.events);

	const submitHandler = useCallback(async (e: SubmitEvent) => {
		e.preventDefault();
		let eventName = e.target[0].value;
		let newEventRes;
		let newEvent: Event;

		try {
			newEventRes = await axios.post<{ event: Event }>(
				"http://localhost:5000/event",
				{
					name: eventName,
					active: true,
				}
			);
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

	const deleteHandler = useCallback(async (eventId: number) => {
		try {
			await axios.delete(`http://localhost:5000/event/${eventId}`);
		} catch (e) {
			console.error(e);
			return;
		}
		setEvents((events) => events.filter((event) => event.id !== eventId));
		return;
	}, []);

	const updateHandler = useCallback(
		async (eventId: number, active: boolean) => {
			let updatedEvent: Event;
			try {
				let updatedEventRes = await axios.patch<{ event: Event }>(
					`http://localhost:5000/event/${eventId}`,
					{ active }
				);
				updatedEvent = updatedEventRes.data.event;
				console.log(updatedEvent);
			} catch (e) {
				console.error(e);
				return;
			}
			setEvents((events) => {
				const newEvents = events.filter((event) => event.id !== eventId);
				newEvents.push(updatedEvent);
				return newEvents;
			});
			return;
		},
		[]
	);

	return (
		<div>
			EVENT LIST
			<EventSearch />
			<NewEventForm onSubmit={submitHandler} />
			{events &&
				events.map((ev) => {
					return (
						<Event
							event={ev}
							deleteHandler={deleteHandler}
							updateHandler={updateHandler}
						/>
					);
				})}
		</div>
	);
};

const Event: FC<EventProps> = (props) => {
	const [items, setItems] = useState(props.event.items);

	return (
		<div key={props.event.id}>
			{props.event.name}
			<button
				className="btn btn-primary"
				onClick={() => {
					props.updateHandler(props.event.id, !props.event.active);
				}}
			>
				{props.event.active ? "ONGOING" : "DONE"}
			</button>
			<button
				className="btn btn-error"
				onClick={() => {
					props.deleteHandler(props.event.id);
				}}
			>
				DELETE EVENT
			</button>
			<ItemList items={props.event.items} eventId={props.event.id} />
		</div>
	);
};

const EventSearch: FC = () => {
	return (
		<div className="flex items-center border-y-2 gap-3">
			EVENT SEARCH
			<textarea className="border-2" />
		</div>
	);
};

interface FormProps {
	onSubmit: (event: FormEvent) => Promise<void>;
}
const NewEventForm: FC<FormProps> = (props) => {
	return (
		<div className="flex items-center border-y-2 gap-3">
			NEW EVENT FORM
			<form
				className="flex flex-col items-center"
				onSubmit={(e) => props.onSubmit(e)}
			>
				<textarea className="border-2" />
				<button type="submit" className="btn w-1/2">
					SUBMIT{" "}
				</button>
			</form>
		</div>
	);
};

const NewItemForm: FC<FormProps> = (props) => {
	return (
		<div className="flex items-center border-y-2 gap-3">
			NEW ITEM FORM
			<form
				className="flex flex-col items-center"
				onSubmit={(e) => props.onSubmit(e)}
			>
				<textarea className="border-2" />
				<button type="submit" className="btn w-1/2">
					SUBMIT{" "}
				</button>
			</form>
		</div>
	);
};

const ItemList: FC<ItemListProps> = (props) => {
	const [items, setItems] = useState(props.items);

	const submitHandler = useCallback(async (e: FormEvent, eventId: number) => {
		e.preventDefault();
		let itemName = e.target[0].value;
		let newItemRes;
		let newItem: Item;

		try {
			newItemRes = await axios.post<{ item: Item }>(
				"http://localhost:5000/item",
				{
					eventId,
					name: itemName,
					purchased: true,
				}
			);
			console.log(newItemRes);
		} catch (e) {
			console.error(e);
			return;
		}
		newItem = newItemRes.data.item;

		setItems((items) => {
			let newItems: Item[];
			if (items === undefined) {
				newItems = [];
			} else {
				newItems = items.slice(0);
			}
			newItems.push(newItem);
			return newItems;
		});
	}, []);

	const deleteHandler = useCallback(async (itemId: number) => {
		try {
			await axios.delete(`http://localhost:5000/item/${itemId}`);
		} catch (e) {
			console.error(e);
			return;
		}
		setItems((items) => items.filter((item) => item.id !== itemId));
		return;
	}, []);

	const updateHandler = useCallback(
		async (itemId: number, purchased: boolean) => {
			let updatedItem: Item;
			try {
				let updatedItemRes = await axios.patch<{ item: Item }>(
					`http://localhost:5000/item/${itemId}`,
					{ purchased }
				);
				updatedItem = updatedItemRes.data.item;
				console.log(updatedItem);
			} catch (e) {
				console.error(e);
				return;
			}
			setItems((items) => {
				const newItems = items.filter((item) => item.id !== itemId);
				newItems.push(updatedItem);
				return newItems;
			});
			return;
		},
		[]
	);

	return (
		<div>
			{items &&
				items.map((item) => {
					return (
						<Item
							eventId={props.eventId}
							item={item}
							deleteHandler={deleteHandler}
							updateHandler={updateHandler}
						/>
					);
				})}
			<NewItemForm
				onSubmit={(e) => {
					submitHandler(e, props.eventId);
				}}
			/>
		</div>
	);
};

const Item: FC<ItemProps> = (props) => {
	return (
		<div key={props.item.id}>
			ITEM: {props.item.name}
			<button
				className="btn btn-primary"
				onClick={() => {
					props.updateHandler(props.item.id, !props.item.purchased);
				}}
			>
				{props.item.purchased ? "TO BE PURCHASED" : "PURCHASED"}
			</button>
			<button
				className="btn btn-error"
				onClick={() => {
					props.deleteHandler(props.item.id);
				}}
			>
				DELETE ITEM
			</button>
		</div>
	);
};

export default Home;

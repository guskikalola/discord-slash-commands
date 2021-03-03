class Event {

	constructor(name) {

		this.name = name;
		this.listeners = [];

	}
	
	addListener(callback) {

		this.listeners.push(callback);

	}

	emit(args) {

		this.listeners.forEach(listener => {

			listener(args);

		});

	}

}

class EventHandler {

	constructor() {

		this.events = new Map();

	}
	on(e,callback) {

		if(this.events.has(e)) {

			this.events.get(e).addListener(callback);

		} else {

			var nEvent = new Event(e);
			nEvent.addListener(callback);
			this.events.set(e, nEvent);
			
		}

	}

	emit(e,args) {


		if(this.events.has(e)) {
			this.events.get(e).emit(args);
		}

	}
}

export default EventHandler;

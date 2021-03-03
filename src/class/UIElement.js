
import EventHandler from "./EventHandler.js";

class UIElement {

	constructor() {

		this.eventHandler = new EventHandler();
		this.element = document.createElement("div");


		// Events
		$(this.element).on("click",()=>this.eventHandler.emit("click",[]));
		$(this.element).on("mouseover",()=>this.eventHandler.emit("hover",[]));
		$(document).ready(()=>this.eventHandler.emit("ready",[]));

	}

	on(eventName,callback) {
		this.eventHandler.on(eventName, callback);
	}

	get DOMElement() {
		return this.element;
	}
}


export default UIElement;

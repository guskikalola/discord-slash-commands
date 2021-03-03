
import EventHandler from "./EventHandler.js";
//import $ from "jquery";

class UIElement {

	constructor() {

		this.eventHandler = new EventHandler();
		this.element = document.createElement("div");


		// Events
		$(this.element).click(this.eventHandler.emit("click",[]));
		$(this.element).hover(this.eventHandler.emit("hover",[]));
		$(this.element).load(this.eventHandler.emit("load",[]));

	}

	on(eventName,callback) {
		this.eventHandler.on(eventName, callback);
	}

	get DOMElement() {
		return this.element;
	}
}


export default UIElement;

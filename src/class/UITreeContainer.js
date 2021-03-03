import UIElement from "./UIElement.js";

class UITreeContainer extends UIElement {

	constructor() {

		super();

		this.subElements = [];

		// UIElement behaviour
		$(this.element).css("display","flex");
		$(this.element).css("flex-direction","column");
		$(this.element).css("align-items","flex-start");
		$(this.element).css("flex-wrap","nowrap");
		$(this.element).addClass("UITreeContainer");
	}

	/**
	 * Add an element to the 
	 * tree container
	 * @param {UIElement} element - UIElement type element to add
	 */
	addElement(element) {

		$(element.DOMElement).css("margin-left","2em");
		$(element.DOMElement).addClass("UITreeContainerChild");
		this.subElements.push(element);
		$(this.element).append(element.DOMElement);
	}

}


export default UITreeContainer;

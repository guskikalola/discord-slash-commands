import UIElement from "./UIElement.js";
import UIText from "./UIText.js";

class UITreeContainer extends UIElement {

	constructor(name = "",background="none",color="none") {

		super();
		$(this.element).addClass("UITreeContainer");
		$(this.element).css("border-radius", "15px 15px 15px 15px");


		this.name = name;
		if (name) {
			// Add element name 
			this.nameDisplay = new UIText(name, "","#4c566a");
			
			this.colorBarContainer = document.createElement("div");
			$(this.colorBarContainer).css("position", "absolute");
			$(this.colorBarContainer).css("top", "0");
			$(this.colorBarContainer).css("bottom", "0");
			this.colorBar = document.createElement("div");
			$(this.colorBar).addClass("UIEmbedElementColorBar");
			$(this.colorBar).css("position", "relative");
			$(this.colorBar).css("width", "1em");
			$(this.colorBar).css("border-radius", "15px 0px 0px 15px");
			$(this.colorBar).css("height", "100%");
			// $(this.colorBar).css("left", "0");
			// $(this.colorBar).css("top", "0");
			this.changeColor(color);
			this.changeBackground(background);
			
			$(this.colorBarContainer).append(this.colorBar);
			$(this.element).append(this.colorBarContainer);
			$(this.element).append(this.nameDisplay.DOMElement);

		}

		this.subElements = [];

		// UIElement behaviour
		$(this.element).css("display", "flex");
		$(this.element).css("position", "relative");
		$(this.element).css("flex-direction","column");
		$(this.element).css("align-items","flex-start");
		$(this.element).css("flex-wrap","nowrap");
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
	/**
	 * Change or set the UITreeContainer background
	 * color.
	 * @param {String} color 
	 */
	changeBackground(color) {
		this.background = color;
		$(this.element).css("background", color);
	}
	/**
	 * If the UITreeContainer has 
	 * a name and therefor a sidebar
	 * with a color, calling this function
	 * will change the sidebar's color;
	 * @param {String} color 
	 */
	changeColor(color){
		if(this.colorBar) {
			$(this.colorBar).css("background", color);
		}
	}

}


export default UITreeContainer;

import UIElement from "./UIElement.js";
import UIText from "./UIText.js";

class UITreeContainer extends UIElement {

	constructor(name = "", background = "none", color = "none") {

		super();
		$(this.element).addClass("UITreeContainer");
		$(this.element).css("border-radius", "15px 15px 15px 15px");


		this.name = name;
		if (name) {
			// Add element name 
			this.nameDisplay = new UIText(name, "", "#4c566a");

			this.colorBarContainer = document.createElement("div");
			$(this.colorBarContainer).css("position", "absolute");
			$(this.colorBarContainer).css("top", "0");
			$(this.colorBarContainer).css("bottom", "0");
			this.colorBar = document.createElement("div");
			$(this.colorBar).addClass("UIEmbedElementColorBar");
			$(this.colorBar).css("position", "relative");
			$(this.colorBar).css("width", "1em");
			$(this.colorBar).css("border-radius", "15px 0px 0px 8px");
			$(this.colorBar).css("height", "100%");
			// $(this.colorBar).css("left", "0");
			// $(this.colorBar).css("top", "0");
			this.changeColor(color);
			this.changeBackground(background);

			$(this.colorBarContainer).append(this.colorBar);
			$(this.element).append(this.colorBarContainer);
			$(this.element).append(this.nameDisplay.DOMElement);

		}

		/**
		 * UITreeContainer's subelements
		 * @type {UIElement[]}
		 */
		this.subElements = [];

		// UIElement behaviour
		$(this.element).css("display", "flex");
		$(this.element).css("position", "relative");
		$(this.element).css("flex-direction", "column");
		$(this.element).css("align-items", "flex-start");
		$(this.element).css("flex-wrap", "nowrap");
	}

	/**
	 * Add an element to the 
	 * tree container
	 * @param {UIElement} element - UIElement type element to add
	 */
	addElement(element) {

		$(element.DOMElement).css("margin-left", "2em");
		$(element.DOMElement).addClass("UITreeContainerChild");
		this.subElements.push(element);
		$(this.element).append(element.DOMElement);

		for (var index = 0, len = this.subElements.length; index < len; index++) {
			// If the subelement has a color bar fusionate with next ones
			// ONLY : if there are more than one element on the tree
			var curElement = this.subElements[index];
			if (this.subElements.length > 1 && curElement.hasOwnProperty("colorBar")) {
				if (index == 0 && this.subElements[index + 1].hasOwnProperty("colorBar") || !this.subElements[index - 1].hasOwnProperty("colorBar") && this.subElements[index + 1].hasOwnProperty("colorBar")) {
					// First element (Of tree) has color bar and second one too ( Begin fusion )
					$(curElement.colorBar).css("border-radius", "15px 0px 0px 0px");
				} else if (!this.subElements[index + 1]) {
					// Element has color bar and its the tree's top level last element (End Fusion)
					if (curElement.constructor.name == "UITreeContainer") $(curElement.colorBar).css("border-radius", "0px 0px 0px 8px");
					else $(curElement.colorBar).css("border-radius", "0px 0px 0px 15px");
				} else if (this.subElements[index - 1].hasOwnProperty("colorBar") && this.subElements[index + 1].hasOwnProperty("colorBar")) {
					// Element follows a color bar element and Element has color bar and Element + 1 has one too (Fusionate)
					$(curElement.colorBar).css("border-radius", "0px 0px 0px 0px");
				} else if (!this.subElements[index + 1].hasOwnProperty("colorBar")) {
					// Element has color bar but next one doesn't ( End fusion )
					if (curElement.constructor.name == "UITreeContainer") $(curElement.colorBar).css("border-radius", "0px 0px 0px 8px");
					else $(curElement.colorBar).css("border-radius", "0px 0px 0px 15px");
				}
			}
		};

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
	changeColor(color) {
		if (this.colorBar) {
			$(this.colorBar).css("background", color);
		}
	}

}


export default UITreeContainer;

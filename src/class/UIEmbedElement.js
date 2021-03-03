import UIElement from "./UIElement.js";

/**
 * An UIElement with an embed styling
 * 
 * @class
 * @extends {UIElement}
 */
class UIEmbedElement extends UIElement {

	/**
	 * Constructor for UIEmbedElement
	 * @param {Object} options Embed element configuration
	 * @param {String} options[].color Embed element's color  
	 * @constructor
	 */
	constructor(options = {}) {

		super();

		// Parse configuration
		this.color = options.color || "none";

		// Configurate UIEmbedElement
		$(this.element).addClass("UIEmbedElement");
		$(this.element).css("border-radius","15px 15px 15px 15px");

		this.colorBar = document.createElement("div");
		$(this.colorBar).addClass("UIEmbedElementColorBar");
		$(this.colorBar).css("background",this.color);
		$(this.colorBar).css("position","relative");
		$(this.colorBar).css("left","0");
		$(this.colorBar).css("width","1em");
		$(this.colorBar).css("border-radius","15px 0px 0px 15px");

		$(this.element).append(this.colorBar);

	}

	changeColor(color) {

		$(this.colorBar).css("background-color",color);

	}

}


export default UIEmbedElement;

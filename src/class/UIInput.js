import UIEmbedElement from "./UIEmbedElement.js";

class UIInput extends UIEmbedElement {
    constructor(content = "", name = "") {
        super({
            color:"#b48ead"
        });
        $(this.element).addClass("UIInput");
        this.name = name;
        if (name) {
            // Add element name 
            this.nameDisplay = document.createElement("pre");
            $(this.nameDisplay).addClass("UIInputNameDisplay");
            $(this.nameDisplay).css("position", "relative");
            $(this.nameDisplay).css("left", "0");
            $(this.nameDisplay).css("height", "100%");
            $(this.nameDisplay).css("margin", "auto 1em");

            $(this.nameDisplay).text(name);

            $(this.element).append(this.nameDisplay);
        }
        this.inputField = document.createElement("input");
        $(this.inputField).val(content);
        $(this.inputField).css("margin", "auto 1em");

        $(this.element).css("display", "flex");
        $(this.element).append(this.inputField);
    }

    setName(name) {
        this.name = name;
    }
}

export default UIInput;
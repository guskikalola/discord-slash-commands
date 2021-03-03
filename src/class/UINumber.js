import UIEmbedElement from "./UIEmbedElement.js";

class UINumber extends UIEmbedElement {
    constructor(value = 0, name = "") {
        super({
            color: "#ebcb8b"
        });
        $(this.element).addClass("UINumber");
        this.name = name;
        if (name) {
            // Add element name 
            this.nameDisplay = document.createElement("pre");
            $(this.nameDisplay).addClass("UINumberNameDisplay");
            $(this.nameDisplay).css("position", "relative");
            $(this.nameDisplay).css("left", "0");
            $(this.nameDisplay).css("height", "100%");
            $(this.nameDisplay).css("margin", "auto 1em");


            $(this.nameDisplay).text(name);

            $(this.element).css("display", "flex");
            $(this.element).append(this.nameDisplay);
        }
        this.value = value;
        this.valueElement = document.createElement("pre");
        $(this.valueElement).text(value);
        $(this.valueElement).css("margin", "auto 1em");


        $(this.element).append(this.valueElement);
    }
    setName(name) {
        this.name = name;
    }

}

export default UINumber;
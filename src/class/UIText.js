import UIEmbedElement from "./UIEmbedElement.js";

class UIText extends UIEmbedElement {
    constructor(content = "", name = "", color = "#b48ead") {
        super({
            color: color
        });
        $(this.element).addClass("UIText");
        this.name = name;
        if (name) {
            // Add element name 
            this.nameDisplay = document.createElement("pre");
            $(this.nameDisplay).addClass("UITextNameDisplay");
            $(this.nameDisplay).css("position", "relative");
            $(this.nameDisplay).css("left", "0");
            $(this.nameDisplay).css("height", "100%");
            $(this.nameDisplay).css("margin", "auto 1em");

            $(this.nameDisplay).text(name);

            $(this.element).append(this.nameDisplay);
        }
        this.inputField = document.createElement("pre");
        $(this.inputField).text(content);
        $(this.inputField).css("margin", "auto 1em");

        $(this.element).css("display", "flex");
        $(this.element).append(this.inputField);
    }

    setName(name) {
        this.name = name;
    }
    setColor(color){
        this.color = color;
    }
}

export default UIText;
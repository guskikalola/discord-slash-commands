import UIEmbedElement from "./UIEmbedElement.js";

class UICheckBox extends UIEmbedElement {
    constructor(checked = false, name = "") {
        super();
        $(this.element).addClass("UICheckBox");
        this.name = name;
        if (name) {
            // Add element name 
            this.nameDisplay = document.createElement("pre");
            $(this.nameDisplay).addClass("UICheckBoxNameDisplay");
            $(this.nameDisplay).css("position", "relative");
            $(this.nameDisplay).css("left", "0");
            $(this.nameDisplay).css("height", "100%");
            $(this.nameDisplay).css("margin", "auto 1em");


            $(this.nameDisplay).text(name);

            $(this.element).append(this.nameDisplay);
        }
        this.isChecked(checked);
        this.checkDisplay = document.createElement("pre");
        $(this.checkDisplay).text(this.checked);
        $(this.checkDisplay).css("margin", "auto 1em");

        $(this.element).css("display", "flex");
        $(this.element).append(this.checkDisplay);
    }
    /**
     * Whether the checkbox is checked
     * or not.
     * @param {boolean} status 
     */
    isChecked(status) {
        this.checked = status;
        if(status) {
            super.changeColor("#a3be8c");
        } else {
            super.changeColor("#bf616a");
        }
    }

    setName(name) {
        this.name = name;
    }
}

export default UICheckBox;
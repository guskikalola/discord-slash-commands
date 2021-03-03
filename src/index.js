/* UI Elements */
import UIElement from "./class/UIElement";
import UIInput from "./class/UIInput";
import UITreeContainer from "./class/UITreeContainer.js";
import UICheckBox from "./class/UICheckBox";
import UINumber from "./class/UINumber";
/* VUE Stuff */
import Vue from "vue";
import GitHub from "./img/github-icon.svg";
/* CSS Styles */
import nord from "./styles/nord.css";
import main from "./styles/main.css";
/* General Imports */
import * as hljs from "highlight.js/lib/core.js";
import json from "highlight.js/lib/languages/json.js"
hljs.registerLanguage("json", json);

/** 
 * Discord slash command helper
 * 
 * @author guskikalola <guskikalola@gmail.com>
 * @version 03.03.2021
 * 
 */
/* Discord */
const endpoint = "https://discordapp.com/api/v8/";
var data = {
    "client": {
        "id": "",
        "token": ""
    },
    "guild": ""
}
/* Styling */
var style = "nord"; // Default theme is nord
function changeStyle(style) {
    switch (style) {
        case "nord":
            nord.use();
            break;
    }
}
/* Vue */
var footer = new Vue({
    el: "#footer",
    data: {
        "github": GitHub
    }
})

/* Disable back key */
window.location.hash = "no-back-button";

// Again because Google Chrome doesn't insert
// the first hash into the history
window.location.hash = "Again-No-back-button";

window.onhashchange = function () {
    window.location.hash = "no-back-button";
}
window.onbeforeunload = function () {
    return "Cats";
}

const configType = document.getElementById("config-type");
var $jsonConf = $("#json-config");

// Hide JSON configuration preview 
$jsonConf.hide();
// Hide UI configuration and show client config
$("#ui-config").hide();
$("#config-type").hide();
$("#client-config-container").show();

/**
 * Function to translate a JSON element to
 * UI elements
 * @param {*} item JSON item to be translated
 * @return {UIElement}
 */
function translateJSON(item,key) {

    var UI;
    console.log(item)
    
    switch(typeof item) {
        // String -> UIInput
        case "string":
            console.debug("Adding String(UIInput)");
            UI = new UIInput(item,key);
            break;
        case "object":
            console.debug("Adding Object(UITreeContainer)");
            UI = new UITreeContainer(key,"#2e3440","#4c566a");
            Object.keys(item).forEach(key => {
                var obj = item[key];
                UI.addElement(translateJSON(obj, key), $("#command-config-container").outerHeight(true));
            });
            break;
        case "boolean":
            console.debug("Adding Boolean(UICheckBox)");
            UI = new UICheckBox(item,key);
            break;
        case "number":
            console.debug("Adding Number(UINumber)");
            UI = new UINumber(item,key);
            break;
        default:
            console.debug("Adding Default(UIElement)");
            UI = new UIElement();
            break;
    }

    return UI;

}

/**
 * Function used to update the
 * UI content
 * @param {JSON} command - New command body
 */
function updateUI(command) {

	var $ui = $("#command-config-container");
	// Clear previous UI Config elements
	$ui.empty();
	// Asign a root UITreeContainer element
	var root = new UITreeContainer();
	$ui.append(root.DOMElement);

	// Translate command JSON to UI
    Object.keys(command).forEach(key =>{
        var element = command[key];
        root.addElement(translateJSON(element,key));
        
    })
}

/**
 * Function used to update JSON preview
 * and sync JSON and UI content
 * @param {Object} command - New command body
 */
function updateJSON(command) {

	// Update JSON preview content
	$jsonConf.html("<pre>" + hljs.highlight("json", JSON.stringify(command,null,"    ")).value + "</pre>");

	// Update UI 
	updateUI(command);

}

/* Setup UI */


var options = new Map();
$(".menu").each((index, element) => {
    var $target = $(element).children(".menu-button");
    var $menu = $(element).children(".menu-options");
    $menu.hide();
    $target.on("click", () => {
        if (!$menu.is(":visible")) {
            // Clear old options and append new ones
            $menu.empty();
            options.get($menu.attr("id")).forEach(option => {
                var $optionElem = $("<div/>",{
                    class:"option rcorners",
                    id:`${$menu.attr("id")}-${$menu.children().length}`
                });
                $optionElem.on("click", option.callback);
                $optionElem.append("<p>"+option.text+"</p>");
                $menu.append($optionElem)
            })

            $menu.show();
            $target.children("svg").css("transform", "rotate(180deg)");
        } else {
            $menu.empty();
            $menu.hide();
            $target.children("svg").css("transform", "rotate(0deg)")
        }

    })

});

/* Command configuration body */
// TODO: Fill with UI information
var commandConfig = {
    "name": "test",
    "description": "test temporal command structure",
    "options": [
        {
            "name": "temporal option",
            "description": "foo",
            "type": 3,
            "required": true,
            "choices": [
                {
                    "name": "Foo",
                    "value": "FOO"
                }
            ]
        }
    ]
}
/** Used to update commands list */
var availableCommands = [];
function updateCommandList() {
	if(/\d/.test(data.client.token)) { 
        var res = fetch(endpoint+"applications/"+data.client.id+"/guilds/"+data.guild+"/commands",
        {mode:"cors",method: "GET", 
            headers:{
                    "Authorization":"Bot " + data.client.token
            }
        });
        res.then(res=>res.json())
        .then(data => {
		var i = 1;
		data.forEach(command => {
			console.log(command);
			options.get("command-selection-options")[i] = {text:command.name, callback: function() {
				commandConfig = command;
				updateJSON(commandConfig); 
			}};
			
			i++;
		});
        });
	} else console.error("Invalid client config");
}
/* BUTTON : Client save */
$("#client-save").on("click", function() {

	var $token = $("#token");
	var $id = $("#id");
	var $guild = $("#guild");
	// Update client configuration
	data.client.id = $id.text();
	data.client.token = $token.text();
	data.guild = $guild.text();
	// Hide client config
	$("#client-config-container").hide();
	// Make UI config visible again
	$("#ui-config").show();
	$("#config-type").show();
	updateCommandList();
});
/* BUTTON: Configure client */
$("#client-config-button").on("click", function() {
	if(!$("#client-config-container").is(":visible")) {
		$("#token").text(data.client.token);
		$("#id").text(data.client.id);
		$("#guild").text(data.guild);
		$("#client-config-container").show();
		$("#config-type").hide();
		$("#json-config").hide();
        $("#ui-config").hide();
	}  

});
/* MENU : Commands selector */
options.set("command-selection-options", []);
// Create new command
options.get("command-selection-options").push({
    "text": "+ Create new command",
    "callback": function () { 
       commandConfig.name = "Command name";
        commandConfig.description = "Command description";
        commandConfig.options = [
            {
                "name": "Example option",
                "description": "Example option description",
                "type": 3,
                "required": true,
                "choices": [
                    {
                        "name": "Foo",
                        "value": "FOO"
                    }
                ]
            }
        ]
	updateJSON(commandConfig);
    }
})
// Temporal functionality 
// TODO : GUI configuration and JSON configuration
$("#config-type").on("click", async function () {

    var $uiConf = $("#ui-config");
    if ($jsonConf.is(":visible")) {
        $jsonConf.hide();
        $uiConf.show();
    } else {
        $uiConf.hide();
        // TODO: Get json from UI configuration
	updateJSON(commandConfig);
        $jsonConf.show();
    }

});

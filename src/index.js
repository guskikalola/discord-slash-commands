import Vue from "vue";
import nord from "./styles/nord.css";
import main from "./styles/main.css";
import GitHub from "./img/github-icon.svg";
import $ from "jquery";

/** 
 * Discord slash command helper
 * 
 * @author guskikalola <guskikalola@gmail.com>
 * @version 07.02.2021
 * 
 */
/* Discord */
const endpoint = "http://127.0.0.1:4586/https://discord.com/api/v8/";
var data = {
    "client" : {
        "id" : "",
        "token" : ""
    },
    "guild" : ""
}

/* Vue */
var interactive = {
    typingContent : ""
}
var style = "nord"; // Default theme is nord
function changeStyle(style) {
    switch(style) {
        case "nord":
            nord.use();
            break;
    }
}
var footer = new Vue({
    el:"#footer",
    data:{
        "github": GitHub
    }
})

/* jQuery */
window.jQuery = $;
window.$ = $;

/* Interactive */
// var typing = false;
// const input = document.getElementById("chat-type-container");
// $(document).click(function(event) { 
//   var $target = $(event.target);
//   if(!$target.closest('#chat-type').length) {
//     typing = false;
//   } else typing = true;
// });


/* Disable back key */
window.location.hash = "no-back-button";

// Again because Google Chrome doesn't insert
// the first hash into the history
window.location.hash = "Again-No-back-button"; 

window.onhashchange = function(){
    window.location.hash = "no-back-button";
}

const configJson = document.getElementById("json-config");
const configType = document.getElementById("config-container");

const configToken = document.getElementById("token");
const configId = document.getElementById("id");
const configGuild = document.getElementById("guild");

// Temporal functionality 
// TODO : GUI configuratio and JSON configuration
configType.onclick = async function() {

    data.client.id = configId.innerText;
    data.client.token = configToken.innerText;
    data.client.guild = configGuild.innerText;

    console.log(data.client);

    var res = fetch(endpoint+"applications/"+data.client.id+"/guilds/"+data.client.guild+"/commands",{method: "GET", headers:{
        "Authorization":"Bot " + data.client.id
    }})


    console.log(res)
    res.then(console.table)

    var commands = await res.text();

    configJson.innerText = JSON.stringify(commands);
    console.log(commands);

}
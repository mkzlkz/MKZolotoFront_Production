/**
 * Created by legostin on 6/16/20.
 */

import *  as Flashphoner from '../../../client2/flashphoner'

//init api
Flashphoner.init({
    //flash media support
    flashMediaProviderSwfLocation: "../../media-provider.swf"
});
var SESSION_STATUS = Flashphoner.constants.SESSION_STATUS;
export {SESSION_STATUS}

var STREAM_STATUS = Flashphoner.constants.STREAM_STATUS;
export {STREAM_STATUS}

var currentSession;
export {currentSession}
var display = document.getElementById("display");
var displayU1 = document.getElementById("display-user-1");
var displayU2 = document.getElementById("display-user-2");
var displayU3 = document.getElementById("display-user-3");

setInterval(function () {
    if (display==null) {
        
        display = document.getElementById("display")
    }
},500)
console.log("display",display)
function connect() {
    if (currentSession && currentSession.status() == SESSION_STATUS.ESTABLISHED) {
        console.warn("Already connected, session id " + currentSession.id());
        return;
    }
    var url = elementValue('urlServer');
    console.log("Create new session with url " + url);
    currentSession = Flashphoner.createSession({urlServer: url}).on(SESSION_STATUS.FAILED, function(session){
        console.warn("Session failed, id " + session.id());
        removeSession(session);
    }).on(SESSION_STATUS.DISCONNECTED, function(session) {
        console.log("Session diconnected, id " + session.id());
        removeSession(session);
    }).on(SESSION_STATUS.ESTABLISHED, function(session) {
        console.log("Session established " + session.id());
    });
}

export {connect}

function disconnect() {
    if (!currentSession) {
        console.warn("Nothing to disconnect");
        return;
    }
    currentSession.disconnect();
}

export {disconnect}

var ready=false;

function play(streamName) {
    if (!currentSession || currentSession.status() != SESSION_STATUS.ESTABLISHED) {
        console.warn("Session is not ready or null");
        return;
    }
    if(!streamName) {
        var streamName = elementValue('streamName');
    }
    var streamDisplay = setupDisplay(streamName + "-PLAY", streamName);
    if (!streamDisplay) {
        console.error("Stream already playing");
        return;
    }

    //add stream status to div
    var streamStatusDisplay = addStatusDisplay(streamDisplay);

    //add stream video display
    var streamVideoDisplay = addVideoDisplay(streamDisplay);

    var handleStopped = function(stream) {
        console.log("Stream stopped with status " + stream.status());
        //remove stream display
        display.removeChild(streamDisplay);
        setTimeout(function () {
            play();
        },5000)
    };

    currentSession.createStream({name: streamName, display: streamVideoDisplay}).on(STREAM_STATUS.PLAYING, function(stream){
        addControlButton(streamDisplay, stream);
        streamStatusDisplay.innerHTML = "Status: " + stream.status();
    }).on(STREAM_STATUS.FAILED, handleStopped).on(STREAM_STATUS.STOPPED, handleStopped).play();
}

export {play}

function publish(streamName) {
    if (!currentSession || currentSession.status() != SESSION_STATUS.ESTABLISHED) {
        console.warn("Session is not ready or null");
        ready=false;
        setTimeout(function () {
            publish()
        },2000);
        return;
    }
    if (!streamName) {
         streamName = elementValue('streamName');
    }

    var streamDisplay = setupDisplay(streamName + "-PUBLISH", streamName);
    if (!streamDisplay) {
        console.error("Stream already publishing");
    }

    //add stream status to div
    var streamStatusDisplay = addStatusDisplay(streamDisplay);

    //add stream video display
    var streamVideoDisplay = addVideoDisplay(streamDisplay);

    var handleUnpublished = function(stream) {
        console.log("Stream unpublished with status " + stream.status());
        //remove stream display
        display.removeChild(streamDisplay);
        setTimeout(function () {
            connect()
        },1000)
        setTimeout(function () {
            publish()
        },3000)
    };

    currentSession.createStream({name: streamName, display: streamVideoDisplay, cacheLocalResources: false}).on(STREAM_STATUS.PUBLISHING, function(stream){
        addControlButton(streamDisplay, stream);
        streamStatusDisplay.innerHTML = "Status: " + stream.status();

    }).on(STREAM_STATUS.FAILED, handleUnpublished).on(STREAM_STATUS.UNPUBLISHED, handleUnpublished).publish();
}

export {publish}

function publishU(uid) {
    if (!currentSession || currentSession.status() != SESSION_STATUS.ESTABLISHED) {
        console.warn("Session is not ready or null");
        ready=false;
        setTimeout(function () {
            publish()
        },2000);
        return;
    }

    var streamName = elementValue('streamName'+uid);

    var streamDisplay = setupDisplay(streamName + "-PUBLISH", streamName);
    if (!streamDisplay) {
        console.error("Stream already publishing");
    }

    //add stream status to div
    var streamStatusDisplay = addStatusDisplay(streamDisplay);

    //add stream video display
    var streamVideoDisplay = addVideoDisplay(streamDisplay);

    var handleUnpublished = function(stream) {
        console.log("Stream unpublished with status " + stream.status());
        //remove stream display
        display.removeChild(streamDisplay);
        setTimeout(function () {
            connect()
        },1000)
        setTimeout(function () {
            publish()
        },3000)
    };

    currentSession.createStream({name: elementValue('streamName'), display: streamVideoDisplay, cacheLocalResources: false}).on(STREAM_STATUS.PUBLISHING, function(stream){
        addControlButton(streamDisplay, stream);
        streamStatusDisplay.innerHTML = "Status: " + stream.status();

    }).on(STREAM_STATUS.FAILED, handleUnpublished).on(STREAM_STATUS.UNPUBLISHED, handleUnpublished).publish();
}


//stream display helpers
function setupDisplay(id, name) {
    var streamDisplay = document.getElementById(id);
    console.log("setupDisplay",id,name,streamDisplay)
    if (streamDisplay) {
        return;
    }

    streamDisplay = document.createElement('div');
    streamDisplay.id = id;
    streamDisplay.setAttribute("style","width:100%; height:300px;");
    display.appendChild(streamDisplay);

    var streamNameDisplay = document.createElement("div");
    streamNameDisplay.innerHTML = "Name: " + name;
    streamNameDisplay.setAttribute("style","width:160px; height:20px; display:inline-block");
    streamDisplay.appendChild(streamNameDisplay);
    return streamDisplay;
}




function addStatusDisplay(streamDisplay) {
    var streamStatusDisplay = document.createElement("div");
    streamStatusDisplay.innerHTML = "Status: NEW";
    streamStatusDisplay.setAttribute("style","width:160px; height:20px; display:inline-block");
    streamDisplay.appendChild(streamStatusDisplay);
    return streamStatusDisplay;
}

function addVideoDisplay(streamDisplay) {
    var streamVideoDisplay = document.createElement("div");
    streamVideoDisplay.setAttribute("style","width:100%; height:300px;");
    streamDisplay.appendChild(streamVideoDisplay);
    return streamVideoDisplay;
}

function addControlButton(streamDisplay, stream) {
    var button = document.createElement("input");
    button.type = "button";
    button.setAttribute("style","width:320px; height:20px");
    if (stream.published()) {
        button.value = "Unpublish";
    } else {
        button.value = "Stop";
    }
    button.onclick = function() {
        stream.stop();
    };
    streamDisplay.appendChild(button);
}

//helpers
function elementValue(name){
    console.log(name, document.getElementById(name).value)
    return document.getElementById(name).value;
}

function removeSession(session) {
    if (currentSession.id() == session.id()) {
        currentSession = null;
    }
}

//Set WCS URL
function setURL() {
    var proto;
    var url;
    var port;
    if (window.location.protocol == "http:") {
        proto = "ws://";
        port = "8080";
    } else {
        proto = "wss://";
        port = "8443";
    }

    url ="wss://ec2-35-177-164-154.eu-west-2.compute.amazonaws.com:8443/52c8a538"
   // document.getElementById("urlServer").value = url;
}
setURL();


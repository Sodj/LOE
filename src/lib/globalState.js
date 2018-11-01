export {subscribeTo, setGlobalState, getGlobalState};

var globalState = {};
var contexts = {};

function subscribeTo(context, ...variables){
    for (const variable of variables) {
        contexts[variable]? contexts[variable].push(context) : contexts[variable] = [context];
    }
}

function setGlobalState(newState){
    for(let key in newState){
        if(!newState.hasOwnProperty(key)) continue;

        globalState[key] = newState[key];

        if(!contexts[key] || !contexts[key].length) continue;

        for(let context of contexts[key]){context.setState({[key]: newState[key]});};
    }
}

function getGlobalState(key) {
    return key? globalState[key] : globalState;
}
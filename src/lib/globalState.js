export {subscribeTo, setGlobalState};

var globalState = {};
var contexts = {};

function subscribeTo(context, variable){
    contexts[variable]? contexts[variable].push(context) : contexts[variable] = [context];
}

function setGlobalState(newState){
    for(let key in newState){
        if(!newState.hasOwnProperty(key)) continue;

        globalState[key] = newState[key];

        if(!contexts[key] || !contexts[key].length) continue;

        for(let context of contexts[key]){context.setState({[key]: newState[key]});};
    }
}
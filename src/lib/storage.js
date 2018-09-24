export {getLists, saveLists, getList, saveList};

const useFileSystem = false;//!!window.require;

if(useFileSystem){ // in electron & not a browser
    var electron = window.require('electron');
    var path = window.require('path');
    var fs = window.require('fs');
    
    var userDataPath = (electron.app || electron.remote.app).getPath('userData');
    var pathToFile = path.join(userDataPath, 'userlists.loe');
}

var lists = loadLists();

// TODO remove dummy data
if(!lists.length) lists = [
    {name: "Games" , cover: "dmc.jpg"   , columns: ["Title", "Status", "Rating", "Date"], items: [
        ["Assassins Creed Origins", "Finished"   , "★★★"        , "12-12-2012"],
        ["Call of Duty Ghosts"    , "Finished"   , "★★★"        , "12-12-2012"],
        ["Skyrim"                 , "Unfinished" , "Not my type", "12-12-2012"],
        ["Far Cry 4"              , "Finished"   , "★★★★"       , "12-12-2012"],
        ["Need For Speed Payback" , "Finished"   , "★★★★★"      , "12-12-2012"],
        ["Need For Speed Shift"   , "Unfinished" , "NFS Shit"   , "12-12-2012"],
        ["Grand Theft Auto V"     , "Finished"   , "★★★★"       , "12-12-2012"],
        ["League of Legends"      , "In progress", "Amazing"    , "12-12-2012"],
    ]},
    {name: "Movies", cover: "hp5.jpg"   , columns: ["Title", "Status", "Rating", "Date"], items: []},
    {name: "Anime" , cover: "large.gif" , columns: ["Title", "Season", "Episode", "Status", "Rating"], items: []},
    {name: "Series", cover: "office.jpg", columns: ["Title", "Season", "Episode", "Status", "Rating"], items: []},
    {name: "Todo"  , cover: "todo.jpg"  , columns: ["Title", "Status", "Due date"], items: []}
];

function loadLists(){
    try {
        var data = null;
        if(useFileSystem) { if(fs.existsSync(pathToFile)) data = fs.readFileSync(pathToFile, 'utf8'); }
        else { data = window.localStorage.getItem("userLists"); }
        return data? JSON.parse(data) : [];
    }
    catch (error) {
        console.log("oops reading file failed!", error);
    }
}

function getLists(){
    return lists;
}

function saveLists(_lists){
    lists = _lists;
    try {
        if(useFileSystem) fs.writeFileSync(pathToFile, JSON.stringify(lists));
        else window.localStorage.setItem("userLists", JSON.stringify(lists));
    }
    catch (error) {
        console.log("oops reading file failed!", error);
        return false;
    }
    return true;
}

function getList(name){
    return lists[lists.map(e=>e.name).indexOf(name)];
}

function saveList(_list, listName){
    var index = lists.map(e=>e.name).indexOf(listName || _list.name);
    if(index >=0 ) lists[index] = _list; // update existing
    else lists.push(_list); // create new
    saveLists(lists);
}
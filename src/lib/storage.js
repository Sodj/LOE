export {getLists, saveLists, getList, saveList};

const useFileSystem = false;//!!window.require;

if(useFileSystem){ // in electron & not a browser
    var electron = window.require('electron');
    var path = window.require('path');
    var fs = window.require('fs');
    
    var userDataPath = (electron.app || electron.remote.app).getPath('userData');
    var pathToFile = path.join(userDataPath, 'userlists.loe');
}

// dummy data
var lists = [
    {name: "Games" , cover: "dmc.jpg"   , attributes: ["Title", "Status", "Rating", "Date"], items: []},
    {name: "Movies", cover: "hp5.jpg"   , attributes: ["Title", "Status", "Rating", "Date"], items: []},
    {name: "Anime" , cover: "large.gif" , attributes: ["Title", "Season", "Episode", "Status", "Rating"], items: []},
    {name: "Series", cover: "office.jpg", attributes: ["Title", "Season", "Episode", "Status", "Rating"], items: []},
    {name: "Todo"  , cover: "todo.jpg"  , attributes: ["Title", "Status", "Due date"], items: []}
];

lists[0].items = [
    {Title: "Assassins Creed Origins", Status:"Finished",    Rating: "★★★",         Date: "12-12-2012"},
    {Title: "Call of Duty Ghosts"    , Status:"Finished",    Rating: "★★★",         Date: "12-12-2012"},
    {Title: "Skyrim"                 , Status:"Unfinished",  Rating: "Not my type", Date: "12-12-2012"},
    {Title: "Far Cry 4"              , Status:"Finished",    Rating: "★★★★",        Date: "12-12-2012"},
    {Title: "Need For Speed Payback" , Status:"Finished",    Rating: "★★★★★",       Date: "12-12-2012"},
    {Title: "Need For Speed Shift"   , Status:"Unfinished",  Rating: "NFS Shit",    Date: "12-12-2012"},
    {Title: "Grand Theft Auto V"     , Status:"Finished",    Rating: "★★★★",        Date: "12-12-2012"},
    {Title: "League of Legends"      , Status:"In progress", Rating: "Amazing",     Date: "12-12-2012"},
];

lists = loadLists();

function loadLists(){
    try {
        var data = null;
        if(useFileSystem) { if(fs.existsSync(pathToFile)) data = fs.readFileSync(pathToFile, 'utf8'); }
        else { data = window.localStorage.getItem("userLists"); }
        lists = data? JSON.parse(data) : lists;
        return lists;
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

function saveList(name, _list){
    lists[lists.map(e=>e.name).indexOf(name)] = _list;
    saveLists(lists);
}

export {getLists, saveLists, getList, saveList};


function getLists(){
    // TODO get it from json file
    return lists;
}

function saveLists(_lists){
    // TODO save it on json file
    lists = _lists;
}

function getList(name){
    // TODO get it from json file
    return lists[lists.map(e=>e.name).indexOf(name)];
}

function saveList(name, _list){
    // TODO save it on json file
    lists[lists.map(e=>e.name).indexOf(name)] = _list;
}


// dummy data
var lists = [
    {name: "Games" , cover: "dmc.jpg"   , attributes: ["Title", "Status", "Rating", "Date"]},
    {name: "Movies", cover: "hp5.jpg"   , attributes: ["Title", "Status", "Rating", "Date"]},
    {name: "Anime" , cover: "large.gif" , attributes: ["Title", "Season", "Episode", "Status", "Rating"]},
    {name: "Series", cover: "office.jpg", attributes: ["Title", "Season", "Episode", "Status", "Rating"]},
    {name: "Todo"  , cover: "todo.jpg"  , attributes: ["Title", "Status", "Due date"]}
];

lists[0].items = [
    {Title: "Assassins Creed Origins", Status:"Finished",    Rating: "★★★",       Date: "12-12-2012"},
    {Title: "Call of Duty Ghosts"    , Status:"Finished",    Rating: "★★★",       Date: "12-12-2012"},
    {Title: "Skyrim"                 , Status:"Unfinished",  Rating: "Not my type", Date: "12-12-2012"},
    {Title: "Far Cry 4"              , Status:"Finished",    Rating: "★★★★",      Date: "12-12-2012"},
    {Title: "Need For Speed Payback" , Status:"Finished",    Rating: "★★★★★",    Date: "12-12-2012"},
    {Title: "Need For Speed Shift"   , Status:"Unfinished",  Rating: "NFS Shit",    Date: "12-12-2012"},
    {Title: "Grand Theft Auto V"     , Status:"Finished",    Rating: "★★★★",      Date: "12-12-2012"},
    {Title: "League of Legends"      , Status:"In progress", Rating: "Amazing",     Date: "12-12-2012"},
];
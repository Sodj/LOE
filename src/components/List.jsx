import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class List extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            items: []
        };
        this.listName = props.match.params.name;
    }

    componentDidMount() {
        // TODO get it from json file
        var lists = [
            {name: "Games" , cover: "dmc.jpg"   , attributes: ["Title", "Status", "Rating", "Date"]},
            {name: "Movies", cover: "hp5.jpg"   , attributes: ["Title", "Status", "Rating", "Date"]},
            {name: "Anime" , cover: "large.gif" , attributes: ["Title", "Season", "Episode", "Status", "Rating"]},
            {name: "Series", cover: "office.jpg", attributes: ["Title", "Season", "Episode", "Status", "Rating"]},
            {name: "Todo"  , cover: "todo.jpg"  , attributes: ["Title", "Status", "Due date"]}
        ];
        var list = lists[lists.map(e=>e.name).indexOf(this.listName)];
        if(!list) {
            alert("Oops, not found");
            return this.props.history.push('/');
        }
        this.setState({list: list});
        // TODO get it from json file
        var item = {
            //...
        }
    }

    Item = () => {
        return (
            <div class="item">
                <div class="title">Assassins Creed Origins</div>
                <div class="att">&#9733;&#9733;&#9733;</div>
                <div class="date">12-12-2012</div>
                <div class="action">
                    <div class="edit"></div>
                    <div class="delete"></div>
                </div>
            </div>
        );
    }
    
    render() {
        return (
            <div class="items">
                <div className="titles">
                    <div className="title">Title</div>
                    <div className="att">Rating/Status</div>
                    <div className="date">Date</div>
                    <div className="action">Action</div>
                </div>
                <div class="item new">
                    <input type="text" className="title" placeholder="Title" />
                    <input type="text" className="att" placeholder="Rating/Status" />
                    <input type="text" className="date" placeholder="Date" />
                    <div class="action">
                        <div class="add"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">Assassins Creed Origins</div>
                    <div class="att">&#9733;&#9733;&#9733;</div>
                    <div class="date">12-12-2012</div>
                    <div class="action">
                        <div class="edit"></div>
                        <div class="delete"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">Call of Duty Ghosts</div>
                    <div class="att">&#9733;&#9733;&#9733;</div>
                    <div class="date">12-12-2012</div>
                    <div class="action">
                        <div class="edit"></div>
                        <div class="delete"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">Skyrim</div>
                    <div class="att">Unfinished</div>
                    <div class="date">12-12-2012</div>
                    <div class="action">
                        <div class="edit"></div>
                        <div class="delete"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">Far Cry 4</div>
                    <div class="att">&#9733;&#9733;&#9733;&#9733;</div>
                    <div class="date">12-12-2012</div>
                    <div class="action">
                        <div class="edit"></div>
                        <div class="delete"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">Need For Speed Payback</div>
                    <div class="att">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <div class="date">12-12-2012</div>
                    <div class="action">
                        <div class="edit"></div>
                        <div class="delete"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">Need For Speed Shift</div>
                    <div class="att">Shitty</div>
                    <div class="date">12-12-2012</div>
                    <div class="action">
                        <div class="edit"></div>
                        <div class="delete"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">Grand Theft Auto V</div>
                    <div class="att">&#9733;&#9733;&#9733;&#9733;</div>
                    <div class="date">12-12-2012</div>
                    <div class="action">
                        <div class="edit"></div>
                        <div class="delete"></div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">League of Legends</div>
                    <div class="att">In progress</div>
                    <div class="date">12-12-2012</div>
                    <div class="action">
                        <div class="edit"></div>
                        <div class="delete"></div>
                    </div>
                </div>
            </div>
        );
    }
}
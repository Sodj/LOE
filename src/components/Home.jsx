import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getLists } from '../lib/storage';
import NewList from './newList';
const useContextMenu = !!window.require;
var remote, Menu, MenuItem;
if(useContextMenu){
    remote = window.require('electron').remote;
    Menu = remote.Menu;
    MenuItem = remote.MenuItem;
}

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            adding: false
        };

        if(useContextMenu){
            this.menu = new Menu();
            this.rightClickPosition = null;
        }
    }

    componentWillMount() {
        if(useContextMenu){
            this.menu.append(new MenuItem({label: 'Edit', click: this.editList}));
            this.menu.append(new MenuItem({label: 'Delete', click: this.deleteList}));
        }
    }
    
    componentDidMount() {
        var lists = getLists();
        this.setState({lists: lists});
    }
    
    rightClick = (name, e) => {
        e.preventDefault();
        this.setState({rightClicked: name});
        this.rightClickPosition = {x: e.x, y: e.y};
        this.menu.popup(remote.getCurrentWindow());
    }
    
    editList = () => {
        alert("edit: "+this.state.rightClicked)
    }

    deleteList = () => {
        alert("delete: "+this.state.rightClicked)
    }
    
    ListItem = (props) => {
        return (
            <Link to={"/list/"+props.name} onContextMenu={useContextMenu? this.rightClick.bind(null, props.name) : null}>
                <div className="list" style={{backgroundImage: "url('list_covers/"+props.cover+"')"}}>
                    <div className="name">{props.name}</div>
                </div>
            </Link>
        );
    };
    
    render() {
        var lists = [];
        for (let i = 0; i < this.state.lists.length; i++) {
            let list = this.state.lists[i];
            lists.push(<this.ListItem key={i} {...list}/>);
        }
        return (
            <div className="lists">
                {lists}
                <div className="list add" onClick={()=>this.setState({adding: true})}>
                    <div className="add_icon"></div>
                </div>
                {this.state.adding && <NewList close={()=>this.setState({adding: false})} />}
            </div>
        );
    }
}
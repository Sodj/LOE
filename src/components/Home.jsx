import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getLists, saveLists } from '../lib/storage';
import AditList from './AditList';
import { setGlobalState, subscribeTo } from '../lib/globalState';
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
            adding: false,
            editing: false,
            showEditButtons: false,
            showDeleteButtons: false,
            rightClickedIndex: null
        };
        subscribeTo(this, 'adding', 'showEditButtons', 'showDeleteButtons');

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
        setGlobalState({rightActions: ['create', 'edit_mode']});
    }

    componentWillUnmount = () => {setGlobalState({rightActions: [], showEditButtons: false, showDeleteButtons: false});}
    
    
    rightClick = (index, e) => {
        e.preventDefault();
        this.setState({rightClickedIndex: index});
        this.rightClickPosition = {x: e.x, y: e.y};
        this.menu.popup(remote.getCurrentWindow());
    }
    
    editList = (index) => {
        index = index!==undefined? index : this.state.rightClickedIndex;
        this.setState({editing: index});
    }

    deleteList = (index) => {
        index = index!==undefined? index : this.state.rightClickedIndex;
        if(!window.confirm("Are you sure?")) return;
        this.state.lists.splice(index, 1);
        this.setState({list: this.state.list});
        saveLists(this.state.lists);
    }
    
    ListItem = (props) => {
        return (
            <Link to={"/list/"+props.name} onContextMenu={useContextMenu? this.rightClick.bind(null, props.index) : null}>
                <div className={"list "+props.color} style={{backgroundImage: "url('list_covers/"+props.cover+"')"}}>
                    <div className="actions">
                        {this.state.showEditButtons && <div className="edit" onClick={e=>{e.preventDefault(); this.editList(props.index);}}></div>}
                        {this.state.showDeleteButtons && <div className="delete" onClick={e=>{e.preventDefault(); this.deleteList(props.index);}}></div>}
                    </div>
                    <div className="name" title={props.name}>{props.name}</div>
                </div>
            </Link>
        );
    };
    
    render() {
        var lists = [];
        for (let i = 0; i < this.state.lists.length; i++) {
            let list = this.state.lists[i];
            lists.push(<this.ListItem key={i} index={i} {...list}/>);
        }
        return (
            <div className="lists">
                {lists}
                <div className="list add" onClick={()=>this.setState({adding: true})}>
                    <div className="add_icon"></div>
                </div>
                {this.state.adding !==false && <AditList close={()=>this.setState({adding : false})} />}
                {this.state.editing!==false && <AditList close={()=>this.setState({editing: false})} list={this.state.lists[this.state.editing]} />}
            </div>
        );
    }
}
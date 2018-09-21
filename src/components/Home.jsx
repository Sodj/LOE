import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getLists } from '../lib/storage';
import NewList from './newList';
//const {remote} = window.require('electron');

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            adding: false
        };
    }

    componentDidMount() {
        var lists = getLists();
        this.setState({lists: lists});
    }
    
    ListItem = (props) => {
        return (
            <Link to={"/list/"+props.name}>
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
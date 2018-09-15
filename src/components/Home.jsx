import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getLists } from '../lib/storage';
//const {remote} = window.require('electron');

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        };
    }

    componentDidMount() {
        var lists = getLists();
        this.setState({lists: lists});
    }
    
    ListItem = (props) => {
        return (
            <Link to={"/list/Games"}>
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
                <div className="list add">
                    <div className="add_icon">
                    </div>
                </div>
            </div>
        );
    }
}
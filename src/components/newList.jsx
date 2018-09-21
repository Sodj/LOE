import React, { Component } from 'react';
import { saveList } from '../lib/storage';

export default class NewList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cover: '',
            columns: ''
        };
    }

    inputChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }

    createList = () => {
        var new_list = {
            name: this.state.name,
            cover: this.state.cover,
            columns: this.state.columns.split(';'),
            items: []
        };

        if(new_list.name && new_list.columns.length){
            saveList(new_list);
            this.props.close();
        }
    }

    render() {
        return (
            <div id="newList">
                <div className="panel">
                    <div className="close" onClick={this.props.close} >&times;</div>
                        <input type="text" id="listName" className="input" name={"name"} value={this.state.name} onChange={this.inputChange} placeholder="Name of your list" autofocus="true"/>
                        <div id="listCover">List cover ...</div>
                        <input type="text" id="listColumns" className="input" name={"columns"} value={this.state.columns} onChange={this.inputChange} placeholder="column1; column2; column3 ..."/>
                        <button id="createList" onClick={this.createList}>Create</button>
                    </div>
            </div>
        );
    }
}
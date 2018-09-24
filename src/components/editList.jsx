import React, { Component } from 'react';
import { saveList } from '../lib/storage';

export default class EditList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.list.name,
            cover: props.list.cover,
            columns: props.list.columns.join("; ")
        };
        this.list = {...props.list};
    }

    inputChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }

    updateList = () => {
            this.list.name = this.state.name;
            this.list.cover = this.state.cover;
            this.list.columns = this.state.columns.trim().split(';').map(e=>e.trim()).filter(e=>e); // I can make more readable but i'm not gonna! ]:)

        if(this.list.name && this.list.columns.length){
            if(this.list.columns.length < this.props.list.columns.length){
                alert("Sorry, removing columns will be available in future versions");
                this.setState({columns: this.props.list.columns.join("; ")});
                return;
            }
            saveList(this.list, this.props.list.name);
            this.props.close();
        }
    }

    render() {
        return (
            <div id="newList">
                <div className="panel">
                    <div className="close" onClick={this.props.close} >&times;</div>
                    <input type="text" id="listName" className="input" name={"name"} value={this.state.name} onChange={this.inputChange} placeholder="Name of your list" autoFocus={true}/>
                    <div id="listCover">List cover ... (soon)</div>
                    <input type="text" id="listColumns" className="input" name={"columns"} value={this.state.columns} onChange={this.inputChange} placeholder="column1; column2; column3 ..."/>
                    <button id="createList" onClick={this.updateList}>Update</button>
                </div>
            </div>
        );
    }
}
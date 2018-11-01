import React, { Component } from 'react';
import { saveList } from '../lib/storage';

export default class AditList extends Component {

    constructor(props) {
        super(props);
        this.updating = !!props.list;
        this.state = {
            name:    this.updating? props.list.name : '',
            color:   this.updating? props.list.color : 'white',
            columns: this.updating? props.list.columns.join("; ") : '',
        };
        this.list = this.updating? {...props.list} : undefined;
    }

    inputChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }

    createList = () => {
        var new_list = {
            name: this.state.name,
            color: this.state.color,
            columns: this.state.columns.trim().split(';').map(e=>e.trim()).filter(e=>e), // I can make more readable but i'm not gonna! ]:)
            items: []
        };

        if(new_list.name && new_list.columns.length){
            saveList(new_list);
            this.props.close();
        }
    }

    updateList = () => {
            this.list.name = this.state.name;
            this.list.color = this.state.color;
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

    Color = (props) => {
        var isSelected = this.state.color===props.color? 'selected' : '' ;
        return (
            <div className={["color", props.color, isSelected].join(" ")} onClick={e=>this.setState({color: props.color})} title={props.color}></div>
        )
    }

    render() {
        const colors = ['white','dark','skyblue','yellow','pink','glue','beige','shrimp','gray','green','purple','blue','orange'];
        const colorList = colors.map((color, index)=><this.Color key={index} color={color} />);

        return (
            <div id="newList">
                <div className="panel">
                    <div className="close" onClick={this.props.close} >&times;</div>
                    <input type="text" id="listName" className="input" name={"name"} value={this.state.name} onChange={this.inputChange} placeholder="Name of your list" autoFocus={true}/>
                    <div className="colors">{colorList}</div>
                    <input type="text" id="listColumns" className="input" name={"columns"} value={this.state.columns} onChange={this.inputChange} placeholder="column1; column2; column3 ..."/>
                    <button id="createList" onClick={this.updating? this.updateList : this.createList}>{this.updating? 'Update' : 'Create'}</button>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { getList, saveList } from '../lib/storage';
import { setGlobalState } from '../lib/globalState';

export default class List extends Component {
    
    constructor(props) {
        super(props);
        this.state = {list: null};
        this.listName = props.match.params.name;
    }

    componentWillMount() {
        setGlobalState({currentList: ": "+this.listName});
        var list = getList(this.listName);
        if(!list) {
            alert("Oops, not found");
            return this.props.history.push('/');
        }
        this.setState({list: list});

        for (let i = 0; i < list.attributes.length; i++) {
            const attributeName = list.attributes[i];
            this.setState({[attributeName]: ""});
        }
    }
    componentWillUnmount(){setGlobalState({currentList: ''});}

    Item = (props) => {
        let attributes = [];
        for (let i = 0; i < props.attributes.length; i++) {
            const att = props.attributes[i];
            attributes.push(<div key={i} className="att" title={props.item[att]}>{props.item[att]}</div>);
        }
        return (
            <div className="item">
                {attributes}
                <div className="action">
                    <div className="edit"></div>
                    <div className="delete" onClick={()=>{this.removeItem(props.index)}}></div>
                </div>
            </div>
        );
    }

    Titles = (props) => {
        let attributes = [];
        for (let i = 0; i < props.attributes.length; i++) {
            attributes.push(<div key={i} className="att" title={props.attributes[i]}>{props.attributes[i]}</div>);
        }
        return (
            <div className="titles">
                {attributes}
                <div className="action">Action</div>
            </div>
        );
    }

    NewItem = (props) => {
        let inputs = [];
        for (let i = 0; i < props.attributes.length; i++) {
            const attributeName = props.attributes[i];
            inputs.push(<input 
                key={i} 
                type="text" 
                className="att"
                name={attributeName}
                value={this.state[attributeName]}
                placeholder={attributeName}
                onChange={this.inputChange}
                onKeyPress={e => {if(e.key === "Enter") this.addItem(e)}}
            />);
        }
        return (
            <div className="item new">
                {inputs}
                <div className="action">
                    <div className="add" onClick={this.addItem}></div>
                </div>
            </div>
        );
    }

    inputChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }

    addItem = (e) => {
        if(!this.state[this.state.list.attributes[0]]) return;
        var item = {};
        for (let i = 0; i < this.state.list.attributes.length; i++) {
            const attributeName = this.state.list.attributes[i];
            item[attributeName] = this.state[attributeName];
            this.setState({[attributeName]: ""});
        }
        this.state.list.items.unshift(item);
        this.setState({list: this.state.list});

        saveList(this.listName, this.state.list);
    };

    removeItem = (index) => {
        if(!window.confirm("Are you sure?")) return;
        this.state.list.items.splice(index, 1);
        this.setState({list: this.state.list});

        saveList(this.listName, this.state.list);
    }
    
    render() {
        let Titles = this.Titles;
        let NewItem = this.NewItem;
        let items = [];
        for (let i = 0; this.state.list && i < this.state.list.items.length; i++) {
            items.push(<this.Item key={i} index={i} attributes={this.state.list.attributes} item={this.state.list.items[i]}/>);
        }
        
        return (
            <div className="items">

                <Titles attributes={this.state.list.attributes}/>

                <NewItem attributes={this.state.list.attributes}/>

                {items}

            </div>
        );
    }
}
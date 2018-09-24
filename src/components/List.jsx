import React, { Component } from 'react';
import { getList, saveList } from '../lib/storage';
import { setGlobalState } from '../lib/globalState';

export default class List extends Component {
    
    constructor(props) {
        super(props);
        this.state = {list: null, editing: null};
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

        for (let i = 0; i < list.columns.length; i++) {
            const attributeName = list.columns[i];
            this.setState({[attributeName]: "", ["edit_"+attributeName]: ""});
        }
    }

    componentWillUnmount(){setGlobalState({currentList: ''});}

    Item = (props) => {
        let columns = [];
        let inputs = [];
        for (let i = 0; i < props.columns.length; i++) {
            const attributeName = props.columns[i];
            columns.push(<div key={i} className="att" title={props.item[i]}>{props.item[i]}</div>);
            inputs.push(<input 
                key={i} 
                type="text" 
                className="att"
                name={"edit_"+attributeName}
                value={this.state["edit_"+attributeName]}
                placeholder={attributeName}
                onChange={this.inputChange}
                onKeyPress={e => {if(e.key === "Enter") this.saveEditedItem(props.index)}}
                onKeyUp={e => {if(e.key === "Escape") this.discardEditedItem(props.index)}}
                autoFocus={i===0}
            />);
        }
        return (
            <div className={["item", this.state.editing===props.index? "editing":""].join(' ')}>
                {this.state.editing!==props.index? columns : inputs}
                {this.state.editing!==props.index?
                    <div className="action">
                        <div className="edit"   title="Edit"   onClick={()=>this.editItem(props.index)}></div>
                        <div className="delete" title="Delete" onClick={()=>this.deleteItem(props.index)}></div>
                    </div>
                    :
                    <div className="action">
                        <div className="save"   title="Save"   onClick={()=>this.saveEditedItem(props.index)}></div>
                        <div className="cancel" title="Cancel" onClick={()=>this.discardEditedItem(props.index)}></div>
                    </div>
                }
            </div>
        );
    }

    Titles = (props) => {
        let columns = [];
        for (let i = 0; i < props.columns.length; i++) {
            columns.push(<div key={i} className="att" title={props.columns[i]}>{props.columns[i]}</div>);
        }
        return (
            <div className="titles">
                {columns}
                <div className="action">Action</div>
            </div>
        );
    }

    NewItem = (props) => {
        let inputs = [];
        for (let i = 0; i < props.columns.length; i++) {
            const attributeName = props.columns[i];
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
        if(!this.state[this.state.list.columns[0]]) return;
        var item = {};
        for (let i = 0; i < this.state.list.columns.length; i++) {
            const attributeName = this.state.list.columns[i];
            item[i] = this.state[attributeName];
            this.setState({[attributeName]: ""});
        }
        this.state.list.items.unshift(item);
        this.setState({list: this.state.list});

        saveList(this.state.list);
    };

    deleteItem = (index) => {
        if(!window.confirm("Are you sure?")) return;
        this.state.list.items.splice(index, 1);
        this.setState({list: this.state.list});

        saveList(this.state.list);
    }

    editItem = (index) => {
        for (let i = 0; i < this.state.list.columns.length; i++) {
            const attributeName = this.state.list.columns[i];
            this.setState({["edit_"+attributeName]: this.state.list.items[index][i]});
        }
        this.setState({editing: index});
    }

    saveEditedItem = (index) => {
        let newItem = {};
        for (let i = 0; i < this.state.list.columns.length; i++) {
            const attributeName = this.state.list.columns[i];
            newItem[i] = this.state["edit_"+attributeName];
            this.setState({["edit_"+attributeName]: ""});
        }
        // eslint-disable-next-line
        this.state.list.items[index] = newItem;
        this.setState({editing: null, list: this.state.list});

        saveList(this.state.list);
    }
    
    discardEditedItem = (index) => {
        for (let i = 0; i < this.state.list.columns.length; i++) {
            const attributeName = this.state.list.columns[i];
            this.setState({["edit_"+attributeName]: ""});
        }
        this.setState({editing: null});
    }
    
    render() {
        let Titles = this.Titles;
        let NewItem = this.NewItem;
        let items = [];
        for (let i = 0; this.state.list && i < this.state.list.items.length; i++) {
            items.push(<this.Item key={i} index={i} columns={this.state.list.columns} item={this.state.list.items[i]}/>);
        }
        
        return (
            <div className="items">

                <Titles columns={this.state.list.columns}/>

                <NewItem columns={this.state.list.columns}/>

                {items}

            </div>
        );
    }
}
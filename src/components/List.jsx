import React, { Component } from 'react';
import { getList } from '../lib/storage';

export default class List extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            list: null
        };
        this.listName = props.match.params.name;
    }

    componentWillMount() {
        var list = getList(this.listName);
        if(!list) {
            alert("Oops, not found");
            return this.props.history.push('/');
        }
        this.setState({list: list});
    }

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
                    <div className="delete"></div>
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
            inputs.push(<input key={i} type="text" className="att" placeholder={props.attributes[i]} />);
        }
        return (
            <div className="item new">
                {inputs}
                <div className="action">
                    <div className="add"></div>
                </div>
            </div>
        );
    }
    
    
    render() {
        let Titles = this.Titles;
        let NewItem = this.NewItem;
        let items = [];
        for (let i = 0; this.state.list && i < this.state.list.items.length; i++) {
            items.push(<this.Item key={i} attributes={this.state.list.attributes} item={this.state.list.items[i]}/>);
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
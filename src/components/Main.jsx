import React, { Component } from 'react';
import Home from './Home';
import List from './List';
import { subscribeTo } from '../lib/globalState';
import { Switch, Route, Link } from 'react-router-dom';

export default class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {currentList: ''};
        subscribeTo(this, 'currentList');
    }
    
    render() {
        return (
            <div id="app">
                <div className="head">
                    <Link to={"/"} className="brand">List of Everything</Link>
                    <span>{this.state.currentList}</span>
                </div>
                <Switch>
                    <Route exact path="/"           component={Home}/>
                    <Route exact path="/list/:name" component={List}/>
                    <Route component={Home}/>
                </Switch>
            </div>
        );
    }
}

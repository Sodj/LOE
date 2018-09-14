import React, { Component } from 'react';
import Home from './Home';
import List from './List';
import { Switch, Route, Link } from 'react-router-dom';

export default class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    
    render() {
        return (
            <div id="app">
                <div className="head">
                    <Link to={"/"} className="brand">List of Everything</Link>
                </div>
                <Switch>
                    <Route exact path="/"     component={Home}/>
                    <Route exact path="/list" component={List}/>
                </Switch>
            </div>
        );
    }
}

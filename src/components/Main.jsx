import React, { Component } from 'react';
import Home from './Home';
import List from './List';
import { subscribeTo, setGlobalState, getGlobalState } from '../lib/globalState';
import { Switch, Route, Link } from 'react-router-dom';
const root = require("../../package.json").homepage.replace(/\./g, "");

export default class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentList: '',
            leftAction: null,
            rightActions: [],
            menuIsOpen: false,
            showEditButtons: false,
            showDeleteButtons: false
        };
        this.globalState = getGlobalState;
        subscribeTo(this, 'currentList', 'leftAction', 'rightActions', 'showEditButtons', 'showDeleteButtons');
    }

    hideMenu = (e) => {if(!e.target || e.target.className!=='menubtn') this.setState({menuIsOpen: false});}

    showAbout = () => {
        alert("List of Everything\nMade by Sodj\nCopyright 2018 ®");
    }
    
    render() {
        return (
            <div id="app" onClick={this.hideMenu}>
                <div className="head">
                    {this.state.leftAction === 'back' && <Link to={root} className="back" />}

                    {this.state.currentList?
                        <div className="title">{this.state.currentList}</div>
                        :
                        <Link to={root} className="brand">List of Everything</Link>
                    }
                    
                    <div className="menu">
                        <div className="menubtn" onClick={e=>this.setState({menuIsOpen: !this.state.menuIsOpen})}></div>
                        <div className="menulist" style={{display: this.state.menuIsOpen? 'block' : 'none'}}>
                            {this.state.rightActions.indexOf('create')>=0 && <div className="menuitem" onClick={ e=>setGlobalState({adding:            true}) }>Create a list</div>}
                            {this.state.rightActions.indexOf('edit'  )>=0 && <div className="menuitem" onClick={ e=>setGlobalState({showEditButtons:   true}) }>Edit   a list</div>}
                            {this.state.rightActions.indexOf('delete')>=0 && <div className="menuitem" onClick={ e=>setGlobalState({showDeleteButtons: true}) }>Delete a list</div>}
                            {this.state.rightActions.indexOf('edit_mode')>=0 && <div className="menuitem" onClick={ e=>setGlobalState({showEditButtons: true, showDeleteButtons: true}) }>Editing Mode</div>}
                            <div className="menuitem" onClick={this.showAbout}>About</div>
                        </div>
                    </div>

                    {(this.state.showEditButtons || this.state.showDeleteButtons) &&
                        <div className="done" onClick={e=>setGlobalState({showEditButtons: false, showDeleteButtons: false})}>Done</div>
                    }
                </div>


                <Switch>
                    <Route exact path={root}           component={Home}/>
                    <Route exact path={root+"list/:name"} component={List}/>
                    <Route component={Home}/>
                </Switch>
            </div>
        );
    }
}

import React, { Component } from 'react';
import Home from './Home';
import List from './List';
import { subscribeTo, setGlobalState, getGlobalState } from '../lib/globalState';
import { Switch, Route, Link } from 'react-router-dom';

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
    
    render() {
        return (
            <div id="app" onClick={this.hideMenu}>
                <div className="head">
                    {this.state.leftAction === 'back' && <Link to={"/"} className="back" />}

                    {this.state.currentList?
                        <div className="title">{this.state.currentList}</div>
                        :
                        <Link to={"/"} className="brand">List of Everything</Link>
                    }
                    
                    <div className="menu">
                        <div className="menubtn" onClick={e=>this.setState({menuIsOpen: !this.state.menuIsOpen})}></div>
                        <div className="menulist" style={{display: this.state.menuIsOpen? 'block' : 'none'}}>
                            {this.state.rightActions.indexOf('create')>=0 && <div className="menuitem" onClick={ e=>setGlobalState({adding:            true}) }>Create a list</div>}
                            {this.state.rightActions.indexOf('edit'  )>=0 && <div className="menuitem" onClick={ e=>setGlobalState({showEditButtons:   true}) }>Edit   a list</div>}
                            {this.state.rightActions.indexOf('delete')>=0 && <div className="menuitem" onClick={ e=>setGlobalState({showDeleteButtons: true}) }>Delete a list</div>}
                            <div className="menuitem">About</div>
                        </div>
                    </div>

                    {(this.state.showEditButtons || this.state.showDeleteButtons) &&
                        <div className="done" onClick={e=>setGlobalState({showEditButtons: false, showDeleteButtons: false})}>Done</div>
                    }
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

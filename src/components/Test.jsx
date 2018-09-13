import React, { Component } from 'react';

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }
    
    render() {
        return (
            <div id="app">
            <div class="head">List of Everything</div>
                <div class="items">
                    <div class="item">
                        <div class="title">Assassins Creed Origins</div>
                        <div class="att">&#9733;&#9733;&#9733;</div>
                        <div class="date">12-12-2012</div>
                        <div class="action">
                            <div class="edit"></div>
                            <div class="delete"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">Call of Duty Ghosts</div>
                        <div class="att">&#9733;&#9733;&#9733;</div>
                        <div class="date">12-12-2012</div>
                        <div class="action">
                            <div class="edit"></div>
                            <div class="delete"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">Skyrim</div>
                        <div class="att">Unfinished</div>
                        <div class="date">12-12-2012</div>
                        <div class="action">
                            <div class="edit"></div>
                            <div class="delete"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">Far CRy 4</div>
                        <div class="att">&#9733;&#9733;&#9733;&#9733;</div>
                        <div class="date">12-12-2012</div>
                        <div class="action">
                            <div class="edit"></div>
                            <div class="delete"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">Need For Speed Payback</div>
                        <div class="att">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                        <div class="date">12-12-2012</div>
                        <div class="action">
                            <div class="edit"></div>
                            <div class="delete"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">Need For Speed Shift</div>
                        <div class="att">Shitty</div>
                        <div class="date">12-12-2012</div>
                        <div class="action">
                            <div class="edit"></div>
                            <div class="delete"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">Grand Theft Auto V</div>
                        <div class="att">&#9733;&#9733;&#9733;&#9733;</div>
                        <div class="date">12-12-2012</div>
                        <div class="action">
                            <div class="edit"></div>
                            <div class="delete"></div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">League of Legends</div>
                        <div class="att">In progress</div>
                        <div class="date">12-12-2012</div>
                        <div class="action">
                            <div class="edit"></div>
                            <div class="delete"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
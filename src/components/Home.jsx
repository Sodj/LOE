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
            <div className="head">List of Everything</div>
                <div className="lists">
                    <div className="list" style={{backgroundImage: "url('list_covers/dmc.jpg')"}}>
                        <div className="name">Games</div>
                    </div>
                    <div className="list" style={{backgroundImage: "url('list_covers/hp5.jpg')"}}>
                        <div className="name">Movies</div>
                    </div>
                    <div className="list" style={{backgroundImage: "url('list_covers/large.gif')"}}>
                        <div className="name">Anime</div>
                    </div>
                    <div className="list" style={{backgroundImage: "url('list_covers/office.jpg')"}}>
                        <div className="name">Series</div>
                    </div>
                    <div className="list" style={{backgroundImage: "url('list_covers/todo.jpg')"}}>
                        <div className="name">Todo</div>
                    </div>
                    <div className="list add">
                        <div className="add_icon">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
import React, { Component } from 'react';

export default class AppView extends Component {
    render() {
        return(
            <div id="app-view">
                <h1>Todos</h1>
                <hr />
                {this.props.children}
            </div>
        );
    }
};


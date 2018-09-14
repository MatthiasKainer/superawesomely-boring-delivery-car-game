import React, { Component } from 'react';
import { connect } from 'react-redux';
import Engine from "./core/Engine";
import { movePlayer } from './core/CoreActions';
import { Direction } from './core/player/Move';
import Player from "./core/assets/player.png";

class App extends Component {

    handleKeyDown(e) {
        const { movePlayer } = this.props;
        if (!movePlayer) return;
        switch (e.keyCode) {
            case 37:
                return movePlayer(Direction.LEFT);
            case 38:
                return movePlayer(Direction.UP);
            case 39:
                return movePlayer(Direction.RIGHT);
            case 40:
                return movePlayer(Direction.DOWN);
            default:
                return false;
        }
    }
    render() {
        document.onkeydown = (e) => this.handleKeyDown(e);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={Player} className="App-logo" alt="logo" />
                    <h1 className="App-title">Plan your Delivery!</h1>
                    <img src={Player} className="App-logo" alt="logo" />
                </header>
                <Engine />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    movePlayer: (direction) => dispatch(movePlayer(direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

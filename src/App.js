import React, { Component } from 'react';
import { connect } from 'react-redux';
import Engine from "./core/Engine";
import { movePlayer } from './core/CoreActions';
import { Direction } from './core/player/Move';
import Player from "./core/assets/player.png";

class App extends Component {

    constructor(props) {
        super(props);
        document.onkeydown = (e) => this.handleKeyDown(e);
        this.swipedetect(document.getElementById('root'), (swipedir) => {
            this.handleSwipe(swipedir);
        });
    }

    swipedetect(el, callback) {
        if (!el) return;
        let touchsurface = el,
            swipedir,
            startX,
            startY,
            distX,
            distY,
            threshold = 150, //required min distance traveled to be considered swipe
            restraint = 100, // maximum distance allowed at the same time in perpendicular direction
            allowedTime = 300, // maximum time allowed to travel that distance
            elapsedTime,
            startTime,
            handleswipe = callback || function (swipedir) { }

        touchsurface.addEventListener('touchstart', (e) => {
            const touchobj = e.changedTouches[0];
            swipedir = 'none';
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            e.preventDefault();
        }, false)

        touchsurface.addEventListener('touchmove', (e) => {
            e.preventDefault(); // prevent scrolling when inside DIV
        }, false)

        touchsurface.addEventListener('touchend', (e) => {
            const touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            if (elapsedTime <= allowedTime) { // first condition for awipe met
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                    swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
                }
                else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                    swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
                }
            }
            handleswipe(swipedir);
            e.preventDefault();
        }, false);
    }

    handleSwipe(swipedir) {
        const { movePlayer } = this.props;
        if (!movePlayer) return;
        // swipedir contains either "none", "left", "right", "top", or "down"
        console.log(`Swiping ${swipedir}`);
        switch (swipedir) {
            case "left":
                return movePlayer(Direction.LEFT);
            case "up":
                return movePlayer(Direction.UP);
            case "right":
                return movePlayer(Direction.RIGHT);
            case "down":
                return movePlayer(Direction.DOWN);
            default:
                return false;
        }
    }

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

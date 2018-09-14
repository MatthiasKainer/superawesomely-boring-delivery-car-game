import React, {Component} from "react";
import {getPosition} from "./spriteUtils";
import "./Obstacles.css";
import { registerToEventLoop, removeFromEventLoop } from "./Loop";

const registerMovement = (obstacleName, obstacle, onMoveObstacle) => {
    if (!onMoveObstacle) return;
    let nextMove = new Date().getTime() + obstacle.speed;
    obstacle.currentIndex = -1;
    const key = `obstacle.${obstacleName}`;
    registerToEventLoop(`obstacle.${obstacleName}`, () => {
        if (new Date().getTime() < nextMove) return;
        nextMove = new Date().getTime() + obstacle.speed;
        onMoveObstacle(obstacleName);
    });
    return key;
}

export class Obstacles extends Component {
    keys = [];

    componentWillMount() {
        const {obstacles, initialObstacles} = this.props;
        Object.keys(initialObstacles).forEach(obstacleName => {
            const currentObstacle = obstacles ? obstacles[obstacleName] : null || initialObstacles[obstacleName];
            if (currentObstacle.directions) {
                this.keys.push(registerMovement(obstacleName, currentObstacle, this.props.onMoveObstacle));
            }
        });
    }

    componentWillUnmount() {
        this.keys.forEach(key => removeFromEventLoop(key));
    }

    render() {
        const {obstacles, initialObstacles} = this.props;
        return Object.keys(initialObstacles).map(obstacleName => {
            const currentObstacle = obstacles ? obstacles[obstacleName] : null || initialObstacles[obstacleName];
            const direction = currentObstacle.currentDirection || "";
            return <div 
                key={`obstacle-${obstacleName}`}
                className={`sprite obstacle ${currentObstacle.type} ${direction}`}
                style={getPosition(currentObstacle.position)}></div>
        });
    }
}
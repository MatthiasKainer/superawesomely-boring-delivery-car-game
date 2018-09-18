import React from "react";
import {getPosition} from "./spriteUtils";
import "./Player.css";
import { directionAsString } from "./player/Move";

export const Player = ({player, startPosition}) => {
    const playerPosition = player ? player.position : null || startPosition;
    const lastDirection = player ? player.lastDirection : "";
    return <div className={`sprite player ${directionAsString(lastDirection)}`} 
                style={getPosition(playerPosition)}></div>;
}
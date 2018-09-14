import React from "react";
import {getPosition} from "./spriteUtils";
import "./Player.css";
import { Direction } from "./player/Move";

export const Player = ({player, startPosition}) => {
    const playerPosition = player ? player.position : null || startPosition;
    const lastDirection = player ? player.lastDirection : "";
    return <div className={`sprite player ${Object.keys(Direction).find(key => Direction[key] === lastDirection)}`} style={getPosition(playerPosition)}></div>;
}
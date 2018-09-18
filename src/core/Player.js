import React from "react";
import {getPosition} from "./spriteUtils";
import "./Player.css";
import { directionAsString } from "./player/Move";

export const Player = ({player, startPosition}) => {
    player = player || { position : startPosition, lastDirection : ""};
    return <div className={`sprite player ${directionAsString(player.lastDirection)}`} 
                style={getPosition(player.position)}></div>;
}
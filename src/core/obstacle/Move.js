import { Direction } from "../player/Move";
import { isNumber } from "util";

export const moveObstacleTo = (obstacle) => {
    const position = [...obstacle.position];
    let index = isNumber(obstacle.currentDirectionIndex)
        ? (obstacle.currentDirectionIndex+1)
        : 0;
    if (index >= obstacle.directions.length) {
        index = 0;
    }
    
    const direction = obstacle.directions[index];
    switch (Direction[direction]) {
        case Direction.LEFT:
            position[0]--;
            break;
        case Direction.RIGHT:
            position[0]++;
            break;
        case Direction.UP:
            position[1]--;
            break;
        case Direction.DOWN:
            position[1]++;
            break;
        default:
            return obstacle;
    }

    return {
        ...obstacle,
        currentDirection : direction,
        currentDirectionIndex : index,
        position
    }
};
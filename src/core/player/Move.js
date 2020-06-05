import { collision } from "../Collision";
import { tileAtPosition } from "../Tile";

export const Direction = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
}

export const directionAsString = (direction) => {
    return Object.keys(Direction)
            .find(key => Direction[key] === direction);
}

const isCollisionOnMap = (map, position) => {
    const field = tileAtPosition(map, position);
    return (!field || field.indexOf("blocked") !== -1)
};

const isComingFromBadDirection = (map, position, direction) => {
    const field = tileAtPosition(map, position);
    const vector = ["up", "down"].includes(direction) ? "vertical" : "horizontal";
    return (field.indexOf(direction) === -1 &&
        field.indexOf(vector) === -1);
};

const isCollisionWithObstacle = (obstacles, position) => {
    if (!obstacles) return false;
    return Object.keys(obstacles).some(key => {
        return collision(obstacles[key], position);
    });
}

export const moveTo = ({ map, direction, obstacles, player }) => {
    let position = [...map.player]
    if (player && player.position) {
        position = [...player.position];
    }
    let from = "";
    switch (direction) {
        case Direction.LEFT:
            position[0]--;
            from = "left";
            break;
        case Direction.RIGHT:
            position[0]++;
            from = "right";
            break;
        case Direction.UP:
            position[1]--;
            from = "up";
            break;
        case Direction.DOWN:
            position[1]++;
            from = "down";
            break;
        default:
            return { success: false, reason: "You moved in a very weird direction I can't handle" };
    }

    if (isCollisionOnMap(map, position)) {
        return { success: false, reason: "You crashed!" };
    }

    if (isCollisionWithObstacle(obstacles, position)) {
        return { success: false, reason: "You crashed!" };
    }

    if (isComingFromBadDirection(map, position, from)) {
        return { success: false, reason: "You crashed!" };
    }

    return {
        success: true,
        position
    }
}
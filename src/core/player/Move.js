export const Direction = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
}

const isCollisionOnMap = (map, position) => {
    const field = map.fields[position[1]][position[0]];
    return (field.indexOf("blocked") !== -1)
};

const isComingFromBadDirection = (map, position, direction) => {
    const field = map.fields[position[1]][position[0]];
    const vector = ["up", "down"].includes(direction) ? "vertical" : "horizontal";
    return (field.indexOf(direction) === -1 &&
        field.indexOf(vector) === -1);
};

const isCollisionWithObstacle = (obstacles, position) => {
    if (!obstacles) return false;
    return Object.keys(obstacles).some(key => {
        return JSON.stringify(obstacles[key].position) === JSON.stringify(position);
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
            return { success: false };
    }

    if (isCollisionOnMap(map, position)) {
        return { success: false };
    }

    if (isCollisionWithObstacle(obstacles, position)) {
        return { success: false };
    }

    if (isComingFromBadDirection(map, position, from)) {
        return { success: false };
    }

    return {
        success: true,
        position
    }
}
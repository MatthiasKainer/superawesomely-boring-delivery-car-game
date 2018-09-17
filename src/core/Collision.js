import { isArray } from "util";

export const collision = (position1, position2) => {
    position1 = position1.position ? position1.position : position1;
    position2 = position2.position ? position2.position : position2;
    return isArray(position1) && isArray(position2) &&
            position1.length >= 2 && position2.length >= 2 &&
            position1[0] === position2[0] &&
            position1[1] === position2[1];
}
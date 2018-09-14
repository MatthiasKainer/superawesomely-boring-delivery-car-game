const TILE_SIZE = 64;

const getPosition = (position) => ({
    left: TILE_SIZE * position[0],
    top: TILE_SIZE * position[1]
});

export {TILE_SIZE, getPosition}
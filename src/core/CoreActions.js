const startPlaying = () => dispatch => {
    dispatch({
        type: 'CORE.CHANGE_STATE',
        payload: 'PLAY'
    });
}

const mapLoaded = (map) => dispatch => {
    dispatch({
        type: 'CORE.MAP_LOADED',
        payload: map
    });
}

const movePlayer = (direction) => dispatch => {
    dispatch({
        type: "ACTION.MOVE_PLAYER",
        payload : direction
    })
}

const moveObstacle = (name) => dispatch => {
    dispatch({
        type: "ACTION.MOVE_OBSTACLE",
        payload : name
    })
}

const nextLevel = (level) => dispatch => {
    dispatch({
        type: "CORE.NEXT_LEVEL",
        payload : level
    })
}

export {startPlaying, mapLoaded, movePlayer, nextLevel, moveObstacle};
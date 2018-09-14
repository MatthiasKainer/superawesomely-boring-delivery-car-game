const GameState = {
    MENU : 0,
    PLAY : 1,
    WIN : 2,
    LOOSE : 3
}

let initialLevelState = {
    level : {
        currentLevel : "tutorial",
    }
}

let initialState = {
    CoreReducer : {
        gameState: GameState.MENU,
        level : {...initialLevelState.level}
    },
};

export { GameState, initialState };
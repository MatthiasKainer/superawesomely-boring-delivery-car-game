import { GameState } from "./State";
import { moveTo } from "./player/Move";
import { moveObstacleTo } from "./obstacle/Move";
import { collision } from "./Collision";

const handleCustomers = (customers, player, gameState) => {
    if (!customers) { return { gameState: GameState.WIN }; }

    customers = [...customers].filter(customer => {
        return (customer[0] !== player[0] || customer[1] !== player[1])
    }).map(customer => {
        customer[2]--;
        return customer;
    });

    return {
        customers,
        gameState: customers.some(customer => customer[2] < 1)
            ? GameState.LOOSE :
            customers.length < 1
                ? GameState.WIN
                : gameState
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case "ACTION.MOVE_PLAYER":
            const result = moveTo({
                map: { ...state.level.map },
                player: { ...state.player },
                direction: action.payload,
                obstacles: state.obstacles
            });
            if (!result.success) return { ...state, gameState: GameState.LOOSE };

            const handledCustomers = handleCustomers(state.customers, result.position, state.gameState)
            return {
                ...state,
                gameState: handledCustomers.gameState,
                player: { ...state.player, lastDirection: action.payload, position: result.position },
                customers: handledCustomers.customers
            };
        case "ACTION.MOVE_OBSTACLE":
            const obstacles = { ...state.obstacles };
            if (obstacles[action.payload]) {
                obstacles[action.payload] = moveObstacleTo(obstacles[action.payload]);
                let gameState = state.gameState;
                if (collision(obstacles[action.payload], state.player)) {
                    gameState = GameState.LOOSE;
                }

                return {
                    ...state,
                    gameState,
                    obstacles
                };
            }
            return state;
        case 'CORE.MAP_LOADED':
            return {
                ...state,
                level: { ...state.level, map: action.payload },
                obstacles: action.payload.obstacles ? { ...action.payload.obstacles } : {},
                customers: action.payload.customers ? [...action.payload.customers] : [],
                player: {
                    position: action.payload.player ? [...action.payload.player] : []
                }
            };
        case 'CORE.CHANGE_STATE':
            return { ...state, gameState: GameState[action.payload] };
        case 'CORE.NEXT_LEVEL':
            return {
                ...state,
                gameState: GameState.PLAY,
                level: { currentLevel: action.payload }
            };
        default:
            return state
    }
}

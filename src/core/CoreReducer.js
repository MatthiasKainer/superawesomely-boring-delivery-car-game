import { GameState } from "./State";
import { moveTo } from "./player/Move";
import { moveObstacleTo } from "./obstacle/Move";
import { collision } from "./Collision";
import { handleCustomers } from "./customer/TikTok";

const reducer = (state = {}, action) => {
    return {
        "ACTION.MOVE_PLAYER" : () => {
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
        },
        "ACTION.MOVE_OBSTACLE" : () => {
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
        },
        'CORE.MAP_LOADED': () => {
            return {
                ...state,
                level: { ...state.level, map: action.payload },
                obstacles: action.payload.obstacles ? { ...action.payload.obstacles } : {},
                customers: action.payload.customers ? [...action.payload.customers] : [],
                player: {
                    position: action.payload.player ? [...action.payload.player] : []
                }
            };
        },
        'CORE.CHANGE_STATE': () => { return { ...state, gameState: GameState[action.payload] }},
        'CORE.NEXT_LEVEL': () => {
            return {
                ...state,
                gameState: GameState.PLAY,
                level: { currentLevel: action.payload }
            };
        }
    }
}

export default (state = {}, action) => {
    const current = reducer(state, action)[action.type];
    return current ? current() : state;
}

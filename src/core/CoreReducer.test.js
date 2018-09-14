
import CoreReducer from "./CoreReducer";
import { GameState } from "./State";
import { startPlaying, mapLoaded, movePlayer, moveObstacle } from "./CoreActions";
import { actionAsPromise } from "../testutils";
import { moveTo, Direction } from "./player/Move";
import { moveObstacleTo } from "./obstacle/Move";
jest.mock("./player/Move");
jest.mock("./obstacle/Move");

describe("GameState", () => {
    beforeEach(() => {
        moveTo.mockClear();
        moveObstacleTo.mockClear();
    })

    it("should fail the game if move obstacle to the position of the player", () => {
        const playerPosition = [1, 1];
        moveObstacleTo.mockImplementation(() => ({ position : playerPosition }));
        return actionAsPromise(moveObstacle, "obstacle")
            .then(action => {
                const newState = CoreReducer({ 
                    gameState : GameState.PLAY,
                    obstacles : {
                        obstacle : {}
                    }, 
                    player: { position: [1, 1] } 
                }, action);
                expect(newState.gameState).toEqual(GameState.LOOSE);
            })
    });

    describe("successful move player", () => {
        beforeEach(() => {
            moveTo.mockImplementation(() => ({ success: true, position: [0, 1] }));
        });

        it("should move the player if move is successful", () => {
            return actionAsPromise(movePlayer, Direction.LEFT)
                .then(action => {
                    const newState = CoreReducer({ level: { map: null }, player: { position: [1, 1] } }, action);
                    expect(newState.player.position).toEqual([0, 1]);
                });
        });

        it("should remove the customer the player has arrived on", () => {
            return actionAsPromise(movePlayer, Direction.LEFT)
                .then(action => {
                    const newState = CoreReducer({ 
                        level: { map: null }, 
                        player: { position: [1, 1] },
                        customers: [
                            [0, 1, 4],
                            [2, 1, 4]
                        ]
                    }, action);
                    expect(newState.customers.length).toEqual(1);
                    expect(newState.customers).toEqual([[2,1,3]]);
                });
        });

        it("should loose the game if runs out of time for one customer", () => {
            return actionAsPromise(movePlayer, Direction.LEFT)
                .then(action => {
                    const newState = CoreReducer({ 
                        gameState : GameState.PLAY,
                        level: { map: null }, 
                        player: { position: [1, 1] },
                        customers: [
                            [0, 1, 4],
                            [2, 1, 0]
                        ]
                    }, action);
                    expect(newState.gameState).toEqual(GameState.LOOSE);
                });
        });

        it("should win the level if all customers done", () => {
            return actionAsPromise(movePlayer, Direction.LEFT)
                .then(action => {
                    const newState = CoreReducer({ 
                        gameState : GameState.PLAY,
                        level: { map: null }, 
                        player: { position: [1, 1] },
                        customers: [
                            [0, 1, 4]
                        ]
                    }, action);
                    expect(newState.gameState).toEqual(GameState.WIN);
                });
        });
    });

    it("Should fail the game if the player collides", () => {
        moveTo.mockImplementation(() => ({ success: false }));
        return actionAsPromise(movePlayer, Direction.LEFT)
            .then(action => {
                const newState = CoreReducer({ level: { map: null }, player: { position: [1, 1] } }, action);
                expect(newState.player.position).toEqual([1, 1]);
                expect(newState.gameState).toEqual(GameState.LOOSE);
            })
    });

    it("Should switch to to PLAY if start playing is triggered", () => {
        return actionAsPromise(startPlaying)
            .then(action => {
                const newState = CoreReducer({ gameState: GameState.MENU }, action);
                expect(newState.gameState).toBe(GameState.PLAY);
            });
    });

    it("Should switch to to PLAY if start playing is triggered", () => {
        const newMap = { new: "map", customers : [] };
        return actionAsPromise(mapLoaded, newMap)
            .then(action => {
                const newState = CoreReducer({ level: { map: null } }, action);
                expect(newState.level.map).toBe(newMap);
            });
    });
});
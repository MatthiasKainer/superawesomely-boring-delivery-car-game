import { handleCustomers } from "./TikTok";
import { GameState } from "../State";

describe("Customers", () => {
    const playerPosition = [1,1];
    const longLivedCustomer = [0,0,99];
    const shortLivedCustomer = [0,0,1];
    const visitedCustomer = [1,1,1];

    it("should win the game if there are no more customers", () => {
        expect(handleCustomers([]).gameState).toBe(GameState.WIN);
    });

    it("should decrease the counter on the customer when called and not touch the gamestate", () => {
        const {gameState, customers} = handleCustomers([longLivedCustomer], playerPosition, GameState.PLAY);
        expect(gameState).toBe(GameState.PLAY);
        expect(customers[0][2]).toBe(longLivedCustomer[2]-1);
    });

    it("should decrease the counter on the customer when called and loose the game if running out", () => {
        const {gameState, customers} = handleCustomers([shortLivedCustomer], playerPosition, GameState.PLAY);
        expect(gameState).toBe(GameState.LOOSE);
        expect(customers[0][2]).toBe(0);
    });

    it("should win the game if the user has visited all customers and return an empty list", () => {
        const {gameState, customers} = handleCustomers([visitedCustomer], playerPosition, GameState.PLAY);
        expect(gameState).toBe(GameState.WIN);
        expect(customers.length).toBe(0);
    });
})
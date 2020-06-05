import { GameState } from "../State";
import { collision } from "../Collision";

export const handleCustomers = (customers, player, gameState) => {
    if (!customers) { return { gameState: GameState.WIN }; }

    customers = customers.filter(customer => {
        return !collision(customer, player)
    }).map(customer => {
        customer = [...customer];
        customer[2]--;
        return customer;
    });

    let updatedGameState = gameState
    let reason = undefined
    if (customers.some(customer => customer[2] < 1)) {
        reason = "You missed a checkpoint"
        updatedGameState = GameState.LOOSE
    }
    else if (customers.length < 1) {
        updatedGameState = GameState.WIN
    }

    return {
        customers,
        gameState: updatedGameState,
        reason
    }
}

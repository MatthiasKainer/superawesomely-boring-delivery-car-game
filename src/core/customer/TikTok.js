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

    return {
        customers,
        gameState: customers.some(customer => customer[2] < 1)
            ? GameState.LOOSE :
            customers.length < 1
                ? GameState.WIN
                : gameState
    }
}

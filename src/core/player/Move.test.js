import { moveTo, Direction } from "./Move";


describe("When a player wants to perform a valid move on a map", () => {
    const map = {
        "fields" : [
            ["road corner up-left", "road horizontal-up", "road corner up-right"],
            ["road vertical-left", "road horizontal-vertical", "road vertical-right"],
            ["road corner down-left", "road horizontal-down", "road corner down-right"]
        ],
        "player" : [1,1]
    }
    it("should change the player position to the left", () => {
        const result = moveTo({map, direction : Direction.LEFT});
        expect(result.success).toBe(true);
        expect(result.position).toEqual([0, 1]);
    });
    it("should change the player position to the right", () => {
        const result = moveTo({map, direction : Direction.RIGHT});
        expect(result.success).toBe(true);
        expect(result.position).toEqual([2, 1]);
    });
    it("should change the player position up", () => {
        const result = moveTo({map, direction : Direction.UP});
        expect(result.success).toBe(true);
        expect(result.position).toEqual([1, 0]);
    });
    it("should change the player position down", () => {
        const result = moveTo({map, direction : Direction.DOWN});
        expect(result.success).toBe(true);
        expect(result.position).toEqual([1, 2]);
    });
});

describe("When a player wants to perform a move that is blocked by a field", () => {
    const map = {
        "fields" : [
            ["road corner up-left", "road horizontal", "road corner up-right"],
            ["road vertical blocked", "meadows", "road vertical"],
            ["road corner down-left", "road horizontal", "road corner down-right"]
        ],
        "player" : [0,2]
    }
    it("should result in a failure", () => {
        const result = moveTo({map, direction : Direction.UP});
        expect(result.success).toBe(false);
    });
});

describe("When a player wants to perform a move that is denied", () => {
    const map = {
        "fields" : [
            ["road corner up-left", "road horizontal", "road corner up-right"],
            ["road vertical", "meadows", "road vertical"],
            ["road corner down-left", "road horizontal", "road corner down-right"]
        ],
        "player" : [1,1]
    }
    it("should result in a failure", () => {
        const result = moveTo({map, direction : Direction.UP});
        expect(result.success).toBe(false);
    });
});

describe("When a player wants to perform a move that is blocked by an obstacle", () => {
    const map = {
        "fields" : [
            ["road corner up-left", "road horizontal", "road corner up-right"],
            ["road vertical", "meadows", "road vertical"],
            ["road corner down-left", "road horizontal", "road corner down-right"]
        ],
        "player" : [1,1]
    }
    it("should result in a failure", () => {
        const obstacles = {
            "truck1" : {
                "position" : [0,1]
            }
        }
        const result = moveTo({map, direction : Direction.LEFT, obstacles});
        expect(result.success).toBe(false);
    });
});
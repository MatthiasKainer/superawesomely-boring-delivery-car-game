import { moveObstacleTo } from "./Move";

const defaultObstacle = { 
    directions : ["RIGHT", "DOWN"],
    "position" : [0, 0],
};

describe("when moving obstacles", () => {
    it("should move to the first position if no index set", () => { 
        const result = moveObstacleTo(defaultObstacle);
        expect(result.currentDirectionIndex).toBe(0);
        expect(result.currentDirection).toBe("RIGHT");
        expect(result.position).toEqual([1, 0]);
    });

    it("should move to the next position if an index is already set", () => { 
        const result = moveObstacleTo({...defaultObstacle, currentDirectionIndex : 0});
        expect(result.currentDirectionIndex).toBe(1);
        expect(result.currentDirection).toBe("DOWN");
        expect(result.position).toEqual([0, 1]);
    });

    it("should move to the first index if at the last", () => {
        const result = moveObstacleTo({...defaultObstacle, currentDirectionIndex : 1});
        expect(result.currentDirectionIndex).toBe(0);
        expect(result.currentDirection).toBe("RIGHT");
        expect(result.position).toEqual([1, 0]);
    });
});
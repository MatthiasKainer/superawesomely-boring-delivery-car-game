import { collision } from "./Collision";

describe("Collision", () => {
    it("it should return false if one of the two is no collision", () => {
        expect(collision("a string", [1,1])).toBe(false);
    });

    it("it should return false if one of the two has a short length", () => {
        expect(collision([1], [1,1])).toBe(false);
    });

    it("it should return true if one of the two has a longer length but still there's a collision", () => {
        expect(collision([1, 1, 1], [1,1])).toBe(true);
    });

    it("it should return false if one of the two has a longer length and there's no collision", () => {
        expect(collision([1, 2, 1], [1,1])).toBe(false);
    });

    it("it should return false if two positions do not collide", () => {
        expect(collision([0,0], [1,1])).toBe(false);
    });

    it("it should return true if two positions collide", () => {
        expect(collision([0,0], [0,0])).toBe(true);
    });
})
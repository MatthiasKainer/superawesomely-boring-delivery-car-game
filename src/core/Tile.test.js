import { tileAtPosition } from "./Tile";

describe("Getting a tile at a position", () => {
    const map = {
        fields : [
            [ "field1", "field 2"]
        ]
    }

    it("should not return anything if there is no map", () => {
        expect(tileAtPosition(null, [1,1])).toBe(null);
    });

    it("should not return anything if there is no such row", () => {
        expect(tileAtPosition(map, [0,1])).toBe(null);
    });

    it("should not return anything if there is no such item", () => {
        expect(tileAtPosition(map, [3,0])).toBe(null);
    });

    it("should return the field if there is such row/column", () => {
        expect(tileAtPosition(map, [0,0])).toBe("field1");
    });
});
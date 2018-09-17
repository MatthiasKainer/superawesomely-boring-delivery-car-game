import React from "react";
import { shallow } from 'enzyme';
import { Levels } from "./Levels";
import { Player } from './Player';
import { Customers } from './Customer';
import { Obstacles } from './Obstacles';
import * as LevelLoader from "../data/levels";
import Tile from "./Tile";

const initialState = {
    level: {
        current: "tutorial"
    }
};
describe("When opening a specific level id", () => {
    let levels;
    beforeEach(() => {
        levels = shallow(<Levels currentLevel={initialState.level.current} />);
    });

    it("should load the correct level", () => {
        expect(levels.instance().currentLevel).toBe(LevelLoader.tutorial);
    });

    describe("and it should load the tutorial level correctly", () => {
        it("should render 3 rows", () => {
            expect(levels.find(".row").length).toBe(3);
        });
        
        it("should render 9 fields", () => {
            expect(levels.find(Tile).length).toBe(9);
        });

        it("should render one player", () => {
            expect(levels.find(Player).length).toBe(1);
        });

        it("should render one customer", () => {
            expect(levels.find(Customers).length).toBe(1);
        });

        it("should render one obstacle", () => {
            expect(levels.find(Obstacles).length).toBe(1);
        });
    });
});
import React from "react";
import {Loop} from "./Loop";
jest.mock('./Loop');
import {Engine} from "./Engine";
import { GameState } from "./State";
import { shallow } from 'enzyme';
import Menu from './Menu';
import Levels from './Levels';
import Loose from "./Loose";
import Won from "./Won";

describe("When starting the engine", () => {
    let engine;

    beforeEach(() => {
        Loop.mockClear();
        engine = shallow(<Engine/>);
    });

    it("should setup the event loop", () => {
        expect(engine.instance().loop.setup).toBeCalled();
    });

    it("should render the menu if in that GameState", () => {
        engine = shallow(<Engine gameState={GameState.MENU}/>);
        expect(engine.contains(<Menu />)).toBe(true);
        expect(engine.contains(<Levels />)).toBe(false);
    });

    it("should render the levels if in that GameState", () => {
        engine = shallow(<Engine gameState={GameState.PLAY}/>);
        expect(engine.contains(<Menu />)).toBe(false);
        expect(engine.contains(<Levels />)).toBe(true);
    });

    it("should render the 'You lost' if in that GameState", () => {
        engine = shallow(<Engine gameState={GameState.LOOSE}/>);
        expect(engine.contains(<Menu />)).toBe(false);
        expect(engine.contains(<Loose />)).toBe(true);
    });

    it("should render the 'You won' if in that GameState", () => {
        engine = shallow(<Engine gameState={GameState.WIN}/>);
        expect(engine.contains(<Menu />)).toBe(false);
        expect(engine.contains(<Won />)).toBe(true);
    });

    describe("When unloading the engine", () => {
        beforeEach(() => {
            engine.instance().componentWillUnmount();
        });

        it("should stop the event loop", () => {
            expect(engine.instance().loop.stop).toBeCalled();
        });
    })
});
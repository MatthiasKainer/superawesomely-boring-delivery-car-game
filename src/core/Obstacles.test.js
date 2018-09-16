import React from "react";
import { shallow } from 'enzyme';
import {Obstacles} from "./Obstacles";

describe("When showing a single obstacle", () => {
    let obstacles;

    beforeEach(() => {
        obstacles = shallow(<Obstacles initialObstacles={{
            "truck1" : { 
                "type" : "truck",
                "position" : [0, 2]
            }
        }} />);
    });
    it("should render one obstacle", () => {
        expect(obstacles.find(".obstacle").length).toBe(1);
    });
    it("should put the obstacle to the right position", () => {
        expect(obstacles.find(".obstacle").props().style.top).toBe(64 * 2);
        expect(obstacles.find(".obstacle").props().style.left).toBe(0);
    });
});
describe("When showing multiple obstacles", () => {
    let obstacles;

    beforeEach(() => {
        obstacles = shallow(<Obstacles initialObstacles={{
            "truck1" : { 
                "type" : "truck",
                "position" : [0, 2]
            },
            "truck2" : { 
                "type" : "truck",
                "position" : [2, 2]
            }
        }} />);
    });
    it("should render all obstacles", () => {
        expect(obstacles.find(".obstacle").length).toBe(2);
    });
});
describe("When moving a single obstacle", () => {
    let obstacles;

    beforeEach(() => {
        obstacles = shallow(<Obstacles obstacles={{
            "truck1" : { 
                "type" : "truck",
                "position" : [0, 1]
            }
        }} initialObstacles={{
            "truck1" : { 
                "type" : "truck",
                "position" : [0, 2]
            }
        }} />);
    });
    it("should render one obstacle", () => {
        expect(obstacles.find(".obstacle").length).toBe(1);
    });
    it("should put the obstacle to the right position", () => {
        expect(obstacles.find(".obstacle").props().style.top).toBe(64 * 1);
        expect(obstacles.find(".obstacle").props().style.left).toBe(0);
    });
});
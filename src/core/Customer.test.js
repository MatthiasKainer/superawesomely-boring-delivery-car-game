import React from "react";
import { shallow } from 'enzyme';
import {Customers} from "./Customer";

describe("When showing a single customer", () => {
    let customers;

    beforeEach(() => {
        customers = shallow(<Customers positions={[[0,0]]} />);
    });
    it("should render one customer", () => {
        expect(customers.find(".customer").length).toBe(1);
    });
    it("should put the customer to the right position", () => {
        expect(customers.find(".customer").props().style.top).toBe(0);
        expect(customers.find(".customer").props().style.left).toBe(0);
    });
});


describe("When showing multiple single customers", () => {
    let customers;

    beforeEach(() => {
        customers = shallow(<Customers positions={[[0,0], [0,0]]} />);
    });
    it("should render one customer", () => {
        expect(customers.find(".customer").length).toBe(2);
    });
});
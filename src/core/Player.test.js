import React from "react";
import { shallow } from 'enzyme';
import { Player } from "./Player";

describe("When showing a player", () => {
    let player;

    beforeEach(() => {
        player = shallow(<Player startPosition={[2,2]} />);
    });

    it("should put the player to the right position", () => {
        expect(player.find(".player").props().style.top).toBe(64 * 2);
        expect(player.find(".player").props().style.left).toBe(64 * 2);
    });

    describe("if the player's position has been changed", () => {
        beforeEach(() => {
            player = shallow(<Player
                startPosition={[2,2]}
                player={{ position: [1, 1] }}
            />);
        });

        it("should put the player to the moved position", () => {
            expect(player.find(".player").props().style.top).toBe(64 * 1);
            expect(player.find(".player").props().style.left).toBe(64 * 1);
        });

    });
});
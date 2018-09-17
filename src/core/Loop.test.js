import {Loop, registerToEventLoop, removeFromEventLoop, cleanEventLoop} from "./Loop";
import { timeoutAsPromise } from "../testutils";

describe("When creating an event loop", () => {
    const eventLoop = new Loop();

    beforeEach(() => {
        eventLoop.setup();
    });
    
    it("should start a interval", () => {
        expect(eventLoop.interval).toBeDefined();
    });

    describe("When adding an item to the event loop", () => {
        let dummySubscriber = jest.fn();
        beforeEach(() => {
            dummySubscriber = jest.fn();
            registerToEventLoop("test-subscriber", dummySubscriber);
        });

        afterEach(() => {
            cleanEventLoop();
        });

        it("should call the subscriber after an event loop execution", () => {
            return timeoutAsPromise(eventLoop.LOOP_INTERVAL * 2)
                .then(() => {
                    expect(dummySubscriber).toBeCalled();
                })
        });

        it("should not allow to add an item with the same key twice", () => {
            expect(() => registerToEventLoop("test-subscriber", dummySubscriber)).toThrow();
        });

        it("should remove an item successfully, and make space so it can be added again", () => {
            registerToEventLoop("test", () => {});
            removeFromEventLoop("test");
            // this should not throw an exception
            registerToEventLoop("test", () => {});
            removeFromEventLoop("test");
        });
    });

    describe("And when the event loop is exited", () => {
        beforeEach(() => {
            eventLoop.stop();
        });
        
        it("should end the interval", () => {
            expect(eventLoop.interval).not.toBeDefined();
        });
    });
});
const registered = {};

const registerToEventLoop = (key, item) => {
    if (registered[key]) {
        throw new Error("An item with this key has already been registered");
    }
    registered[key] = item;
}

const removeFromEventLoop = (key) => {
    delete registered[key];
}

const cleanEventLoop = () => { 
    Object.keys(registered).forEach(item => delete registered[item]);
}

class Loop {
    LOOP_INTERVAL=50;
    interval;

    setup() {
        this.interval = setInterval(() => {
            this.loop();
        }, this.LOOP_INTERVAL);
    }
    loop() {
        Object.keys(registered).forEach(item => {
            if (registered[item]) registered[item]()
        });
    }
    stop() {
        delete this.interval;
    }
}

export {Loop, registerToEventLoop, removeFromEventLoop, cleanEventLoop};
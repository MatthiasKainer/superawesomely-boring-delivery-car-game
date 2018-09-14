const timeoutAsPromise = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout);
    });
};

const actionAsPromise = (action, ...args) => {
    return new Promise((resolve) => {
        return action(...args)(dispatch => {
            resolve(dispatch);
        })
    });
}

export {timeoutAsPromise, actionAsPromise};
export class ObservableData {
    constructor () {
        this.handlers = [];
    }

    subscribe(cb) {
        this.handlers.push(cb);
        return {
            unsubscribe: this.unsubsribe(cb)
        }
    }

    unsubsribe(cb) {
        return () => {
            this.handlers = this.handlers.filter((fn) => {
                return fn !==cb;
            })
        }
    }

    next(data) {
        this.handlers.forEach((subs) => {
            subs(data);
        });
    }
}


export class Keyboard {
    constructor () {
        this.handlers = [];
        this.actions = {
            direction: 'none',
            fire: false
        };
        let self = this;
        window.addEventListener("keydown", changeStateDown);
        window.addEventListener("keyup", changeStateUp);

        function changeStateDown(event){
            let actions = {...self.actions};
            switch (event.keyCode) {
                case 37:
                    actions.direction = 'left';
                    break;
                case 39:
                    actions.direction = 'right';
                    break;
                case 38:
                    actions.direction = 'up';
                    break;
                case 40:
                    actions.direction = 'down';
                    break;

                case 32:
                    actions.fire = true;
                    break;
                default:
                    // alert("Invalid Key pressed");
                    break;
            }
            self.next(actions);
        }
        function changeStateUp(event) {
            let actions = {...self.actions};
            let keys = [37, 38, 39, 40];
            if (keys.indexOf(event.keyCode) >= 0) {
                actions.direction = 'none';
            } else {
                if (event.keyCode == 32) {
                    actions.fire = false;
                }
            }
            self.next(actions);
        }
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
        if ((data.direction !== this.actions.direction) || (data.fire !== this.actions.fire)){
            this.actions = data;
            this.handlers.forEach((subs) => {
                subs(this.actions);
            });
        }
    }
}
// let direction = '';
// export default


export class Piece{

    constructor(x, y, velocity, width, height, direction) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.direction = direction;
    }

    move(){
        switch (this.direction) {
            case 'left':
                this.x -= 1;
                break;
            case 'right':
                this.x += 1;
                break;
            case 'up':
                this.y -= 1;
                break;
            case 'down':
                this.y += 1;
                break;
        }
    }
}
export class Piece{
    constructor(board, x, y, velocity, width, height, direction, color) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.color = color;
        this.board = board;
    }

    isEndTravel() {
        return this.x < 0;
    }

    crashWith(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    render() {
        this.board.draw('piece', this);
    }
}
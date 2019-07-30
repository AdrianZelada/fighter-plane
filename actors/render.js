export class Render{

    constructor(width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(type, piece) {
        if(type === 'piece') {
            this.context.fillStyle = piece.color;
            this.context.fillRect(piece.x, piece.y, piece.width, piece.height);
            this.context.fill();
            this.context.closePath();
        }

    }
}
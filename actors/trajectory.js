export function trajectory(block) {
    switch (block.level) {
        case 1:
            block = Object.assign(block,{
                move: function() {
                    this.x -= this.velocity;
                }
            });
            break;
        case 2:
            block = Object.assign(block, {
                mathFn: 'cos',
                limit: 0,
                calculate: false,
                buildSides: function() {
                    this.limit = this.y;
                    this.calculate = true;
                    this.mathFn = (this.limit % 2 === 0) ? 'cos': 'sin';
                },
                move: function() {
                    this.x -= this.velocity;
                    if(!this.calculate) {
                        this.buildSides();
                    }
                    let n = Math.trunc(Math[this.mathFn]((this.x * Math.PI)/360)*100);
                    this.y = this.limit + n;
                }
            });
            break;
    }
}
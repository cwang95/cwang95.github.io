class GridPopup extends Popup {
    constructor(config) {
        super(config);
        this.offset = 0;
        this.gridHeight = config.gridHeight || 50;
    }

    update(newX, newY, offset) {
        this.x = Math.round(newX-offset);
        this.y = Math.round(newY);
    }

    drawGrid(x, y) {
        this.offsetX = x%this.gridHeight;
        this.offsetY = y%this.gridHeight;
        this.ctx.beginPath();

        // draw background
        this.ctx.fillStyle = "#4287f5";
        this.ctx.fillRect(this.x,this.y,this.width-this.imageOffsetWidth,this.height-this.imageOffsetWidth);

        this.ctx.strokeStyle = "#f2f2f2";
        for (let i = this.offsetX; i<this.width-this.imageOffsetWidth; i+=this.gridHeight) {
          this.ctx.moveTo(x + i, y);
          this.ctx.lineTo(x + i, (y+this.height-this.imageOffsetWidth));
          this.ctx.stroke();
        }
        for (let i = this.offsetY; i<this.height-this.imageOffsetWidth; i+=this.gridHeight) {
          this.ctx.moveTo(x, y + i);
          this.ctx.lineTo((x+this.width-this.imageOffsetWidth), y + i);
          this.ctx.stroke();
        }
        // for (let i = 0; i < this.height; i += 10) {
        //   for (let j = 0; j < this.width; j += 10) {
        //     if ((j + i) / 32 % 2 === 0) {
        //       this.ctx.fillStyle = "#f2f2f2";
        //     } else {
        //       this.ctx.fillStyle = "#dddddd";
        //     }
        //     this.ctx.fillRect(j +  x , i + y, 100, 100);
        //   }
        // }
    }

    draw() {
        this.drawGrid(this.x, this.y);
        this.isLoaded && this.ctx.drawImage(
            this.image, 
            this.imageOffsetWidth, //left cut 
            this.imageOffsetWidth, //top cut,
            this.height, //width of cut
            this.width, //height of cut
            this.x, // Canvas X
            this.y, // Canvas Y
            this.height,
            this.width
         )

    }
}

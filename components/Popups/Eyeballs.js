class Eyeballs extends Popup {
    constructor(config) {
        super(config);
        this.mouseX = 0;
        this.mouseY = 0;
        this.d = 12;
    }

    updateMouse(mouseX, mouseY) {
        // console.log(`"Eyeballs"" ${mouseX}, ${mouseY}`)
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.drawCircles();
    }

    update(newX, newY, offset) {
        this.x = Math.round(newX-offset);
        this.y = Math.round(newY);
    }

    drawCircles() {

        var eyeX = this.x + 145;
        var eyeY = this.y + 230 ;

        var eye2X = this.x + 145;
        var eye2Y = this.y + 80 ;
        // Math.atan2(y, x) * 180 / Math.PI;
        let angle = Math.atan2(this.mouseY - eyeY, this.mouseX - eyeX);

        let x2 = eyeX + this.d * Math.cos(angle);
        let y2 = eyeY + this.d * Math.sin(angle);

        let angle2 = Math.atan2(this.mouseY - eye2Y, this.mouseX - eye2X);

        let x1 = eye2X + this.d * Math.cos(angle2);
        let y1 = eye2Y + this.d * Math.sin(angle2);
    

        this.ctx.beginPath();
        // this.ctx.arc(eyeLeftX, eyeLeftY, 10, 0, Math.PI * 2);
        this.ctx.arc(x2, y2, 22, 0, Math.PI * 2);
        this.ctx.arc(x1, y1, 22, 0, Math.PI * 2);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x2-1, y2-1, 5, 0, Math.PI * 2);
        this.ctx.arc(x1, y1, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
    }

    draw() {
        // console.log("Drawing eyeballs");
        this.drawCircles();
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

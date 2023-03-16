class Popup {
    constructor(config) {
        this.canvas = config.canvas;
        this.ctx = this.canvas.getContext("2d");

        this.type = config.type || "Regular";
        this.id = config.id;
        this.x = config.x;
        this.y = config.y;
        this.image = new Image();
        this.image.src = config.src || 'assets/images/about.PNG';
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.imageOffsetWidth = config.imageOffsetWidth || 16;

        this.width = config.width- this.imageOffsetWidth|| 320;
        this.height = config.height- this.imageOffsetWidth || 320;

        this.topBarHeight = config.topBarHeight || 16;

        this.canvasOffset = 0;

        this.posX = config.posX,
        this.posY = config.posY
    }

    update(newX, newY, offset) {
        this.x = Math.round(newX-offset);
        this.y = Math.round(newY);
    }

    resize(newCanvasWidth, newCanvasHeight) {
        const currRatioX = this.x / this.canvas.width;
        const currRatioY = this.y / this.canvas.height;

        const newX = currRatioX * newCanvasWidth;
        const newY = currRatioY * newCanvasHeight;

        this.update(newX, newY, 0);
    }

    drawContent() {

    }

    draw() {
        this.isLoaded && this.ctx.drawImage(
            this.image, 
            this.imageOffsetWidth, //left cut 
            this.imageOffsetWidth, //top cut,
            this.width, //width of cut
            this.height, //height of cut
            this.x, // Canvas X
            this.y, // Canvas Y
            this.width,
            this.height
         )

        this.ctx.fillStyle = "#14315e";
        this.ctx.font = "bold 24px Hellovetica";
        this.ctx.textAlign = "center";
        this.ctx.fillText("X: " + this.x, this.x +80, this.y +80);
        this.ctx.fillText("Y: " + this.y, this.x +80, this.y +100);
    }

    init() {
        const {x, y} = utils.getInitialCoordinates(this.canvas.width, this.canvas.height, this.posX, this.posY);
        this.x = x;
        this.y = y;
    }
}
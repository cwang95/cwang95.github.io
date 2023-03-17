class PixelDraw extends Popup {
    constructor(config) {
        super(config);

        this.type = "PixelDraw";
        this.pixels = {};
        this.canvasWidth = 282;
        this.canvasHeight = 236;
        this.pixelHeight = 5;

        this.colorPalette = ["#fc5e03", "#4287f5", "#000000", "#f2f2f2"];
        this.color = this.colorPalette[0];

        this.buttonOffsetLeft = 6;
        this.buttonOffsetTop = 23;
    }

    updateMenu() {
        this.element.style.left = this.x + this.buttonOffsetLeft + "px";
        this.element.style.top = this.y + this.buttonOffsetTop + this.canvasHeight+ "px";
        this.element.style.zIndex = "1";
    }

    update(newX, newY, offset) {
        this.x = Math.round(newX-offset);
        this.y = Math.round(newY);
        this.updateMenu();
    }

    getCanvasCoord(x, y) {
        const asCanvasCoord = utils.asGridCoord(Math.floor((x-this.x)/this.pixelHeight), Math.floor((y-this.y)/this.pixelHeight));
        const isDrawn = !!this.pixels[asCanvasCoord];
        return { 
            isDrawn,
            asCanvasCoord
        }
    }

    getRegularCoord(str) {
        const [canvasCoordX, canvasCoordY] = str.split(',')
        return {
            x: Math.round(this.x + parseInt(canvasCoordX) * this.pixelHeight),
            y: Math.round(this.y + parseInt(canvasCoordY) * this.pixelHeight)
        }
    }

    drawPixel(x, y) {
        const {asCanvasCoord } = this.getCanvasCoord(x, y);
        const bbox = utils.getBoundingBox(x, y, 1, 1);
        const contentBoundingBox = utils.getBoundingBox(this.x, this.y + this.topBarHeight, this.canvasWidth, this.canvasHeight);
        if (utils.intersects(bbox, contentBoundingBox)) this.pixels[asCanvasCoord] = this.color;
    }

    clearPixels() {
        this.pixels = {};
    }

    draw() {
        // draw background
        this.ctx.beginPath();
        this.ctx.fillStyle = "#f2f2f2";
        this.ctx.fillRect(this.x,this.y + this.topBarHeight,this.canvasWidth+6, this.canvasHeight);

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

        Object.keys(this.pixels).forEach(key => {
            if (!!this.pixels[key]) {
                const { x, y } = this.getRegularCoord(key);
                this.ctx.fillStyle = this.pixels[key];
                this.ctx.beginPath();
                this.ctx.fillRect(x,y,this.pixelHeight,this.pixelHeight);
                this.ctx.closePath();
                this.ctx.fill();
            }
        })

        //this.drawDisabledPalette
    }

    setColor(colorStr) {
        this.color = colorStr;
    }

    init() {
        this.pixels = window.initialGrid;
        this.element = document.createElement("div");
        this.element.classList.add("ColorRow");
        this.element.classList.add("DrawMenu");
        this.element.style.zIndex = "1";
        this.element.style.position = "absolute";
        this.element.style.left = this.x + this.buttonOffsetLeft + "px";
        this.element.style.top = this.y + this.buttonOffsetTop + this.canvasHeight+ "px";

        this.element.innerHTML =[`
            <button class="Color_button active"/>
            <button class="Color_button"/>
            <button class="Color_button"/>
            <button class="Color_button"/>
            <button class="Delete_button">X</button>
        `]

        this.colors = this.element.querySelectorAll(".Color_button");

        this.colors.forEach((color, idx)=> {
            color.style.backgroundColor = this.colorPalette[idx];
            color.addEventListener("click", ()=> {
                // Remove the "selected" class from all buttons
                this.colors.forEach(btn => btn.classList.remove('active'));
            
                // Add the "selected" class to the clicked button
                color.classList.add('active');
                // Close message
                this.setColor(this.colorPalette[idx]);
            })
        })

        this.deleteButton = this.element.querySelector(".Delete_button");
        this.deleteButton.addEventListener("click", ()=> {
            this.clearPixels();
        })

        document.body.appendChild(this.element);
    }
}

window.initialGrid = {
    "27,10": "#fc5e03",
    "27,9": "#fc5e03",
    "27,8": "#fc5e03",
    "28,8": "#fc5e03",
    "29,7": "#fc5e03",
    "30,7": "#fc5e03",
    "31,7": "#fc5e03",
    "31,6": "#fc5e03",
    "32,6": "#fc5e03",
    "33,6": "#fc5e03",
    "34,6": "#fc5e03",
    "35,7": "#fc5e03",
    "36,7": "#fc5e03",
    "37,7": "#fc5e03",
    "38,7": "#fc5e03",
    "38,8": "#fc5e03",
    "38,9": "#fc5e03",
    "38,10": "#fc5e03",
    "38,11": "#fc5e03",
    "37,11": "#fc5e03",
    "37,12": "#fc5e03",
    "36,12": "#fc5e03",
    "36,13": "#fc5e03",
    "35,13": "#fc5e03",
    "35,14": "#fc5e03",
    "34,14": "#fc5e03",
    "34,15": "#fc5e03",
    "33,15": "#fc5e03",
    "32,15": "#fc5e03",
    "35,15": "#fc5e03",
    "36,15": "#fc5e03",
    "37,16": "#fc5e03",
    "38,16": "#fc5e03",
    "38,17": "#fc5e03",
    "39,17": "#fc5e03",
    "39,18": "#fc5e03",
    "39,19": "#fc5e03",
    "39,20": "#fc5e03",
    "39,21": "#fc5e03",
    "38,21": "#fc5e03",
    "38,22": "#fc5e03",
    "38,23": "#fc5e03",
    "37,23": "#fc5e03",
    "36,24": "#fc5e03",
    "35,24": "#fc5e03",
    "34,24": "#fc5e03",
    "33,24": "#fc5e03",
    "32,24": "#fc5e03",
    "32,23": "#fc5e03",
    "31,23": "#fc5e03",
    "30,23": "#fc5e03",
    "30,22": "#fc5e03",
    "29,22": "#fc5e03",
    "29,23": "#fc5e03",
    "29,24": "#fc5e03",
    "28,24": "#fc5e03",
    "28,25": "#fc5e03",
    "28,26": "#fc5e03",
    "27,26": "#fc5e03",
    "27,27": "#fc5e03",
    "26,27": "#fc5e03",
    "26,28": "#fc5e03",
    "25,28": "#fc5e03",
    "24,28": "#fc5e03",
    "24,29": "#fc5e03",
    "23,29": "#fc5e03",
    "22,29": "#fc5e03",
    "21,29": "#fc5e03",
    "20,29": "#fc5e03",
    "19,29": "#fc5e03",
    "18,29": "#fc5e03",
    "18,28": "#fc5e03",
    "18,27": "#fc5e03",
    "17,27": "#fc5e03",
    "17,26": "#fc5e03",
    "17,25": "#fc5e03",
    "17,24": "#fc5e03",
    "18,24": "#fc5e03",
    "18,23": "#fc5e03",
    "16,25": "#fc5e03",
    "16,26": "#fc5e03",
    "15,26": "#fc5e03",
    "14,27": "#fc5e03",
    "13,27": "#fc5e03",
    "12,27": "#fc5e03",
    "11,27": "#fc5e03",
    "11,26": "#fc5e03",
    "10,26": "#fc5e03",
    "10,25": "#fc5e03",
    "9,25": "#fc5e03",
    "9,24": "#fc5e03",
    "8,24": "#fc5e03",
    "8,23": "#fc5e03",
    "8,22": "#fc5e03",
    "8,21": "#fc5e03",
    "8,20": "#fc5e03",
    "9,20": "#fc5e03",
    "9,19": "#fc5e03",
    "10,19": "#fc5e03",
    "10,18": "#fc5e03",
    "11,18": "#fc5e03",
    "11,17": "#fc5e03",
    "12,17": "#fc5e03",
    "11,16": "#fc5e03",
    "11,15": "#fc5e03",
    "11,14": "#fc5e03",
    "11,13": "#fc5e03",
    "11,12": "#fc5e03",
    "12,12": "#fc5e03",
    "12,11": "#fc5e03",
    "13,10": "#fc5e03",
    "14,10": "#fc5e03",
    "15,10": "#fc5e03",
    "16,10": "#fc5e03",
    "16,11": "#fc5e03",
    "17,11": "#fc5e03",
    "17,12": "#fc5e03",
    "17,10": "#fc5e03",
    "17,9": "#fc5e03",
    "17,8": "#fc5e03",
    "18,7": "#fc5e03",
    "18,6": "#fc5e03",
    "19,6": "#fc5e03",
    "19,5": "#fc5e03",
    "20,5": "#fc5e03",
    "21,5": "#fc5e03",
    "22,5": "#fc5e03",
    "23,5": "#fc5e03",
    "24,5": "#fc5e03",
    "24,6": "#fc5e03",
    "25,6": "#fc5e03",
    "26,6": "#fc5e03",
    "26,7": "#fc5e03",
    "26,8": "#fc5e03",
    "27,12": "#fc5e03",
    "26,12": "#fc5e03",
    "25,12": "#fc5e03",
    "24,12": "#fc5e03",
    "23,12": "#fc5e03",
    "23,13": "#fc5e03",
    "22,13": "#fc5e03",
    "21,13": "#fc5e03",
    "21,14": "#fc5e03",
    "20,14": "#fc5e03",
    "20,15": "#fc5e03",
    "20,16": "#fc5e03",
    "20,17": "#fc5e03",
    "19,17": "#fc5e03",
    "19,18": "#fc5e03",
    "20,18": "#fc5e03",
    "20,19": "#fc5e03",
    "21,19": "#fc5e03",
    "22,19": "#fc5e03",
    "23,19": "#fc5e03",
    "24,19": "#fc5e03",
    "25,19": "#fc5e03",
    "26,19": "#fc5e03",
    "27,18": "#fc5e03",
    "28,18": "#fc5e03",
    "28,17": "#fc5e03",
    "29,17": "#fc5e03",
    "29,16": "#fc5e03",
    "29,15": "#fc5e03",
    "29,14": "#fc5e03",
    "29,13": "#fc5e03",
    "28,13": "#fc5e03",
    "28,12": "#fc5e03",
    "25,13": "#fc5e03",
    "24,13": "#fc5e03",
    "24,14": "#fc5e03",
    "24,15": "#fc5e03",
    "24,16": "#fc5e03",
    "25,16": "#fc5e03",
    "26,16": "#fc5e03",
    "26,15": "#fc5e03",
    "27,15": "#fc5e03",
    "30,24": "#fc5e03",
    "30,25": "#fc5e03",
    "30,26": "#fc5e03",
    "30,27": "#fc5e03",
    "31,28": "#fc5e03",
    "31,29": "#fc5e03",
    "31,30": "#fc5e03",
    "31,31": "#fc5e03",
    "31,32": "#fc5e03",
    "32,32": "#fc5e03",
    "32,33": "#fc5e03",
    "32,34": "#fc5e03",
    "32,35": "#fc5e03",
    "32,36": "#fc5e03",
    "32,37": "#fc5e03",
    "32,38": "#fc5e03",
    "32,39": "#fc5e03",
    "32,40": "#fc5e03",
    "32,41": "#fc5e03",
    "32,42": "#fc5e03",
    "32,43": "#fc5e03",
    "32,44": "#fc5e03",
    "32,45": "#fc5e03",
    "31,45": "#fc5e03",
    "31,46": "#fc5e03",
    "30,46": "#fc5e03",
    "31,44": "#fc5e03",
    "31,43": "#fc5e03",
    "31,42": "#fc5e03",
    "30,42": "#fc5e03",
    "30,41": "#fc5e03",
    "29,40": "#fc5e03",
    "29,39": "#fc5e03",
    "28,39": "#fc5e03",
    "28,38": "#fc5e03",
    "27,38": "#fc5e03",
    "27,37": "#fc5e03",
    "26,37": "#fc5e03",
    "26,36": "#fc5e03",
    "25,36": "#fc5e03",
    "24,36": "#fc5e03",
    "24,35": "#fc5e03",
    "23,35": "#fc5e03",
    "22,35": "#fc5e03",
    "21,35": "#fc5e03",
    "20,34": "#fc5e03",
    "19,34": "#fc5e03",
    "18,34": "#fc5e03",
    "17,34": "#fc5e03",
    "16,33": "#fc5e03",
    "15,33": "#fc5e03",
    "14,33": "#fc5e03",
    "13,33": "#fc5e03",
    "12,33": "#fc5e03",
    "12,34": "#fc5e03",
    "12,35": "#fc5e03",
    "12,36": "#fc5e03",
    "13,37": "#fc5e03",
    "14,37": "#fc5e03",
    "15,38": "#fc5e03",
    "16,38": "#fc5e03",
    "17,39": "#fc5e03",
    "18,39": "#fc5e03",
    "19,39": "#fc5e03",
    "19,40": "#fc5e03",
    "20,40": "#fc5e03",
    "21,41": "#fc5e03",
    "22,41": "#fc5e03",
    "22,42": "#fc5e03",
    "23,42": "#fc5e03",
    "24,43": "#fc5e03",
    "25,43": "#fc5e03",
    "26,43": "#fc5e03",
    "27,44": "#fc5e03",
    "28,44": "#fc5e03",
    "29,44": "#fc5e03",
    "29,45": "#fc5e03",
    "30,45": "#fc5e03"
}
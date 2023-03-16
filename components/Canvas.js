const TOPBAR_HEIGHT = 16;

class Canvas {
    constructor() {
        this.popups = [];
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.isDragging = false;
        this.isDrawing = false;

        this.mouseX = 0;
        this.mouseY = 0;

        this.moveListener = null;

        this.image = new Image();
        this.image.src = 'assets/images/about.PNG';
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.dragOffset = 0;
    }

    bringToTop(idx) {
        this.popups.unshift(this.popups.splice(idx, 1)[0]);

        if (this.popups[0].type === "PixelDraw") {
            document.querySelector(".ColorRow").style.zIndex = "1"
            return;

        } else {
            document.querySelector(".ColorRow").style.zIndex = "-1"
        }

    }

    move(e){
        e.preventDefault();
        e.stopPropagation();
        const { x, y } = utils.getMousePos(e, this.canvas, this.ctx);
        
        if (this.isDragging){
            var draggingPopup = this.popups[0];

            // Reset drag offset on new drag instance
            if (this.dragOffset === 0) {
                this.dragOffset = x - draggingPopup.x;
            }
            draggingPopup.update(x, y, this.dragOffset);
            return;
        }

        if (this.isDrawing) {
            this.popups[0].drawPixel(x, y);
            return;
        }
    }

    mouseDown(e){
        e.preventDefault();
        e.stopPropagation();
        var pos = utils.getMousePos(e, this.canvas, this.ctx);
        const mouseBox = utils.getBoundingBox(pos.x, pos.y, 1, 1);

        // Draw last items first so they show up behind earlier items
        for (let i = 0; i < this.popups.length; i++ ) {
            const { type, x, y, width, height } = this.popups[i];

            const topBarBoudingBox = utils.getBoundingBox(x, y, width, TOPBAR_HEIGHT);
            const contentBoundingBox = utils.getBoundingBox(x, y + TOPBAR_HEIGHT, width, height - TOPBAR_HEIGHT);

            if (utils.intersects(mouseBox, topBarBoudingBox)) {
              // Flag isDragging to be true
              this.isDragging = true;

              // Move dragging popup to top so it shows first
              this.bringToTop(i);

              return;
            }
            if (utils.intersects(mouseBox, contentBoundingBox)) {
                // If we are inside the drawing area of a pixel draw window
                if (this.popups[i].type === "PixelDraw") {
                    // Bring window to the front and draw the pixel
                    this.popups[i].drawPixel(pos.x, pos.y);
                    this.bringToTop(i);
                    this.isDrawing = true;
                    return;
                } else {
                    this.bringToTop(i);
                    return;
                }
            }
        }
    }

    mouseUp(e){
        e.preventDefault();
        e.stopPropagation();
        this.isDragging = false;
        this.isDrawing = false;
        this.dragOffset = 0;
    }
    
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clear();

        // Orange background box
        // this.ctx.fillStyle = "#fc5e03";
        // this.ctx.beginPath();
        // this.ctx.fillRect(0,0,this.canvas.width*.25,this.canvas.height*.25);
        // this.ctx.fillRect(this.canvas.width*.25,this.canvas.height*.25,this.canvas.width,this.canvas.height);
        // this.ctx.closePath();
        // this.ctx.fill();

        // Draw last items first so they show up behind earlier items
        for (let i = this.popups.length-1; i>=0; i-- ) {
            this.popups[i].draw();
        }
    }

    startGameLoop() {
        const step = () => {
            this.draw();
            requestAnimationFrame(step);
        }
        step();
        console.log(this.popups);
    }

    handleResize() {
        const newHeight = window.innerHeight;
        const newWidth = window.innerWidth;

        for (let i = 0; i<this.popups.length; i++ ) {
            this.popups[i].resize(newWidth, newHeight);
        }
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    debounce(func, time){
        var time = time || 200; // 100 by default if no param
        var timer;
        return function(event){
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }

    initializePopups() {
        this.popups.push(new PixelDraw({
            x: 600, 
            y: 450, 
            canvas: this.canvas, 
            id: 2, 
            src: "assets/images/pixel_draw_style2.png", 
            height: 320, 
            width: 320
        }));

        this.popups.push(new Popup({
            x: 800, 
            y: 300,
            x: 600, 
            y: 30, 
            canvas: this.canvas, 
            id: 0,
            posX: 0.45,
            posY: 0.1
        }));
        
        this.popups.push(new GridPopup({
            x: 800, 
            y: 300, 
            canvas: this.canvas, 
            id: 3, 
            src: "assets/images/about_transparent.png", 
            height: 320, 
            width: 320,
            posX: 0.6,
            posY: 0.25
        }));

        for (let i = 0; i<this.popups.length; i++) {
            this.popups[i].init();
        }
    }

    init() {
        const intro = new IntroModule();
        intro.init();
        
        this.initializePopups();

        // this.popups[3].init();
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 200));

        document.addEventListener("mousedown", e => {this.mouseDown(e)});
        document.addEventListener("mouseup", e => {this.mouseUp(e)});
        document.addEventListener("mousemove", e => {this.move(e)});
        
        setTimeout(()=> {
            this.startGameLoop();
        }, 100);
    }
}
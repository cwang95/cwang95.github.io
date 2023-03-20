class IntroModule {
    constructor() {
        this.element = null;
        this.asciiName = null;
        this.boundingRect = null;
    }

    updateAscii(idx) {
        this.selectedAscii = idx;
        this.asciiNameElement.innerHTML =[`${asciiNames[this.selectedAscii]}`];
    }

    init() {
        this.element = document.querySelector('.Intro');
        // var elem = document.getElementById('chart');
        // elem.style.width = 70 + "%";
        const {x, y, width, height} = this.element.getBoundingClientRect();

        this.boundingRect = utils.getBoundingBox(x, y, width, height);
        console.log(this.boundingRect);
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        console.log(`windowWidth: ${windowWidth}`)
        console.log(`windowHeight: ${windowHeight}`)
        
        this.asciiName = new AsciiName(this.element);
        this.asciiName.init()
    }
}
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
        const {x, y, width, height} = this.element.getBoundingClientRect();

        this.boundingRect = utils.getBoundingBox(x, y, width, height);
        console.log(this.boundingRect);
        
        this.asciiName = new AsciiName(this.element);
        this.asciiName.init()
    }
}
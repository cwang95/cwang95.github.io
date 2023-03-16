class AsciiName {
    constructor(parent) {
        this.parent = parent;
        this.asciiNameElement = null;
        this.selectedAscii = 0;
        this.asciiOptions = [];

        this.numOptions = asciiNames.length;
    }

    updateAscii(idx) {
        this.asciiOptions.forEach((btn,i) => {
            if (i!==idx) btn.classList.remove('active');
            else btn.classList.add('active');
        });
        this.selectedAscii = idx;
        this.asciiNameElement.innerHTML =[`${asciiNames[this.selectedAscii]}`];
    }

    navigateLeft() {
        const leftIdx = this.selectedAscii === 0 ? this.numOptions-1 : this.selectedAscii-1;
        this.updateAscii(leftIdx);
    }

    navigateRight() {
        const rightIdx = (this.selectedAscii+1)%(this.numOptions);
        this.updateAscii(rightIdx);
    }

    init() {
        this.asciiNameElement = document.querySelector('.AsciiName');
        this.asciiNameElement.innerHTML =[`${asciiNames[this.selectedAscii]}`];

        this.asciiNav = document.querySelector('.AsciiNav');

        this.asciiNav.innerHTML =[`
            <button class="AsciiNavButtonLeft"><</button>
            <button class="AsciiOptionButton" id={0}/>
            <button class="AsciiOptionButton active" id={1}/>
            <button class="AsciiOptionButton" id={2}/>
            <button class="AsciiOptionButton" id={3}/>
            <button class="AsciiOptionButton" id={4}/>
            <button class="AsciiNavButtonRight">></button>
        `]

        this.asciiOptions = this.asciiNav.querySelectorAll(".AsciiOptionButton");

        this.asciiOptions.forEach((optionButton, idx)=> {
            optionButton.addEventListener("click", ()=> {
                this.updateAscii(idx);
            })
        })
        const leftButton = this.asciiNav.querySelector(".AsciiNavButtonLeft");
        leftButton.addEventListener("click", ()=> { this.navigateLeft() });

        const rightButton = this.asciiNav.querySelector(".AsciiNavButtonRight");
        rightButton.addEventListener("click", ()=> { this.navigateRight() });
    }
}
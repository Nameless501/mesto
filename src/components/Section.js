export class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems = async (getData) => {
        const allData = await getData();
        const res = await allData[0].forEach(currentCard => {
            this._renderer(currentCard, allData[1]);
        });
    }

    addItem = (element) => {
        this._container.append(element);
    }

    refreshCards = async (getData) => {
        this._container.innerHTML = '';
        const render = await this.renderItems(getData);
    }
}
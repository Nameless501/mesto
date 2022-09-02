export class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems = (cardsData, userId) => {
        cardsData.forEach(currentCard => {
            this._renderer(currentCard, userId);
        });
    }

    addItem = (element, toStart = true) => {
        toStart ? this._container.append(element) : this._container.prepend(element);
    }

    refreshCards = (cardsData, userId) => {
        this._container.innerHTML = '';
        this.renderItems(cardsData, userId);
    }
}
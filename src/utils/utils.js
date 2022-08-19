import { Card } from '../components/Card.js'

export function renderCard(data, handleCardClick) {
    const card = new Card(data, '.elements__card-template', handleCardClick);
    return card.createCard();
}
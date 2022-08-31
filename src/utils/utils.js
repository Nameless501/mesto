import { Card } from '../components/Card.js'

export function renderCard(cardData, userData, handleCardClick, handleLike, handleDeleteButton) {
    const card = new Card(cardData, userData, '.elements__card-template', handleCardClick, handleLike, handleDeleteButton);
    return card.createCard();
}
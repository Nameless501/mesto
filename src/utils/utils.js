import { Card } from '../components/Card.js'

export function renderCard(cardData, userId, handleCardClick, handleLike, handleDeleteButton) {
    const card = new Card(cardData, userId, '.elements__card-template', handleCardClick, handleLike, handleDeleteButton);
    return card.createCard();
}
export default function createDeck() {
    const suits = ['spade', 'club', 'heart', 'diamond']
    const cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'] 
    const deck = []

    cards.map((card) => {
        suits.forEach((suit) => {
            deck.push({ value: card, suit });
        });
    });
    return deck
}
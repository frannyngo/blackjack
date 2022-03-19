function convertFaces(string) {
    switch(string) {
        case 'A':
            return 1
        break;
        case 'J': 
            return 10
        break;
        case 'Q': 
            return 10
        break; 
        case 'K':
            return 10
        break;
        default: 
            return string 
    };
}

export default function checkCount(hand) {
    let count = 0
    hand.map((card) => {
        const cardValue = convertFaces(card.value)
        count = count + cardValue
    })
    return count
}
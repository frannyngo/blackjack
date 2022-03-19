function convertFaces(string) {
    switch(string) {
        case 'A':
            return 1
        case 'J': 
            return 10
        case 'Q': 
            return 10
        case 'K':
            return 10
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
function findCard(hand, value) {
     const found = hand.find((card) => {
        return card.value === value
    })
    return found
}

export default function checkBlackJack(hand) {
    const king = findCard(hand, 'K')
    const queen = findCard(hand, 'Q')
    const jack = findCard(hand, 'J')
    const ace = findCard(hand, 'A')

   if (king && ace) {
       return true
   } else if (queen && ace) {
       return true
   } else if (jack && ace) {
       return true
   }
   return false
}
import React, {
    useEffect,
    useState,
} from "react";
import createDeck from "../../Functions/createDeck";
import shuffle from "../../Functions/shuffle";
import checkCount from "../../Functions/checkCount";
import checkBlackJack from '../../Functions/checkBlackjack';
import { Card } from "../../Components";
import {
    DealerContainer,
    PlayerContainer,
    Table,
    PlayerActionsContainer,
    PlayerButton,
    CountAndMessageContainer,
    MessageContainer,
    CountContainer,
} from './HomeStyles'

export default function Home() {
    const [remainingDeck, setRemainingDeck] = useState()
    const [dealersTurn, setDealersTurn] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [playerCount, setPlayerCount] = useState(0)
    const [dealersCount, setDealersCount] = useState(0)
    const [hideCard, setHideCard] = useState(true)
    const [win, setWin] = useState({
        blackjack: false,
        message: 'game in progress...'
    })
    const [dealersCard, setDealersCard] = useState([{ 
        value: 'N/A', 
        suit: 'N/A',
        hide: true,
    }], [{ 
        value: 'N/A', 
        suit: 'N/A',
        hide: false,
    }]);
    const [playersCard, setPlayersCard] = useState([{ 
        value: 'N/A', 
        suit: 'N/A',
        hide: false,
    }], [{ 
        value: 'N/A', 
        suit: 'N/A',
        hide: false,
    }]);

    function startGame() {
        setDealersTurn(false)
        setHideCard(true);
        setDealersCount(0);
        const deck = createDeck();
        const shuffledDeck = shuffle(deck);
        const a = shuffledDeck.pop();
        const b = shuffledDeck.pop();
        const c = shuffledDeck.pop();
        const d = shuffledDeck.pop();

        setDealersCard([{
            value: a.value, 
            suit: a.suit,
            hide: true,
        }, {
            value: b.value, 
            suit: b.suit,
            hide: false,
        }]);

        setPlayersCard([{
            value: c.value, 
            suit: c.suit,
            hide: false,
        }, {
            value: d.value, 
            suit: d.suit,
            hide: false,
        }]);
        setRemainingDeck(shuffledDeck)
        setWin({ 
            blackjack: false, 
            message: 'game in progress...'
        });
        setDisableButton(false)
    }

    function hit() {
        const newCard = remainingDeck.pop()
        setPlayersCard([
            ...playersCard, {
                value: newCard.value, 
                suit: newCard.suit,
                hide: false,
            },
        ]);
    }

    function dealerHit() {
        setTimeout(() => {
            const newCard = remainingDeck.pop()
            setDealersCard([
                ...dealersCard, {
                    value: newCard.value, 
                    suit: newCard.suit,
                    hide: false,
                },
            ]);
        }, 1500)
    }

    function stay() {
        setDealersTurn(true);
        setHideCard(false);
        
        const count = checkCount(playersCard);
        const blackjack = checkBlackJack(playersCard)
        const dealerCount = checkCount(dealersCard)
        setDealersCount(dealerCount)

        if (blackjack) { 
            setWin({ blackjack: true, message: 'DEALER GOT BLACKJACK!' });
            newGame();
        } else if (dealerCount <= 16) {
            dealerHit();
        } else if (dealerCount >= 22) {
            setWin({ blackjack: false, message: 'YOU WIN! Dealer Bust' });
            newGame();
        } else if (dealerCount >= 17 && dealerCount <= 21 && dealerCount > count) {
            setWin({ blackjack: false, message: 'Dealer Wins' });
            newGame();
        } else if (dealerCount >= 17 && dealerCount <= 21 && dealerCount < count) {
            setWin({ blackjack: false, message: 'YOU WIN!' });
            newGame();
        } else if (dealerCount >= 17 && dealerCount <= 21 && dealerCount === count) {
            setWin({ blackjack: false, message: 'DRAW!' });
            newGame();
        }
    }

    function newGame() {
        setHideCard(false)
        setDisableButton(true)
        setTimeout(() => {
            startGame();
        }, 3500);
    }

    useEffect(() => {
        if (dealersTurn) {
            const count = checkCount(playersCard);
            const dealerCount = checkCount(dealersCard)
            setDealersCount(dealerCount)
            if (dealerCount <= 16) {
                dealerHit();
            } else if (dealerCount >= 22) {
                setWin({ blackjack: false, message: 'YOU WIN! Dealer Bust' });
                newGame();
            } else if (dealerCount >= 17 && dealerCount <= 21 && dealerCount > count) {
                setWin({ blackjack: false, message: 'Dealer Wins' });
                newGame();
            } else if (dealerCount >= 17 && dealerCount <= 21 && dealerCount < count) {
                setWin({ blackjack: false, message: 'YOU WIN!' });
                newGame();
            } else if (dealerCount >= 17 && dealerCount <= 21 && dealerCount === count) {
                setWin({ blackjack: false, message: 'DRAW!' });
                newGame();
            }
        }
    }, [dealersCard])

    useEffect(() => {
        if (playersCard.length === 2) {
            const blackjack = checkBlackJack(playersCard)
            if (blackjack) { 
                setWin({ blackjack: true, message: 'YOU GOT BLACKJACK!' });
                const dealerCount = checkCount(dealersCard)
                setDealersCount(dealerCount)
                newGame();
            } else {
                setPlayerCount(checkCount(playersCard));
            };
        } else {
            const count = checkCount(playersCard);
            setPlayerCount(count);
            if (count >= 22) {
                setWin({ blackjack: false, message: 'YOU BUST' });
                const dealerCount = checkCount(dealersCard)
                setDealersCount(dealerCount)
                newGame();
            } else {
                setPlayerCount(checkCount(playersCard));
            }
        }
    }, [playersCard])

    useEffect(() => {
        startGame();
    }, [])


    return (
        <Table>
            <CountAndMessageContainer>
                <CountContainer>Dealer: {dealersCount}</CountContainer>
                <MessageContainer>
                    { win.who === 'player'? (
                        <p style={{ fontSize: 22 }}>{win.message}</p>
                    ) : win.who === 'dealer'? (
                        <p style={{ fontSize: 22 }}>{win.message}</p>
                    ) : (
                        <p style={{ fontSize: 22 }}>{win.message}</p>
                    )}
                </MessageContainer>
                <CountContainer>Player: {playerCount}</CountContainer>
            </CountAndMessageContainer>
            <DealerContainer>
                { dealersCard.map((card, i) => {
                    if (i === 0) {
                        return (
                            <Card 
                                key={i}
                                hide={hideCard}
                                number={card.value}
                                suit={card.suit}
                            />
                        );
                    } else {
                        return (
                            <Card 
                                key={i}
                                hide={card.hide}
                                number={card.value}
                                suit={card.suit}
                            />
                        );
                    }
                })}
            </DealerContainer>
            <PlayerContainer>
                { playersCard.map((card, i) => {
                    return (
                        <Card 
                            key={i}
                            hide={card.hide}
                            number={card.value}
                            suit={card.suit}
                        />
                    );
                })}
            </PlayerContainer>
            <PlayerActionsContainer>
                <PlayerButton onClick={hit} disabled={disableButton}>Hit</PlayerButton>
                <PlayerButton onClick={stay} disabled={disableButton}>Stay</PlayerButton>
            </PlayerActionsContainer>
        </Table>
    )
}
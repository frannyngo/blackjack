import React from "react"
import {
    CardContainer,
    CardNumberContainer,
    CardSuitContainer,
    CardContainerDealer,
} from './CardStyle'

export function Card({hide, number, suit}) {
    return (
        <div>
            { hide? (
                <CardContainerDealer>
                    <CardNumberContainer>
                        { suit === 'heart' || 'diamond'? (
                            <p style={{ fontSize: 22, color: 'red' }}>{number}</p>
                        ) : (
                            <p style={{ fontSize: 22}}>{number}</p>
                        )}
                    </CardNumberContainer>
                    <CardSuitContainer>
                        { suit === 'heart' || 'diamond'? (
                                <p style={{ fontSize: 22, color: 'red' }}>{suit}</p>
                        ) : (
                            <p style={{ fontSize: 22}}>{suit}</p>
                        )}
                    </CardSuitContainer>
                </CardContainerDealer>
            ) : (
                <CardContainer>
                    <CardNumberContainer>
                        { suit === 'heart' || 'diamond'? (
                            <p style={{ fontSize: 22, color: 'red' }}>{number}</p>
                        ) : (
                            <p style={{ fontSize: 22}}>{number}</p>
                        )}
                    </CardNumberContainer>
                    <CardSuitContainer>
                        { suit === 'heart' || 'diamond'? (
                                <p style={{ fontSize: 22 }}>{suit}</p>
                        ) : (
                            <p style={{ fontSize: 22}}>{suit}</p>
                        )}
                    </CardSuitContainer>
                </CardContainer>
            )}
        </div>
    );
}
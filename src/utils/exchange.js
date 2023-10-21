const dollar = 12200;

export function dollarToSom(payload){
    const res = payload * dollar
    return res.toLocaleString();
}

export function somToDollar(payload){
    const res = payload / dollar
    return Math.round(res);
}
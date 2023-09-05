const dollar = 12200;

export function dollarToSom(payload){
    const res = payload * dollar
    return res.toLocaleString();
}

export function somToDolllar(payload){
    const res = payload / dollar
    return res.toLocaleString();
}
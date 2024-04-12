const dollar = 0.80;

export function dollarToPound(payload){
    const res = payload * dollar
    return res.toLocaleString();
}

export function poundToDollar(payload){
    const res = payload / dollar
    return Math.round(res);
}
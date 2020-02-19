export function changeDecimalSign(number: number) {
    let fixedNumber = number.toFixed(2);
    let intPart = fixedNumber.split('.')[0];
    let decimalPart = fixedNumber.split('.')[1];
    let num = `${intPart},${decimalPart}`

    return { intPart, decimalPart, num };
}

export function calculateTotalPrice(cart: any[]) {
    console.log(`Cart: ${cart}`)

    let total = cart.reduce((acc, cur) => (acc + (cur.quantity * cur.price)), 0);
    return total;
}
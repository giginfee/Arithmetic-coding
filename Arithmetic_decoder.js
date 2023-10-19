class ArithmeticDecoder {
    compressedData=0
    decodedMessage = '';
    finalLen = 0;
    constructor(probabilities) {
        this.currentLowHighList=[]
        this.low = 0;
        this.high = 1;

        this.probabilities = probabilities;
        this.updateLowHighList(this.low, 1);
        this.currentIndex = 0;
    }
    decode(input, finalLen) {
        this.finalLen=finalLen
        this.compressedData = this.binaryFractionToDecimal(input);
        this.decodeSymbol()
        return this.decodedMessage;
    }
    decodeSymbol() {
        for (let symbol of this.currentLowHighList) {
            const { low, high } =symbol;
            if (this.compressedData >= low && this.compressedData < high) {
                this.decodedMessage+=symbol.char
                this.finalLen--
                if(this.finalLen === 0)
                    return
                else{
                    this.updateLowHighList(low, high);
                    this.decodeSymbol()
                }

            }
    }}

    updateLowHighList(low, high){
        const totalRange = high - low;
        this.currentLowHighList=[]

            for (const { char, probability } of this.probabilities) {
                high = low + totalRange * probability;
                this.currentLowHighList.push({char,low,high});
                low = low + totalRange * probability;
            }
    }
    binaryFractionToDecimal(fractionalPart) {

        let fractionalDecimal = 0;
        if (fractionalPart) {
            for (let i = 0; i < fractionalPart.length; i++) {
                const digit = parseInt(fractionalPart[i], 2);
                fractionalDecimal += digit / Math.pow(2, i + 1);
            }
        }
        return fractionalDecimal;
    }



}

let probabilities = [
    { char: 'A', probability: 0.5 },
    { char: 'B', probability: 0.25 },
    { char: 'C', probability: 0.125 },
    { char: 'D', probability: 0.125 },
];
probabilities = [
    { char: 'a', probability: 0.25 },
    { char: 'b', probability: 0.21 },
    { char: 'c', probability: 0.06 },
    { char: 'd', probability: 0.26 },
    { char: 'e', probability: 0.22 },
];

const decoder = new ArithmeticDecoder(probabilities);
const decodedData = decoder.decode('01011011101111', 5);
console.log('Decoded data:', decodedData);
// 100111100000110111101101001010001000110011100111


class ArithmeticEncoder {
    constructor(probabilities) {
        this.low = 0;
        this.high = 1;
        this.output = '';
        this.probabilities = probabilities;
    }

    encode(input) {
        for (const symbol of input) {
            const { low, high } = this.getSymbolRange(symbol);
            this.updateRange(low, high);
        }
        this.finalize();
        let len=Math.ceil(Math.abs(Math.log2(this.high-this.low)))
        // console.log("len:", len)
        console.log(this.output.includes(".")?this.output.slice(2):this.output)
        return this.output.includes(".")?this.output.slice(2, len+2):this.output;
    }

    getSymbolRange(symbol) {
        let low = this.low;
        let high = this.high;
        const totalRange = this.high - this.low;

        for (const { char, probability } of this.probabilities) {
            if (char === symbol) {
                high = low + totalRange * probability;
                return { low, high };
            }
            low = low + totalRange * probability;
        }
    }

    updateRange(low, high) {
        this.low = low;
        this.high = high;
    }

    finalize() {
        // console.log("left ", Number(this.low).toString(2))
        console.log("low: ", this.low)
        console.log("high: ", this.high)
        console.log("middle(result): ", (this.low+this.high)/2)
        // console.log(Number((this.low+this.high)/2))
        this.output = Number((this.low+this.high)/2).toString(2);
        console.log("this.output",this.output)
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

const encoder = new ArithmeticEncoder(probabilities);
const compressedData = encoder.encode('deadb');
console.log('Compressed data:', compressedData);

//10111011001 011011010
//10111011001
//10111011010 001110
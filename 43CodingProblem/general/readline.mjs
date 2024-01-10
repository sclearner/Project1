class ReadLine {
    constructor(input) {
        this.lines = input.split('\n')
        this.l = 0
    }

    readLine() {
        if (this.l >= this.lines.length) throw RangeError("Index out of range")
        return this.lines[this.l++] 
    }
}

export default ReadLine
class Sudoku {
    constructor() {
        this.count_solution = 0;
    }
    
    is_row_valid(board, i, j, expected) {
        for (let k = 0; k < 9; k++) {
            if (j == k) continue;
            if (board[i][k] == expected) return false;
        }
        return true;
    }
    
    is_column_valid(board, i, j, expected) {
        for (let k = 0; k < 9; k++) {
            if (i == k) continue;
            if (board[k][j] == expected) return false;
        }
        return true;
    }
    
    is_square_valid(board, i, j, expected) {
        let x = Math.floor(i/3);
        let y = Math.floor(j/3);
        for (let r1 = 0; r1 < 3; r1++) {
            for (let r2 = 0; r2 < 3; r2++) {
                if (x*3 + r1 == i && y*3 + r2 == j) continue;
                if (board[x*3+r1][y*3+r2] == expected) return false;
            }
        }
        return true;
    }
    
    is_valid(board, i, j, expected) {
        return this.is_row_valid(board, i, j, expected) && this.is_column_valid(board, i,j,expected) && this.is_square_valid(board, i, j, expected);
    }
    
    backtrack(board, k) {
        if (k == 81) {
            this.count_solution++;
            return;
        }
        let ks = Math.floor(k/9)
        if (board[ks][k%9]) this.backtrack(board, k+1);
        else {
            for (let i = 1; i <= 9; i++) {
                if (this.is_valid(board, ks, k%9, i)) {
                    board[ks][k%9] = i;
                    this.backtrack(board, k+1);
                    board[ks][k%9] = 0;
                }
            }
        }
    }
    
    sudoku(input) 
    { 
        let a = input.split('\n').map(e => e.split(' ').map(Number))
        this.backtrack(a, 0);
        return this.count_solution;
    }
}

function sudoku(input) {
    let machine = new Sudoku()
    return machine.sudoku(input)
}

console.log('==========================')
input = `0 0 3 4 0 0 0 8 9
0 0 6 7 8 9 0 2 3
0 8 0 0 2 3 4 5 6
0 0 4 0 6 5 0 9 7
0 6 0 0 9 0 0 1 4
0 0 7 2 0 4 3 6 5
0 3 0 6 0 2 0 7 8
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0`

console.log(sudoku(input))

export default sudoku
// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, cols, matrixName) {
  const matrix = [];

  for (let i = 0; i < rows; i += 1) {
    const rowPrompt = `Enter row ${i + 1}: `;
    const row = readlineSync.question(rowPrompt).trim().split(' ').map(Number);

    if (row.length !== cols) {
      console.log(`Error: Row ${i + 1} must contain ${cols} values.`);
      process.exit(1);
    }

    matrix.push(row);
  }

  return matrix;
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];

  for (let j = 0; j < cols; j += 1) {
    const newRow = [];
    for (let i = 0; i < rows; i += 1) {
      newRow.push(matrix[i][j]);
    }
    transposed.push(newRow);
  }

  return transposed;
}

function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const sumMatrix = [];

  for (let i = 0; i < rows; i += 1) {
    const row = [];
    for (let j = 0; j < cols; j += 1) {
      row.push(matrixA[i][j] + matrixB[i][j]);
    }
    sumMatrix.push(row);2
  }

  return sumMatrix;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const product = [];

  for (let i = 0; i < rowsA; i += 1) {
    const row = [];
    for (let j = 0; j < colsB; j += 1) {
      let value = 0;
      for (let k = 0; k < colsA; k += 1) {
        value += matrixA[i][k] * matrixB[k][j];
      }
      row.push(value);
    }
    product.push(row);
  }

  return product;
}

function formatMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const widths = new Array(cols).fill(0);

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      const itemLength = String(matrix[i][j]).length;
      if (itemLength > widths[j]) {
        widths[j] = itemLength;
      }
    }
  }

  const lines = [];
  for (let i = 0; i < rows; i += 1) {
    let line = '';
    for (let j = 0; j < cols; j += 1) {
      const value = String(matrix[i][j]);
      const padding = ' '.repeat(widths[j] - value.length + 1);
      line += value + padding;
    }
    lines.push(line.trimEnd());
  }

  return lines.join('\n');
}

function main() {
  console.log('Part A — Transpose a Matrix');
  const rowsA = readlineSync.questionInt('Enter number of rows: ');
  const colsA = readlineSync.questionInt('Enter number of columns: ');
  const matrixA = readMatrix(rowsA, colsA, 'A');
  const transposed = transposeMatrix(matrixA);

  console.log('\nOriginal Matrix:');
  console.log(formatMatrix(matrixA));
  console.log('\nTransposed Matrix:');
  console.log(formatMatrix(transposed));

  console.log('\nPart B — Add Two Matrices');
  const rowsB = readlineSync.questionInt('Enter number of rows: ');
  const colsB = readlineSync.questionInt('Enter number of columns: ');
  const matrixB1 = readMatrix(rowsB, colsB, 'B1');
  const matrixB2 = readMatrix(rowsB, colsB, 'B2');

  const sumMatrix = addMatrices(matrixB1, matrixB2);
  console.log('\nSum of matrices:');
  console.log(formatMatrix(sumMatrix));

  console.log('\nPart C — Multiply Two Matrices');
  const rowsC1 = readlineSync.questionInt('Enter number of rows for matrix A: ');
  const colsC1 = readlineSync.questionInt('Enter number of columns for matrix A: ');
  const matrixC1 = readMatrix(rowsC1, colsC1, 'C1');

  const rowsC2 = readlineSync.questionInt('Enter number of rows for matrix B: ');
  const colsC2 = readlineSync.questionInt('Enter number of columns for matrix B: ');

  if (rowsC2 !== colsC1) {
    console.log('Error: Number of columns in A must equal number of rows in B.');
    return;
  }

  const matrixC2 = readMatrix(rowsC2, colsC2, 'C2');
  const productMatrix = multiplyMatrices(matrixC1, matrixC2);

  console.log('\nMatrix A:');
  console.log(formatMatrix(matrixC1));
  console.log('\nMatrix B:');
  console.log(formatMatrix(matrixC2));
  console.log('\nA x B =');
  console.log(formatMatrix(productMatrix));
}

main();


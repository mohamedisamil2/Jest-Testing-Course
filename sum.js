function sum(a, b) {
  return a + b;
}

function InputInvalid(input) {
  if (typeof input !== "number") {
    throw new Error("Invalid Input");
  }
}

module.exports = { sum, InputInvalid };

function sum(a, b) {
  return a + b;
}

function InputInvalid(input) {
  if (typeof input !== "number") {
    throw new Error("Invalid Input");
  }
}

// Testing Asynchronous Code
// 1- Callback
function fetchData(callback) {
  setTimeout(() => {
    callback("beanut butter");
  }, 500);
}

// 1- Promise
function fetchPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("peanut butter");
    }, 1000);
  });
}

module.exports = { sum, InputInvalid, fetchData, fetchPromise };

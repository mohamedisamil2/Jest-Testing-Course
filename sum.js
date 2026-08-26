const axios = require("axios");

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

// Mock Function
function testMock(items, callback) {
  for (const item of items) {
    callback(item);
  }
}

// Mocking Module
class Users {
  static all() {
    return axios.get("/users.json").then((res) => res.data);
  }
}

module.exports = {
  sum,
  InputInvalid,
  fetchData,
  fetchPromise,
  testMock,
  Users,
};

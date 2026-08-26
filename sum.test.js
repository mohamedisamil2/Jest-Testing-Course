const {
  sum,
  InputInvalid,
  fetchData,
  fetchPromise,
  testMock,
  Users,
} = require("./sum.js");
const { add, subtract, multiply } = require("./utils.js");
const axios = require("axios");

// common matches

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

// matchers truthiness

test("null", () => {
  const n = null;
  expect(n).toBeFalsy();
});

// zero
test("zero", () => {
  const z = 0;
  expect(z).toBeFalsy();
});

// Numbers Matchers
// most ways of comparing Numbers have matches equivalent

test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.9);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// floating
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3);     This won't work because of rounding error
  expect(value).toBeCloseTo(0.3);
});

// String Matchers
// You can check strings against regular expressions with toMatch:
// يمكنك التحقق من السلاسل النصية باستحدام التعبيرات النمطية عن طريق دالة toMatch
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "nene" in MohamedIsCallednene', () => {
  expect("MohamedIsCallednene").toMatch(/nene/);
});

// Arrays and iterables
// You can check if an array or iterable contains a particular item using toContain:
// يمكنك التحقق مما إذا كانت مصفوفة أو كائن قابل للتكرار يحتوي على عنصر معين باستخدام الدالة toContain:

const shoppingList = ["Iphone", "Samsung", "Ipad", "Laptop"];
test('the shopping list has "Ipad" on it', () => {
  expect(shoppingList).toContain("Ipad");
  expect(new Set(shoppingList)).toContain("Ipad");
});

// Exceptions
test("throws on invalid input", () => {
  expect(() => {
    InputInvalid("hello"); // this is string
  }).toThrow();
});

// Testing Asynchronous Code
// 1- Callback done(function):
test("the data is beanut butter", (done) => {
  function callback(data) {
    try {
      expect(data).toBe("beanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});

// 2- Promises (resolve and reject)
// A- Resolves
test("the data is peanut butter", () => {
  return expect(fetchPromise()).resolves.toBe("peanut butter");
});

// A- Rejects
// test('the fetch fails with an error', () => {
//   return expect(fetchPromise()).rejects.toThrow('error')
// })

// 3- Async/Await
// Ex1:
test("the data is peanut butter", async () => {
  const data = await fetchPromise();
  expect(data).toBe("peanut butter");
});

// Ex2:
// test("the fetch fails with an error", async () => {
//   expect.assertions(1);
//   try {
//     await fetchPromise();
//   } catch (error) {
//     expect(error).toMatch("error");
//   }
// });

// Mock function
// 1- Ex:
test("mock function was called", () => {
  const mockFn = jest.fn();

  mockFn();
  expect(mockFn).toHaveBeenCalled();
});

//
const mockCallback = jest.fn((x) => 42 + x);
test("test mock function", () => {
  testMock([0, 1, 2], mockCallback);

  // the mock function was called three times
  expect(mockCallback.mock.calls).toHaveLength(3);

  // the first arg of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // the first arg of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // the first arg of the third call to the function was 2
  expect(mockCallback.mock.calls[2][0]).toBe(2);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

// toHaveBeenCalledTimes(): Knowing the number of times the call was made
// 2- Ex:
test("mock function was called twice", () => {
  const mockFn = jest.fn();
  mockFn();
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(2);
});

// 3- Ex:
test("mock function was called four Times", () => {
  const mockFn = jest.fn();
  mockFn();
  mockFn();
  mockFn();
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(4);
});

// .mock property
// 1- mock.calls
const mockFn = jest.fn();
mockFn("mohamed", 27);
mockFn("malaz", 25);
console.log(mockFn.mock.calls);

// 2- mock.results
const mockF = jest.fn();

mockFn.mockReturnValue(10);

mockFn();

console.log(mockF.mock.results);

// 3- mock.instance
const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances);
// > [ <a> ]

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts);
// > [ <b> ]

//
const myMock = jest.fn();
const c = new myMock();
const d = new myMock();

console.log(myMock.mock.instances);

// mock.contexts
const mockUser = jest.fn();

const user = {
  name: "Mohamed",
};
const bond = mockUser.bind(user);
bond();
console.log(mockUser.mock.contexts[0]);

// Mock Return Values : دالة mock ممكن ايضا ان تتحكم في القيمة التي ترجعها
const MockVal = jest.fn();
console.log(MockVal());
// > undefined

MockVal.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true);

console.log(MockVal(), MockVal(), MockVal(), MockVal());
// > 10, 'x', true, true

// 2- Ex:
const getUser = jest.fn();
getUser.mockReturnValueOnce({ id: 1 }).mockReturnValueOnce({ id: 2 });
console.log(getUser(), getUser()); // {id:1} {id:2}

// Mock Modules
// ex
jest.mock("axios");
test("should fetch users", () => {
  const users = [{ name: "Mohamed Ismail" }];
  const res = { data: users };
  axios.get.mockResolvedValue(res);
  return Users.all().then((data) => expect(data).toEqual(users));
});

// Mocking Partials

jest.mock("./utils.js", () => {
  const actual = jest.requireActual("./utils.js");

  return {
    ...actual,
    multiply: jest.fn(),
  };
});
test("partial mocking", () => {
  console.log("add:", add(2, 3));

  console.log("multiply before:", multiply(2, 3));

  multiply.mockReturnValue(100);

  console.log("multiply after:", multiply(2, 3));

  console.log("calls:", multiply.mock.calls);
});

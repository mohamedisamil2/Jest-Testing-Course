const sum = require("./sum.js");

// common matches

test(`add 1+2 to equal 3`, () => {
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

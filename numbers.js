const max = 3;
const numbers = {
  keyin1: 1,
  keyin2: 2,
  keyin3: 3,
  keyin4: 4,
  keyin5: 5,
  keyin6: 6,
  keyin7: 7,
};

const result = Object.values(numbers).filter(value => value >= max);
console.log(result);



const en = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const ru = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"];

const combined = en.reduce((acc, key, index) => {
  acc[key] = ru[index];
  return acc;
}, {});

console.log(combined);
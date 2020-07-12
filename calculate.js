function calculate(arg1 = 0) {
  let arg = arg1;

  return {
    sum(arg2 = 0) {
      arg += arg2;
      return this;
    },

    sub(arg2 = 0) {
      arg -= arg2;
      return this;
    },

    mult(arg2) {
      arg *= arg2;
      return this;
    },
    div(arg2 = 1) {
      arg /= arg2;
      return this;
    },

    printResult() {
      console.log(arg);
      return this;
    },

    resetToInitial() {
      arg = arg1;
      return this;
    },
  };
}

module.exports = calculate;

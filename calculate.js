function calculate() {
  let _arg = 0;

  return {
    set setValue(arg1) {
      _arg = arg1;
    },

    printResult() {
      console.log(_arg);
      return this;
    },

    sum(arg2 = 0) {
      _arg += arg2;
      return this;
    },

    sub(arg2 = 0) {
      _arg -= arg2;
      return this;
    },

    mult(arg2 = 1) {
      _arg *= arg2;
      return this;
    },

    div(arg2 = 1) {
      _arg /= arg2;
      return this;
    },
  };
}

module.exports = calculate();

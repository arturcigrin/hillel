function createCalculator(staticArg) {
  return {
    sum(dinamicArg) {
      return (staticArg += dinamicArg);
    },
    mult(dinamicArg) {
      return (staticArg *= dinamicArg);
    },
    sub(dinamicArg) {
      return (staticArg -= dinamicArg);
    },
    div(dinamicArg) {
      return (staticArg /= dinamicArg);
    },
    set(newStaticValue) {
      staticArg = newStaticValue;
    },
  };
}
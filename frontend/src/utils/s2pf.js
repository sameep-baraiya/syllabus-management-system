const s2pf = (str = '0') => {
  const num = parseFloat(str);
  if (isNaN(num)) {
    return 0;
  } else {
    if (num < 0.0) {
      return 0.0;
    } else {
      return num;
    }
  }
};

export default s2pf;

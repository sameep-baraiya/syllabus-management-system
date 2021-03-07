const s2pn = (str = '0') => {
  const num = parseInt(str);
  if (isNaN(num)) {
    return 0;
  } else {
    if (num < 0) {
      return 0;
    } else {
      return num;
    }
  }
};

export default s2pn;

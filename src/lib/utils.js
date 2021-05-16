const transformUserInput = (item) =>
  item
    .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
    .toLowerCase()
    .trim();

export default transformUserInput;

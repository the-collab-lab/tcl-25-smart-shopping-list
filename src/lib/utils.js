const transformUserInput = (item) =>
  item
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s\s+/g, ' ')
    .toLowerCase();

export default transformUserInput;

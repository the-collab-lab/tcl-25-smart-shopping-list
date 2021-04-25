const transformUserInput = (item) =>
  item.replace(/[\W_]/g, '').toLowerCase().trim();

export default transformUserInput;

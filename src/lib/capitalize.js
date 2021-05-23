const capitalizeFirstLetter = (item) =>
  item.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

export default capitalizeFirstLetter;

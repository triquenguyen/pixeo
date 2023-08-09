const snakeToTitle = (snake) =>
  snake
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default snakeToTitle;

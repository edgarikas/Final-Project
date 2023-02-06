const logger =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    console.log('post', action);
  };

export default logger;

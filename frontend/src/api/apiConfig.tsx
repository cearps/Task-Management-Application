export const API_URL =
  `http://${window.location.hostname}:${process.env.REACT_APP_API_PORT}` ||
  `http://${window.location.hostname}:3001`;

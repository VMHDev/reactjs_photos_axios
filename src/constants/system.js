export const PASSWORD_RESET_TOKEN_LENGTH = parseInt(
  process.env.REACT_APP_PASSWORD_RESET_TOKEN_LENGTH
);
export const PASSWORD_TOKEN_EXPIRE = parseFloat(
  process.env.REACT_APP_PASSWORD_TOKEN_EXPIRE
);

export const WEB_DOMAIN = process.env.REACT_APP_WEB_DOMAIN;
export const WEB_PORT = process.env.REACT_APP_PORT;
export const WEB_URL = WEB_DOMAIN + WEB_PORT;

export const COOKIES_EXPIRE = process.env.REACT_APP_COOKIES_EXPIRE;

export const API_URL =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PRD;
export const LOCAL_STORAGE_TOKEN_NAME =
  process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME;

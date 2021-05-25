// Độ dài của token reset password
export const PASSWORD_RESET_TOKEN_LENGTH = parseInt(
  process.env.REACT_APP_PASSWORD_RESET_TOKEN_LENGTH
);
export const PASSWORD_TOKEN_EXPIRE = parseFloat(
  process.env.REACT_APP_PASSWORD_TOKEN_EXPIRE
);

export const WEB_DOMAIN = process.env.REACT_APP_WEB_DOMAIN;
export const WEB_PORT = process.env.REACT_APP_PORT;
export const WEB_URL = WEB_DOMAIN + WEB_PORT;

// Chuỗi ký tự bí mật dùng trong mã hóa
export const PASS_PHRASE = process.env.REACT_APP_PASS_PHRASE
  ? process.env.REACT_APP_PASS_PHRASE
  : 'photos_vmhdev_hack';
// Thời gian hết hạn của cookie (Đơn vị là phút)
export const COOKIES_EXPIRE = process.env.REACT_APP_COOKIES_EXPIRE
  ? process.env.REACT_APP_COOKIES_EXPIRE
  : '3600';
// Tên của cookie token
export const COOKIES_TOKEN_NAME = process.env.REACT_APP_COOKIES_TOKEN_NAME
  ? process.env.REACT_APP_COOKIES_TOKEN_NAME
  : 'photos_token';
// Tên của cookie user login
export const COOKIES_USERLOGIN_NAME = process.env
  .REACT_APP_COOKIES_USERLOGIN_NAME
  ? process.env.REACT_APP_COOKIES_USERLOGIN_NAME
  : 'photos_user_login';

// Đường dẫn gọi API
export const API_URL =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_URL_DEV
      ? process.env.REACT_APP_API_URL_DEV
      : 'http://localhost:3003/api'
    : process.env.REACT_APP_API_URL_PRD
    ? process.env.REACT_APP_API_URL_PRD
    : 'https://somedeployurl';

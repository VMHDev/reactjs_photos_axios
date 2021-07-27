# Clone source from:
- https://github.com/VMHDev/reactjs_photos

# Using:
- UI Library:
  > https://reactstrap.github.io/
  - Form: formik
    > https://formik.org/
  - Dropdown List: react-select
    > https://www.npmjs.com/package/react-select
  - Validate data: Yup
    > https://yarnpkg.com/package/yup
  - Bootstrap
    > https://www.npmjs.com/package/bootstrap
  - Styles
    - SCSS
      > https://yarnpkg.com/package/node-sass
    - BEM Styles
      > http://getbem.com/introduction/
  - Tables
    - react-bootstrap-table-next
      > https://react-bootstrap-table.github.io/react-bootstrap-table2/
    - react-bootstrap-table2-paginator
      > https://www.npmjs.com/package/react-bootstrap-table2-paginator
  - Icons
    - react-icons
      > https://react-icons.github.io/react-icons/
  - Loadings
    - react-loading-overlay
      > https://www.npmjs.com/package/react-loading-overlay
    - react-spinners
      > https://www.npmjs.com/package/react-spinners
- Handle datetime:
  - moment
    > https://momentjs.com/
  - moment-timezone
    > https://momentjs.com/timezone/
- Hash:
  - js-base64
    > https://www.npmjs.com/package/js-base64
  - crypto-js
    > https://www.npmjs.com/package/crypto-js
- Generate ID: uuid (Don't use)
  > https://www.npmjs.com/package/uuid
- Random token: crypto-random-string
  > https://www.npmjs.com/package/crypto-random-string
- Cookie: 
  - universal-cookie (Don't use)
    > https://www.npmjs.com/package/universal-cookie
  - js-cookie
    > https://www.npmjs.com/package/js-cookie
- Handle direct: react-router-dom
  > https://reactrouter.com/
- Handle state: react-redux
  > https://react-redux.js.org/

# Example .env
  ```
  PORT=3004
  REACT_APP_PORT=3004  
  REACT_APP_WEB_DOMAIN=http://localhost/
  REACT_APP_TIME_ZONE=Etc/GMT+7

  REACT_APP_PASSWORD_RESET_TOKEN_EXPIRE=2
  REACT_APP_PASSWORD_RESET_TOKEN_LENGTH=12

  REACT_APP_PASS_PHRASE=photos_vmhdev_hack
  REACT_APP_COOKIES_EXPIRE=1
  REACT_APP_COOKIES_TOKEN_NAME=photos_token
  REACT_APP_COOKIES_USERLOGIN_NAME=photos_user_login

  REACT_APP_API_URL_DEV=http://localhost:3003/api
  REACT_APP_API_URL_PRD=https://somedeployurl
  ```
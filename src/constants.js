// Api
// Records
export const GET_ALL_RECORDS = 'GET_ALL_RECORDS'
export const RECORDS_FAIL = 'RECORDS_FAIL'
export const CREATE_RECORD = 'CREATE_RECORD'
export const DELETE_RECORD = 'DELETE_RECORD'
export const UPDATE_RECORD = 'UPDATE_RECORD'

// Authorization
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

// Users
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const CREATE_USER = 'CREATE_USER'
export const USER_FAIL = 'USER_FAIL'

export const DATE_FORMAT = 'DD.MM.YYYY'

// Backend Server
const DEV_BACK_END_SERVER = 'https://fuel-manager-f1d75.firebaseio.com'
const PROD_BACK_END_SERVER = 'https://fuel-manager-f1d75.firebaseio.com'

export const BACK_END_SERVER = process.env.NODE_ENV !== 'production' ? DEV_BACK_END_SERVER : PROD_BACK_END_SERVER

// Subpath for prod
export const SUB_PATH = process.env.NODE_ENV !== 'production' ? '' : '/fuel-manager'

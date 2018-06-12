// Api
// Records
export const GET_ALL_RECORDS = 'GET_ALL_RECORDS';
export const RECORDS_FAIL = 'RECORDS_FAIL';
export const CREATE_RECORD = 'CREATE_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';
export const UPDATE_RECORD = 'UPDATE_RECORD';

// Authorization
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const CREATE_USER = "CREATE_USER";
export const USER_FAIL = "USER_FAIL";




export const GET_ALL_DIRECTORIES = 'GET_ALL_DIRECTORIES';
export const CREATE_DIRECTORY = 'CREATE_DIRECTORY';
export const UPDATE_DIRECTORY = 'UPDATE_DIRECTORY';
export const DELETE_DIRECTORY = 'DELETE_DIRECTORY';
export const GET_ALL_NOTICES = 'GET_ALL_NOTICES';
export const CREATE_NOTICE = 'CREATE_NOTICE';
export const UPDATE_NOTICE = 'UPDATE_NOTICE';
export const DELETE_NOTICE = 'DELETE_NOTICE';
export const DIRECTORIES_FAIL = 'DIRECTORIES_FAIL';
export const NOTICES_FAIL = 'NOTICES_FAIL';

// Directories
export const SELECTED_DIRECTORY = 'SELECTED_DIRECTORY';
export const EDIT_DIR_MODE = 'EDIT_DIR_MODE';

// Notices
export const DND_NOTICES = 'DND_NOTICES';
export const TAGS_IN_NOTICE = 'TAGS_IN_NOTICE';
export const CLEAR_TAGS_IN_NOTICE = 'CLEAR_TAGS_IN_NOTICE';
export const ADVANCED_SEARCH = 'ADVANCED_SEARCH';
export const SIMPLE_SEARCH = 'SIMPLE_SEARCH';

// Backend Server
const DEV_BACK_END_SERVER = 'https://fuel-manager-f1d75.firebaseio.com';
const PROD_BACK_END_SERVER = 'https://fuel-manager-f1d75.firebaseio.com';

export const BACK_END_SERVER = process.env.NODE_ENV !== 'production' ? DEV_BACK_END_SERVER : PROD_BACK_END_SERVER;

// Subpath for prod
export const SUB_PATH = process.env.NODE_ENV !== 'production' ? '' : '/fuel-manager';



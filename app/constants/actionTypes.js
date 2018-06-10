/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2015, Tidepool Project
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

/**
 * Syncronous action types
 */
export const ADD_TARGET_DEVICE = 'ADD_TARGET_DEVICE';
export const CLICK_GO_TO_BLIP = 'CLICK_GO_TO_BLIP';
export const CLINIC_ADD_MRN = 'CLINIC_ADD_MRN';
export const CLINIC_ADD_EMAIL = 'CLINIC_ADD_EMAIL';
export const CLINIC_DEVICE_STORED = 'CLINIC_DEVICE_STORED';
export const CLINIC_ADD_INVALID_DATE = 'CLINIC_ADD_INVALID_DATE';
export const HIDE_UNAVAILABLE_DEVICES = 'HIDE_UNAVAILABLE_DEVICES';
export const REMOVE_TARGET_DEVICE = 'REMOVE_TARGET_DEVICE';
export const RESET_UPLOAD = 'RESET_UPLOAD';
export const RETRIEVING_USERS_TARGETS = 'RETRIEVING_USERS_TARGETS';
export const SET_BLIP_VIEW_DATA_URL = 'SET_BLIP_VIEW_DATA_URL';
export const SET_DEFAULT_TARGET_ID = 'SET_DEFAULT_TARGET_ID';
export const SET_FORGOT_PASSWORD_URL = 'SET_FORGOT_PASSWORD_URL';
export const SET_NEW_PATIENT_URL = 'SET_NEW_PATIENT_URL';
export const SET_OS = 'SET_OS';
export const SET_PAGE = 'SET_PAGE';
export const SET_SIGNUP_URL = 'SET_SIGNUP_URL';
export const SET_TARGET_TIMEZONE = 'SET_TARGET_TIMEZONE';
export const SET_UPLOADS = 'SET_UPLOADS';
export const SET_UPLOAD_TARGET_USER = 'SET_UPLOAD_TARGET_USER';
export const SET_USER_INFO_FROM_TOKEN = 'SET_USER_INFO_FROM_TOKEN';
export const SET_USERS_TARGETS = 'SET_USERS_TARGETS';
export const SET_VERSION = 'SET_VERSION';
export const STORING_USERS_TARGETS = 'STORING_USERS_TARGETS';
export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
export const TOGGLE_ERROR_DETAILS = 'TOGGLE_ERROR_DETAILS';
export const DISMISS_UPDATE_PROFILE_ERROR = 'DISMISS_UPDATE_PROFILE_ERROR';
export const DISMISS_CREATE_CUSTODIAL_ACCOUNT_ERROR = 'DISMISS_CREATE_CUSTODIAL_ACCOUNT_ERROR';
export const SET_ALL_USERS = 'SET_ALL_USERS';
export const TIMEZONE_BLUR = 'TIMEZONE_BLUR';

/*
 * Asyncronous action types
 */

export const INIT_APP_REQUEST = 'INIT_APP_REQUEST';
export const INIT_APP_SUCCESS = 'INIT_APP_SUCCESS';
export const INIT_APP_FAILURE = 'INIT_APP_FAILURE';

// user.login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// user.logout
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGIN_FAILURE';

// uploading devices
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const UPLOAD_ABORTED = 'UPLOAD_ABORTED';
export const UPLOAD_CANCELLED = 'UPLOAD_CANCELLED';

export const CARELINK_FETCH_REQUEST = 'CARELINK_FETCH_REQUEST';
export const CARELINK_FETCH_SUCCESS = 'CARELINK_FETCH_SUCCESS';
export const CARELINK_FETCH_FAILURE = 'CARELINK_FETCH_FAILURE';

export const CARELINK_UPLOAD_REQUEST = 'CARELINK_UPLOAD_REQUEST';
export const CARELINK_UPLOAD_SUCCESS = 'CARELINK_UPLOAD_SUCCESS';
export const CARELINK_UPLOAD_FAILURE = 'CARELINK_UPLOAD_FAILURE';

export const MEDTRONIC_REMEMBER_SERIAL_NUMBER = 'MEDTRONIC_REMEMBER_SERIAL_NUMBER';

export const DEVICE_DETECT_REQUEST = 'DEVICE_DETECT_REQUEST';
export const DEVICE_DETECT_SUCCESS = 'DEVICE_DETECT_SUCCESS';
export const DEVICE_DETECT_FAILURE = 'DEVICE_DETECT_FAILURE';

export const READ_FILE_REQUEST = 'READ_FILE_REQUEST';
export const READ_FILE_SUCCESS = 'READ_FILE_SUCCESS';
export const READ_FILE_FAILURE = 'READ_FILE_FAILURE';
export const READ_FILE_ABORTED = 'READ_FILE_ABORTED';
export const CHOOSING_FILE = 'CHOOSING_FILE';

export const SET_AUTO_UPLOAD_DEVICE = 'SET_AUTO_UPLOAD_DEVICE';

// version check
export const VERSION_CHECK_REQUEST = 'VERSION_CHECK_REQUEST';
export const VERSION_CHECK_SUCCESS = 'VERSION_CHECK_SUCCESS';
export const VERSION_CHECK_FAILURE = 'VERSION_CHECK_FAILURE';

// update profile
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

// create custodial account
export const CREATE_CUSTODIAL_ACCOUNT_REQUEST = 'CREATE_CUSTODIAL_ACCOUNT_REQUEST';
export const CREATE_CUSTODIAL_ACCOUNT_SUCCESS = 'CREATE_CUSTODIAL_ACCOUNT_SUCCESS';
export const CREATE_CUSTODIAL_ACCOUNT_FAILURE = 'CREATE_CUSTODIAL_ACCOUNT_FAILURE';

// autoUpdater
export const CHECKING_FOR_UPDATES = 'CHECKING_FOR_UPDATES';
export const UPDATE_AVAILABLE = 'UPDATE_AVAILABLE';
export const UPDATE_NOT_AVAILABLE = 'UPDATE_NOT_AVAILABLE';
export const AUTOUPDATE_ERROR = 'AUTOUPDATE_ERROR';
export const UPDATE_DOWNLOADED = 'UPDATE_DOWNLOADED';
export const DISMISS_UPDATE_AVAILABLE = 'DISMISS_UPDATE_AVAILABLE';
export const DISMISS_UPDATE_NOT_AVAILABLE = 'DISMISS_UPDATE_NOT_AVAILABLE';
export const AUTO_UPDATE_CHECKING_FOR_UPDATES = 'AUTO_UPDATE_CHECKING_FOR_UPDATES';
export const MANUAL_UPDATE_CHECKING_FOR_UPDATES = 'MANUAL_UPDATE_CHECKING_FOR_UPDATES';
export const QUIT_AND_INSTALL = 'QUIT_AND_INSTALL';

// driver update
export const CHECKING_FOR_DRIVER_UPDATE = 'CHECKING_FOR_DRIVER_UPDATE';
export const DRIVER_UPDATE_AVAILABLE = 'DRIVER_UPDATE_AVAILABLE';
export const DRIVER_UPDATE_NOT_AVAILABLE = 'DRIVER_UPDATE_NOT_AVAILABLE';
export const DISMISS_DRIVER_UPDATE_AVAILABLE = 'DISMISS_DRIVER_UPDATE_AVAILABLE';
export const DRIVER_INSTALL = 'DRIVER_INSTALL';
export const DRIVER_INSTALL_SHELL_OPTS = 'DRIVER_INSTALL_SHELL_OPTS';

export const DEVICE_TIME_INCORRECT = 'DEVICE_TIME_INCORRECT';
export const DISMISS_DEVICE_TIME_PROMPT = 'DISMISS_DEVICE_TIME_PROMPT';

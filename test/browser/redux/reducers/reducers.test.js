/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2014, Tidepool Project
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

/*eslint-env mocha*/

import _ from 'lodash';

import * as actionTypes from '../../../../lib/redux/constants/actionTypes';
import { pages } from '../../../../lib/redux/constants/otherConstants';
import * as reducers from '../../../../lib/redux/reducers/reducers';

import devices from '../../../../lib/redux/reducers/devices';

let pwd = require('../../fixtures/pwd.json');
let nonpwd = require('../../fixtures/nonpwd.json');

describe('reducers', () => {
  describe('devices', () => {
    function filterDevicesFn(os) {
      return function(device) {
        if (device.enabled[os] === true) {
          return true;
        }
        return false;
      };
    }
    it('should return the initial state', () => {
      expect(reducers.devices(undefined, {})).to.deep.equal(devices);
    });

    it('should handle HIDE_UNAVAILABLE_DEVICES [mac]', () => {
      let actualResult = reducers.devices(undefined, {
        type: actionTypes.HIDE_UNAVAILABLE_DEVICES,
        payload: {os: 'mac'}
      });
      let expectedResult = _.pick(devices, filterDevicesFn('mac'));
      expect(actualResult).to.deep.equal(expectedResult);
      // because we do currently have devices unavailable on Mac
      expect(Object.keys(actualResult).length).to.be.lessThan(Object.keys(devices).length);
      // test to be sure not *mutating* state object but rather returning new!
      let prevState = devices;
      let resultState = reducers.devices(prevState, {
        type: actionTypes.HIDE_UNAVAILABLE_DEVICES,
        payload: {os: 'mac'}
      });
      expect(prevState === resultState).to.be.false;
    });

    it('should handle HIDE_UNAVAILABLE_DEVICES [win]', () => {
      let actualResult = reducers.devices(undefined, {
        type: actionTypes.HIDE_UNAVAILABLE_DEVICES,
        payload: {os: 'win'}
      });
      let expectedResult = _.pick(devices, filterDevicesFn('win'));
      expect(actualResult).to.deep.equal(expectedResult);
      // because nothing currently is unavailable on Windows
      expect(Object.keys(actualResult).length).to.equal(Object.keys(devices).length);
      // test to be sure not *mutating* state object but rather returning new!
      let prevState = devices;
      let resultState = reducers.devices(prevState, {
        type: actionTypes.HIDE_UNAVAILABLE_DEVICES,
        payload: {os: 'win'}
      });
      expect(prevState === resultState).to.be.false;
    });
  });

  describe('dropdown', () => {
    it('should return the initial state', () => {
      expect(reducers.dropdown(undefined, {})).to.be.false;
    });

    it('should handle TOGGLE_DROPDOWN', () => {
      expect(reducers.dropdown(undefined, {
        type: actionTypes.TOGGLE_DROPDOWN,
        payload: {isVisible: true}
      })).to.be.true;
      expect(reducers.dropdown(undefined, {
        type: actionTypes.TOGGLE_DROPDOWN,
        payload: {isVisible: false}
      })).to.be.false;
    });
  });

  describe('os', () => {
    it('should return the initial state', () => {
      expect(reducers.os(undefined, {})).to.be.null;
    });

    it('should handle SET_OS', () => {
      expect(reducers.os(undefined, {
        type: actionTypes.SET_OS,
        payload: {os: 'test'}
      })).to.equal('test');
    });
  });

  describe('page', () => {
    it('should return the initial state', () => {
      expect(reducers.page(undefined, {})).to.equal(pages.LOADING);
    });

    it('should handle SET_PAGE', () => {
      expect(reducers.page(undefined, {
        type: actionTypes.SET_PAGE,
        payload: {page: 'main'}
      })).to.equal('main');
    });
  });

  describe('url', () => {
    it('should return the initial state', () => {
      expect(reducers.url(undefined, {})).to.deep.equal({});
    });

    it('should handle SET_FORGOT_PASSWORD_URL', () => {
      const FORGOT_PWD = 'http://www.acme.com/forgot-password';
      const actionPayload = {url: FORGOT_PWD};
      expect(reducers.url(undefined, {
        type: actionTypes.SET_FORGOT_PASSWORD_URL,
        payload: actionPayload
      }).forgotPassword).to.equal(FORGOT_PWD);
      // test to be sure not *mutating* state object but rather returning new!
      let initialState = {};
      let finalState = reducers.url(initialState, {
        type: actionTypes.SET_FORGOT_PASSWORD_URL,
        payload: actionPayload
      });
      expect(initialState === finalState).to.be.false;
    });

    it('should handle SET_SIGNUP_URL', () => {
      const SIGN_UP = 'http://www.acme.com/sign-up';
      const actionPayload = {url: SIGN_UP};
      expect(reducers.url(undefined, {
        type: actionTypes.SET_SIGNUP_URL,
        payload: actionPayload
      }).signUp).to.equal(SIGN_UP);
      // test to be sure not *mutating* state object but rather returning new!
      let initialState = {};
      let finalState = reducers.url(initialState, {
        type: actionTypes.SET_SIGNUP_URL,
        payload: actionPayload
      });
      expect(initialState === finalState).to.be.false;
    });
  });

  describe('users', () => {
    it('should return the initial state', () => {
      expect(reducers.users(undefined, {})).to.deep.equal({isFetching: false});
    });

    describe('adding a target device for a user', () => {
      it('should handle ADD_TARGET_DEVICE without error when no users', () => {
        const USER = 'a1b2c3', DEVICE = 'a_pump';
        const actionPayload = {
          userId: USER, deviceKey: DEVICE
        };
        let resultState = {
          isFetching: false,
          [USER]: {targets: {devices: [DEVICE]}}
        };
        expect(reducers.users(undefined, {
          type: actionTypes.ADD_TARGET_DEVICE,
          payload: actionPayload
        })).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: false};
        let finalState = reducers.users(initialState, {
          type: actionTypes.ADD_TARGET_DEVICE,
          payload: actionPayload
        });
        expect(initialState === finalState).to.be.false;
      });

      it('should handle ADD_TARGET_DEVICE without duplicates when user already had device set', () => {
        const USER = 'a1b2c3', DEVICE = 'a_pump';
        const actionPayload = {
          userId: USER, deviceKey: DEVICE
        };
        let initialState = {
          isFetching: false,
          [USER]: {
            fullName: 'Jane Doe',
            targets: {devices: [DEVICE, 'a_cgm']}
          }
        };
        let resultState = _.cloneDeep(initialState);
        let finalState = reducers.users(initialState, {
          type: actionTypes.ADD_TARGET_DEVICE,
          payload: actionPayload
        });
        expect(finalState).to.deep.equal(resultState);
        // tests to be sure not *mutating* state object but rather returning new!
        expect(initialState === finalState).to.be.false;
        expect(initialState[USER] === finalState[USER]).to.be.false;
        expect(initialState[USER].targets === finalState[USER].targets).to.be.false;
        expect(initialState[USER].targets.devices === finalState[USER].targets.devices).to.be.false;
      });

      it('should handle ADD_TARGET_DEVICE without wiping device(s) already set', () => {
        const USER = 'a1b2c3', DEVICE = 'another_pump';
        const actionPayload = {
          userId: USER, deviceKey: DEVICE
        };
        let initialState = {
          isFetching: false,
          [USER]: {
            fullName: 'Jane Doe',
            targets: {devices: ['a_pump', 'a_cgm']}
          }
        };
        let resultState = {
          isFetching: false,
          [USER]: {
            fullName: 'Jane Doe',
            targets: {devices: ['a_pump', 'a_cgm', DEVICE]}
          }
        };
        let finalState = reducers.users(initialState, {
          type: actionTypes.ADD_TARGET_DEVICE,
          payload: actionPayload
        });
        expect(finalState).to.deep.equal(resultState);
        // tests to be sure not *mutating* state object but rather returning new!
        expect(initialState === finalState).to.be.false;
        expect(initialState[USER] === finalState[USER]).to.be.false;
        expect(initialState[USER].targets === finalState[USER].targets).to.be.false;
        expect(initialState[USER].targets.devices === finalState[USER].targets.devices).to.be.false;
      });
    });

    describe('logging in', () => {
      it('should handle LOGIN_FAILURE', () => {
        const errMsg = 'Error logging in!';
        expect(reducers.users(undefined, {
          type: actionTypes.LOGIN_FAILURE,
          error: true,
          payload: new Error(errMsg)
        })).to.deep.equal({
          isFetching: false,
          errorMessage: errMsg
        });
        // test to be sure not *mutating* state object but rather returning new!
        let prevState = {isFetching: true};
        let resultState = reducers.users(prevState, {
          type: actionTypes.LOGIN_FAILURE,
          error: true,
          payload: new Error(errMsg)
        });
        expect(prevState === resultState).to.be.false;
      });

      it('should handle LOGIN_REQUEST', () => {
        expect(reducers.users(undefined, {
          type: actionTypes.LOGIN_REQUEST
        })).to.deep.equal({isFetching: true});
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: false};
        let finalState = reducers.users(initialState, {
          type: actionTypes.LOGIN_REQUEST
        });
        expect(initialState === finalState).to.be.false;
      });

      it('should handle LOGIN_SUCCESS [no error, logged-in PWD]', () => {
        let resultState = {
          isFetching: false,
          loggedInUser: pwd.user.userid,
          [pwd.user.userid]: _.assign({}, _.omit(pwd.user, 'userid'), pwd.profile),
          targetsForUpload: [pwd.user.userid],
          uploadTargetUser: pwd.user.userid
        };
        pwd.memberships.slice(1).map(function(mship) {
          resultState[mship.userid] = _.assign({}, mship.profile);
          resultState.targetsForUpload.push(mship.userid);
        });
        const actionPayload = {
          user: pwd.user,
          profile: pwd.profile,
          memberships: pwd.memberships
        };
        expect(reducers.users(undefined, {
          type: actionTypes.LOGIN_SUCCESS,
          payload: actionPayload
        })).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: true};
        let finalState = reducers.users(initialState, {
          type: actionTypes.LOGIN_SUCCESS,
          payload: actionPayload
        });
        expect(initialState === finalState).to.be.false;
      });

      it('should handle LOGIN_SUCCESS [no error, logged-in non-PWD, can upload to one]', () => {
        let resultState = {
          isFetching: false,
          loggedInUser: nonpwd.user.userid,
          [nonpwd.user.userid]: _.assign({}, _.omit(nonpwd.user, 'userid'), nonpwd.profile),
          targetsForUpload: [],
          uploadTargetUser: nonpwd.memberships[1].userid
        };
        nonpwd.memberships.slice(1,2).map(function(mship) {
          resultState[mship.userid] = _.assign({}, mship.profile);
          resultState.targetsForUpload.push(mship.userid);
        });
        const actionPayload = {
          user: nonpwd.user,
          profile: nonpwd.profile,
          memberships: nonpwd.memberships.slice(0,2)
        };
        expect(reducers.users(undefined, {
          type: actionTypes.LOGIN_SUCCESS,
          payload: actionPayload
        })).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: true};
        let finalState = reducers.users(initialState, {
          type: actionTypes.LOGIN_SUCCESS,
          payload: actionPayload
        });
        expect(initialState === finalState).to.be.false;
      });

      it('should handle LOGIN_SUCCESS [no error, logged-in non-PWD, can upload to > 1]', () => {
        let resultState = {
          isFetching: false,
          loggedInUser: nonpwd.user.userid,
          [nonpwd.user.userid]: _.assign({}, _.omit(nonpwd.user, 'userid'), nonpwd.profile),
          targetsForUpload: [],
          uploadTargetUser: null
        };
        nonpwd.memberships.slice(1).map(function(mship) {
          resultState[mship.userid] = _.assign({}, mship.profile);
          resultState.targetsForUpload.push(mship.userid);
        });
        const actionPayload = {
          user: nonpwd.user,
          profile: nonpwd.profile,
          memberships: nonpwd.memberships
        };
        expect(reducers.users(undefined, {
          type: actionTypes.LOGIN_SUCCESS,
          payload: actionPayload
        })).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: true};
        let finalState = reducers.users(initialState, {
          type: actionTypes.LOGIN_SUCCESS,
          payload: actionPayload
        });
        expect(initialState === finalState).to.be.false;
      });
    });

    describe('removing a target device for a user', () => {
      it('should handle REMOVE_TARGET_DEVICE without error when no users', () => {
        const USER = 'a1b2c3', DEVICE = 'a_pump';
        const actionPayload = {
          userId: USER, deviceKey: DEVICE
        };
        let resultState = {
          isFetching: false
        };
        expect(reducers.users(undefined, {
          type: actionTypes.REMOVE_TARGET_DEVICE,
          payload: actionPayload
        })).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: false};
        let finalState = reducers.users(initialState, {
          type: actionTypes.REMOVE_TARGET_DEVICE,
          payload: actionPayload
        });
        expect(initialState === finalState).to.be.false;
      });

      it('should handle REMOVE_TARGET_DEVICE without wiping other device(s) already set', () => {
        const USER = 'a1b2c3', DEVICE = 'another_pump';
        const actionPayload = {
          userId: USER, deviceKey: DEVICE
        };
        let initialState = {
          isFetching: false,
          [USER]: {
            fullName: 'Jane Doe',
            targets: {devices: [DEVICE, 'a_pump', 'a_cgm']}
          }
        };
        let resultState = {
          isFetching: false,
          [USER]: {
            fullName: 'Jane Doe',
            targets: {devices: ['a_pump', 'a_cgm']}
          }
        };
        let finalState = reducers.users(initialState, {
          type: actionTypes.REMOVE_TARGET_DEVICE,
          payload: actionPayload
        });
        expect(finalState).to.deep.equal(resultState);
        // tests to be sure not *mutating* state object but rather returning new!
        expect(initialState === finalState).to.be.false;
        expect(initialState[USER] === finalState[USER]).to.be.false;
        expect(initialState[USER].targets === finalState[USER].targets).to.be.false;
        expect(initialState[USER].targets.devices === finalState[USER].targets.devices).to.be.false;
      });
    });

    describe('setting the target timezone for a user', () => {
      it('should handle SET_TARGET_TIMEZONE without error when no users', () => {
        const USER = 'a1b2c3', TIMEZONE = 'US/Mountain';
        const actionPayload = {
          userId: USER, timezoneName: TIMEZONE
        };
        let resultState = {
          isFetching: false,
          [USER]: {targets: {timezone: TIMEZONE}}
        };
        expect(reducers.users(undefined, {
          type: actionTypes.SET_TARGET_TIMEZONE,
          payload: actionPayload
        })).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: false};
        let finalState = reducers.users(initialState, {
          type: actionTypes.SET_TARGET_TIMEZONE,
          payload: actionPayload
        });
        expect(initialState === finalState).to.be.false;
      });

      it('should handle SET_TARGET_TIMEZONE by replacing user\'s timezone when already set', () => {
        const USER = 'a1b2c3', TIMEZONE = 'Pacific/Honolulu';
        const actionPayload = {
          userId: USER, timezoneName: TIMEZONE
        };
        let initialState = {
          isFetching: false,
          [USER]: {
            fullName: 'Jane Doe',
            targets: {devices: ['a_pump', 'a_cgm'], timezone: 'US/Mountain'}
          }
        };
        let resultState = {
          isFetching: false,
          [USER]: {
            fullName: 'Jane Doe',
            targets: {devices: ['a_pump', 'a_cgm'], timezone: 'Pacific/Honolulu'}
          }
        };
        let finalState = reducers.users(initialState, {
          type: actionTypes.SET_TARGET_TIMEZONE,
          payload: actionPayload
        });
        expect(finalState).to.deep.equal(resultState);
        // we're not mutating this, so we expect it to stay the same
        expect(initialState[USER].targets.devices === finalState[USER].targets.devices)
          .to.be.true;
        // tests to be sure not *mutating* state object but rather returning new!
        expect(initialState === finalState).to.be.false;
        expect(initialState[USER] === finalState[USER]).to.be.false;
        expect(initialState[USER].targets === finalState[USER].targets).to.be.false;
        expect(initialState[USER].targets.timezone === finalState[USER].targets.timezone).to.be.false;
      });
    });

    describe('"logging in" via stored token, getting & setting user info', () => {
      it('should handle SET_USER_INFO_FROM_TOKEN [no error, logged-in PWD]', () => {
        let resultState = {
          isFetching: false,
          loggedInUser: pwd.user.userid,
          [pwd.user.userid]: _.assign({}, _.omit(pwd.user, 'userid'), pwd.profile),
          targetsForUpload: [pwd.user.userid],
          uploadTargetUser: pwd.user.userid
        };
        pwd.memberships.slice(1).map(function(mship) {
          resultState[mship.userid] = _.assign({}, mship.profile);
          resultState.targetsForUpload.push(mship.userid);
        });
        const actionPayload = {
          user: pwd.user,
          profile: pwd.profile,
          memberships: pwd.memberships
        };
        expect(reducers.users(undefined, {
          type: actionTypes.SET_USER_INFO_FROM_TOKEN,
          payload: actionPayload
        })).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: true};
        let finalState = reducers.users(initialState, {
          type: actionTypes.SET_USER_INFO_FROM_TOKEN,
          payload: actionPayload
        });
        expect(initialState === finalState).to.be.false;
      });

      it('should handle SET_USER_INFO_FROM_TOKEN [no error, logged-in non-PWD, can upload to one]', () => {
        let resultState = {
          isFetching: false,
          loggedInUser: nonpwd.user.userid,
          [nonpwd.user.userid]: _.assign({}, _.omit(nonpwd.user, 'userid'), nonpwd.profile),
          targetsForUpload: [],
          uploadTargetUser: nonpwd.memberships[1].userid
        };
        nonpwd.memberships.slice(1,2).map(function(mship) {
          resultState[mship.userid] = _.assign({}, mship.profile);
          resultState.targetsForUpload.push(mship.userid);
        });
        const actionPayload = {
          user: nonpwd.user,
          profile: nonpwd.profile,
          memberships: nonpwd.memberships.slice(0,2)
        };
        expect(reducers.users(undefined, {
          type: actionTypes.SET_USER_INFO_FROM_TOKEN,
          payload: actionPayload
        })).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: true};
        let finalState = reducers.users(initialState, {
          type: actionTypes.SET_USER_INFO_FROM_TOKEN,
          payload: actionPayload
        });
        expect(initialState === finalState).to.be.false;
      });

      it('should handle SET_USER_INFO_FROM_TOKEN [no error, logged-in non-PWD, can upload to > 1]', () => {
        let resultState = {
          isFetching: false,
          loggedInUser: nonpwd.user.userid,
          [nonpwd.user.userid]: _.assign({}, _.omit(nonpwd.user, 'userid'), nonpwd.profile),
          targetsForUpload: [],
          uploadTargetUser: null
        };
        nonpwd.memberships.slice(1).map(function(mship) {
          resultState[mship.userid] = _.assign({}, mship.profile);
          resultState.targetsForUpload.push(mship.userid);
        });
        const actionPayload = {
          user: nonpwd.user,
          profile: nonpwd.profile,
          memberships: nonpwd.memberships
        };
        expect(reducers.users(undefined, {
          type: actionTypes.SET_USER_INFO_FROM_TOKEN,
          payload: actionPayload
        })).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        let initialState = {isFetching: true};
        let finalState = reducers.users(initialState, {
          type: actionTypes.SET_USER_INFO_FROM_TOKEN,
          payload: actionPayload
        });
        expect(initialState === finalState).to.be.false;
      });      
    });

    describe('setting users\' targets after retrieving them from local storage', () => {
      it('should handle SET_USERS_TARGETS without changing state if stored userids not accessible to logged-in user (anymore)', () => {
        const TARGETS = {
          abc123: [{key: 'a_pump', timezone: 'US/Central'}]
        };
        const actionPayload = {
          targets: TARGETS
        };
        const initialState = {
          isFetching: false,
          loggedInUser: 'a1b2c3'
        };
        let resultState = _.cloneDeep(initialState);
        let finalState = reducers.users(initialState, {
          type: actionTypes.SET_USERS_TARGETS,
          payload: actionPayload
        });
        expect(finalState).to.deep.equal(resultState);
        // test to be sure not *mutating* state object but rather returning new!
        expect(initialState === finalState).to.be.false;
      });

      it('should handle SET_USERS_TARGETS by adding targets for users accessible to logged-in user', () => {
        const TARGETS = {
          a1b2c3: [{key: 'a_pump', timezone: 'US/Central'}],
          d4e5f6: [
            {key: 'a_pump', timezone: 'US/Central'},
            {key: 'a_cgm', timezone: 'US/Mountain'}
          ]
        };
        const actionPayload = {
          targets: TARGETS
        };
        const initialState = {
          isFetching: false,
          loggedInUser: 'a1b2c3',
          a1b2c3: {
            fullName: 'Jane Doe'
          },
          d4e5f6: {
            fullName: 'Michael Jackson'
          }
        };
        let resultState = {
          isFetching: false,
          loggedInUser: 'a1b2c3',
          a1b2c3: {
            fullName: 'Jane Doe',
            targets: {devices: ['a_pump'], timezone: 'US/Central'}
          },
          d4e5f6: {
            fullName: 'Michael Jackson',
            targets: {devices: ['a_pump', 'a_cgm'], timezone: null}
          }
        };
        let finalState = reducers.users(initialState, {
          type: actionTypes.SET_USERS_TARGETS,
          payload: actionPayload
        });
        expect(finalState).to.deep.equal(resultState);
        // tests to be sure not *mutating* state object but rather returning new!
        expect(initialState === finalState).to.be.false;
        expect(initialState.a1b2c3 === finalState.a1b2c3).to.be.false;
        expect(initialState.d4e5f6 === finalState.d4e5f6).to.be.false;
      });
    });
  });

  describe('version', () => {
    it('should return the initial state', () => {
      expect(reducers.version(undefined, {})).to.be.null;
    });

    it('should handle SET_VERSION', () => {
      expect(reducers.version(undefined, {
        type: actionTypes.SET_VERSION,
        payload: {version: '0.100.0'}
      })).to.deep.equal('0.100.0');
    });
  });
});
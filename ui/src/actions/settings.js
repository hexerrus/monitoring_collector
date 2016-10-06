import { getLdapSetting, setLdapSetting, testLdapSetting, getDefaultSettings } from '../api/settings';

export function getLdapSettingAction() {
  return {
    type: 'PROMISE',
    actions: ['GET_LDAP_SETTING_LOADING', 'GET_LDAP_SETTING_LOADED', 'GET_LDAP_SETTING_FAILURE'],
    promise: getLdapSetting(),
  };
}

export function setLdapSettingAction(ldap) {
  return {
    type: 'PROMISE',
    actions: ['SET_LDAP_SETTING_LOADING', 'SET_LDAP_SETTING_LOADED', 'SET_LDAP_SETTING_FAILURE'],
    promise: setLdapSetting(ldap),
  };
}

export function testLdapSettingAction(test) {
  return {
    type: 'PROMISE',
    actions: ['TEST_LDAP_SETTING_LOADING', 'TEST_LDAP_SETTING_LOADED', 'TEST_LDAP_SETTING_FAILURE'],
    promise: testLdapSetting(test),
  };
}

export function getDefaultSettingsAction() {
  return {
    type: 'PROMISE',
    actions: ['GET_DEFAULT_SETTING_LOADING', 'GET_DEFAULT_SETTING_LOADED', 'GET_DEFAULT_SETTING_FAILURE'],
    promise: getDefaultSettings(),
  };
}

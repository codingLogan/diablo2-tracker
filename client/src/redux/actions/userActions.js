import {
  REGISTER_USER,
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants/userConstants'

export function loginAction(email, password) {
  return {
    type: USER_LOGIN,
    payload: {
      email,
      password,
    },
  }
}

export function logoutAction() {
  return {
    type: USER_LOGOUT,
  }
}

export function registerAction(name, email, password) {
  return {
    type: REGISTER_USER,
    payload: {
      name,
      email,
      password,
    },
  }
}

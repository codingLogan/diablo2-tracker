import { USER_LOGIN, USER_LOGOUT } from '../constants/userConstants'

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

import { USER_LOGIN } from '../constants/userConstants'

export function loginAction(email, password) {
  return {
    type: USER_LOGIN,
    payload: {
      email,
      password,
    },
  }
}

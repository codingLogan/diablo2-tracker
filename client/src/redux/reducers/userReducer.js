import { ofType } from 'redux-observable'
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from '../constants/userConstants'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'

export function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('userLogin', JSON.stringify(action.payload))
      return { loading: false, user: action.payload }
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      localStorage.removeItem('userLogin')
      return {}
    default:
      return state
  }
}

export function userLoginEpic(action$) {
  return action$.pipe(
    ofType(USER_LOGIN),
    mergeMap((action) =>
      ajax
        .post('/users/login', action.payload, {
          'Content-Type': 'application/json',
        })
        .pipe(
          map((result) => ({
            type: USER_LOGIN_SUCCESS,
            payload: result.response,
          })),
          catchError((error) =>
            of({
              type: USER_LOGIN_FAILURE,
              payload: error.xhr.response,
              error: true,
            })
          )
        )
    )
  )
}

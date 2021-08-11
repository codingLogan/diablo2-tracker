import { ofType } from 'redux-observable'
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from '../constants/userConstants'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'

export function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload }
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

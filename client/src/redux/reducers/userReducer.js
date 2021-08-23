import { ofType } from 'redux-observable'
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
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
        .post('/api/users/login', action.payload, {
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

export function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { loading: true }
    case REGISTER_USER_SUCCESS:
      return { loading: false }
    case REGISTER_USER_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export function userRegisterEpic(action$) {
  return action$.pipe(
    ofType(REGISTER_USER),
    mergeMap((action) =>
      ajax
        .post('/api/users', action.payload, {
          'Content-Type': 'application/json',
        })
        .pipe(
          mergeMap((result) =>
            of(
              {
                type: REGISTER_USER_SUCCESS,
                payload: result.response,
              },
              {
                type: USER_LOGIN_SUCCESS,
                payload: result.response,
              }
            )
          ),
          catchError((error) =>
            of({
              type: REGISTER_USER_FAILURE,
              payload: error.xhr.response,
              error: true,
            })
          )
        )
    )
  )
}

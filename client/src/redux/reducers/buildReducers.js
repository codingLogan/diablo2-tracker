import { ofType } from 'redux-observable'
import {
  FETCH_BUILDS,
  FETCH_BUILDS_SUCCESS,
  FETCH_BUILDS_FAILURE,
  FETCH_BUILD_DETAILS,
  FETCH_BUILD_DETAILS_SUCCESS,
  FETCH_BUILD_DETAILS_FAILURE,
  POST_BUILD,
  POST_BUILD_SUCCESS,
  POST_BUILD_FAILURE,
} from '../constants/buildConstants'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'

export function fetchBuildsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_BUILDS:
      return { loading: true }
    case FETCH_BUILDS_SUCCESS:
      return { loading: false, builds: action.payload }
    case FETCH_BUILDS_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export function fetchBuildsEpic(action$) {
  return action$.pipe(
    ofType(FETCH_BUILDS),
    mergeMap((action) =>
      ajax.getJSON('/builds').pipe(
        map((result) => ({
          type: FETCH_BUILDS_SUCCESS,
          payload: result,
        })),
        catchError((error) =>
          of({
            type: FETCH_BUILDS_FAILURE,
            payload: error.xhr.response,
            error: true,
          })
        )
      )
    )
  )
}

export function fetchBuildDetailsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_BUILD_DETAILS:
      return { loading: true }
    case FETCH_BUILD_DETAILS_SUCCESS:
      return { loading: false, build: action.payload }
    case FETCH_BUILD_DETAILS_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export function fetchBuildDetailsEpic(action$) {
  return action$.pipe(
    ofType(FETCH_BUILD_DETAILS),
    mergeMap((action) =>
      ajax.getJSON(`/builds/${action.buildId}`).pipe(
        map((result) => ({
          type: FETCH_BUILD_DETAILS_SUCCESS,
          payload: result,
        })),
        catchError((error) =>
          of({
            type: FETCH_BUILD_DETAILS_FAILURE,
            payload: error.xhr.response,
            error: true,
          })
        )
      )
    )
  )
}

export function postBuildReducer(state = {}, action) {
  switch (action.type) {
    case POST_BUILD:
      return { loading: true }
    case POST_BUILD_SUCCESS:
      return { loading: false, build: action.payload }
    case POST_BUILD_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export function postBuildEpic(action$, state$) {
  return action$.pipe(
    ofType(POST_BUILD),
    mergeMap((action) =>
      ajax
        .post(`/builds`, action.payload, {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${action.token}`,
        })
        .pipe(
          map((result) => ({
            type: POST_BUILD_SUCCESS,
            payload: result,
          })),
          catchError((error) =>
            of({
              type: POST_BUILD_FAILURE,
              payload: error.xhr.response,
              error: true,
            })
          )
        )
    )
  )
}

import { ofType } from 'redux-observable'
import {
  FETCH_BUILDS,
  FETCH_BUILDS_SUCCESS,
  FETCH_BUILDS_FAILURE,
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

import {
  FETCH_CLASSES,
  FETCH_CLASSES_FAILURE,
  FETCH_CLASSES_SUCCESS,
} from '../constants/classesConstants'
import { ofType } from 'redux-observable'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'

export function fetchClassesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_CLASSES:
      return { loading: true }
    case FETCH_CLASSES_SUCCESS:
      return { loading: false, classes: action.payload }
    case FETCH_CLASSES_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export function fetchClassesEpic(action$) {
  return action$.pipe(
    ofType(FETCH_CLASSES),
    mergeMap((action) =>
      ajax.get('/api/diablo/classes').pipe(
        map((result) => ({
          type: FETCH_CLASSES_SUCCESS,
          payload: result.response,
        })),
        catchError((error) =>
          of({
            type: FETCH_CLASSES_FAILURE,
            payload: error.xhr.response,
            error: true,
          })
        )
      )
    )
  )
}

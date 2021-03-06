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
  POST_BUILD_CLEAR,
  NEW_BUILD_LEVEL,
  NEW_BUILD_LEVEL_SUCCESS,
  NEW_BUILD_LEVEL_FAILURE,
  NEW_BUILD_LEVEL_CLEAR,
  EDIT_BUILD_LEVEL,
  EDIT_BUILD_LEVEL_SUCCESS,
  EDIT_BUILD_LEVEL_FAILURE,
  EDIT_BUILD_LEVEL_CLEAR,
  EDIT_BUILD,
  EDIT_BUILD_SUCCESS,
  EDIT_BUILD_FAILURE,
  EDIT_BUILD_CLEAR,
  STORE_CURRENT_LEVEL,
  DELETE_BUILD,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  DELETE_CLEAR,
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
      ajax.getJSON('/api/builds').pipe(
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
      ajax.getJSON(`/api/builds/${action.buildId}`).pipe(
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
    case POST_BUILD_CLEAR:
      return {}
    default:
      return state
  }
}

export function postBuildEpic(action$, state$) {
  return action$.pipe(
    ofType(POST_BUILD),
    mergeMap((action) =>
      ajax
        .post(`/api/builds`, action.payload, {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${action.token}`,
        })
        .pipe(
          map((result) => ({
            type: POST_BUILD_SUCCESS,
            payload: result.response,
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

export function editBuildReducer(state = {}, action) {
  switch (action.type) {
    case EDIT_BUILD:
      return { loading: true }
    case EDIT_BUILD_SUCCESS:
      return { loading: false, build: action.payload }
    case EDIT_BUILD_FAILURE:
      return { loading: false, error: action.payload }
    case EDIT_BUILD_CLEAR:
      return {}
    default:
      return state
  }
}

export function editBuildEpic(action$, state$) {
  return action$.pipe(
    ofType(EDIT_BUILD),
    mergeMap((action) =>
      ajax
        .put(`/api/builds/${action.buildId}`, action.payload, {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${action.token}`,
        })
        .pipe(
          map((result) => ({
            type: POST_BUILD_SUCCESS,
            payload: result.response,
          })),
          catchError((error) =>
            of({
              type: EDIT_BUILD_FAILURE,
              payload: error.xhr.response,
              error: true,
            })
          )
        )
    )
  )
}

export function newBuildLevelReducer(state = {}, action) {
  switch (action.type) {
    case NEW_BUILD_LEVEL:
      return { loading: true }
    case NEW_BUILD_LEVEL_SUCCESS:
      return { loading: false, buildDetail: action.payload }
    case NEW_BUILD_LEVEL_FAILURE:
      return { loading: false, error: action.payload }
    case NEW_BUILD_LEVEL_CLEAR:
      return {}
    default:
      return state
  }
}

export function newBuildLevelEpic(action$, state$) {
  return action$.pipe(
    ofType(NEW_BUILD_LEVEL),
    mergeMap((action) =>
      ajax
        .post(
          `/api/builds/${action.payload.buildId}/level`,
          { improvements: action.payload.improvements },
          {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state$.value.userLogin.user.token}`,
          }
        )
        .pipe(
          map((result) => ({
            type: NEW_BUILD_LEVEL_SUCCESS,
            payload: result.response,
          })),
          catchError((error) =>
            of({
              type: NEW_BUILD_LEVEL_FAILURE,
              payload: error.xhr.response,
              error: true,
            })
          )
        )
    )
  )
}

export function editBuildLevelReducer(state = {}, action) {
  switch (action.type) {
    case EDIT_BUILD_LEVEL:
      return { loading: true }
    case EDIT_BUILD_LEVEL_SUCCESS:
      return { loading: false, buildDetail: action.payload }
    case EDIT_BUILD_LEVEL_FAILURE:
      return { loading: false, error: action.payload }
    case EDIT_BUILD_LEVEL_CLEAR:
      return {}
    default:
      return state
  }
}

export function editBuildLevelEpic(action$, state$) {
  return action$.pipe(
    ofType(EDIT_BUILD_LEVEL),
    mergeMap((action) =>
      ajax
        .put(
          `/api/builds/${action.payload.buildId}/level/${action.payload.levelNumber}`,
          { improvements: action.payload.improvements },
          {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state$.value.userLogin.user.token}`,
          }
        )
        .pipe(
          map((result) => ({
            type: NEW_BUILD_LEVEL_SUCCESS,
            payload: result.response,
          })),
          catchError((error) =>
            of({
              type: EDIT_BUILD_LEVEL_FAILURE,
              payload: error.xhr.response,
              error: true,
            })
          )
        )
    )
  )
}

export function storeBuildLevelReducer(
  state = { buildId: null, currentLevel: null },
  action
) {
  switch (action.type) {
    case STORE_CURRENT_LEVEL:
      return {
        buildId: action.payload.buildId,
        currentLevel: action.payload.currentLevel,
      }
    default:
      return state
  }
}

// To check if a build was deleted...
// buildId is !null
// loading is false
// error is null
export function deleteBuildReducer(
  state = { buildId: null, loading: false, error: null },
  action
) {
  switch (action.type) {
    case DELETE_BUILD:
      return { ...state, buildId: action.payload.buildId, loading: true }
    case DELETE_SUCCESS:
      return { ...state, loading: false }
    case DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case DELETE_CLEAR:
      return { buildId: null, loading: false, error: null }
    default:
      return state
  }
}

export function deleteBuildEpic(action$, state$) {
  return action$.pipe(
    ofType(DELETE_BUILD),
    mergeMap((action) =>
      ajax
        .delete(`/api/builds/${action.payload.buildId}`, {
          Authorization: `Bearer ${state$.value.userLogin.user.token}`,
        })
        .pipe(
          map((result) => ({
            type: DELETE_SUCCESS,
          })),
          catchError((error) =>
            of({
              type: DELETE_FAILURE,
              payload: error.xhr.response,
              error: true,
            })
          )
        )
    )
  )
}

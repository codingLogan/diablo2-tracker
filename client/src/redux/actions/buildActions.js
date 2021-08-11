import {
  FETCH_BUILDS,
  FETCH_BUILD_DETAILS,
  POST_BUILD,
} from '../constants/buildConstants'

export function getBuildsAction() {
  return {
    type: FETCH_BUILDS,
  }
}

export function getBuildDetailsAction(buildId) {
  return {
    type: FETCH_BUILD_DETAILS,
    buildId,
  }
}

export function postBuildAction(build, userToken) {
  return {
    type: POST_BUILD,
    payload: build,
    token: userToken,
  }
}

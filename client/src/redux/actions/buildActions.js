import { FETCH_BUILDS, FETCH_BUILD_DETAILS } from '../constants/buildConstants'

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

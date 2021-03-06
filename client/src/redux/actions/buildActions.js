import {
  DELETE_BUILD,
  EDIT_BUILD,
  EDIT_BUILD_LEVEL,
  FETCH_BUILDS,
  FETCH_BUILD_DETAILS,
  NEW_BUILD_LEVEL,
  POST_BUILD,
  STORE_CURRENT_LEVEL,
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

export function editBuildAction(buildId, build, userToken) {
  return {
    type: EDIT_BUILD,
    payload: build,
    buildId,
    token: userToken,
  }
}

export function newBuildLevelAction(buildId, improvements) {
  return {
    type: NEW_BUILD_LEVEL,
    payload: {
      improvements,
      buildId,
    },
  }
}

export function editBuildLevelAction(buildId, levelNumber, improvements) {
  return {
    type: EDIT_BUILD_LEVEL,
    payload: {
      improvements,
      buildId,
      levelNumber,
    },
  }
}

export function storeBuildLevelAction(buildId, currentLevel) {
  return {
    type: STORE_CURRENT_LEVEL,
    payload: {
      buildId,
      currentLevel,
    },
  }
}

export function deleteBuild(buildId) {
  return {
    type: DELETE_BUILD,
    payload: {
      buildId,
    },
  }
}

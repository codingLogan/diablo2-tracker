import { FETCH_BUILDS } from '../constants/buildConstants'

export function getBuildsAction() {
  return {
    type: FETCH_BUILDS,
  }
}

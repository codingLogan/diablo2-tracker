import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import {
  userLoginEpic,
  userLoginReducer,
  userRegisterEpic,
  userRegisterReducer,
} from './reducers/userReducer'
import {
  editBuildLevelEpic,
  editBuildLevelReducer,
  fetchBuildDetailsEpic,
  fetchBuildDetailsReducer,
  fetchBuildsEpic,
  fetchBuildsReducer,
  newBuildLevelEpic,
  newBuildLevelReducer,
  postBuildEpic,
  postBuildReducer,
  editBuildReducer,
  editBuildEpic,
  storeBuildLevelReducer,
} from './reducers/buildReducers'
import {
  fetchClassesEpic,
  fetchClassesReducer,
} from './reducers/classesReducer'

const rootEpic = combineEpics(
  userLoginEpic,
  fetchBuildsEpic,
  fetchBuildDetailsEpic,
  fetchClassesEpic,
  postBuildEpic,
  newBuildLevelEpic,
  editBuildLevelEpic,
  editBuildEpic,
  userRegisterEpic
)

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  builds: fetchBuildsReducer,
  buildDetails: fetchBuildDetailsReducer,
  classes: fetchClassesReducer,
  postedBuild: postBuildReducer,
  newBuildLevel: newBuildLevelReducer,
  editBuildLevel: editBuildLevelReducer,
  editBuild: editBuildReducer,
  currentLevel: storeBuildLevelReducer,
  registerUser: userRegisterReducer,
})

const localStorageLogin = localStorage.getItem('userLogin')
  ? JSON.parse(localStorage.getItem('userLogin'))
  : {}

const initialState = {
  // any init state you want
  userLogin: { user: localStorageLogin },
}

const epicMiddleWare = createEpicMiddleware()

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(epicMiddleWare))
)

epicMiddleWare.run(rootEpic)

export default store

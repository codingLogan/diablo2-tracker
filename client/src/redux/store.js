import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { userLoginEpic, userLoginReducer } from './reducers/userReducer'
import {
  fetchBuildDetailsEpic,
  fetchBuildDetailsReducer,
  fetchBuildsEpic,
  fetchBuildsReducer,
  newBuildLevelEpic,
  newBuildLevelReducer,
  postBuildEpic,
  postBuildReducer,
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
  newBuildLevelEpic
)

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  builds: fetchBuildsReducer,
  buildDetails: fetchBuildDetailsReducer,
  classes: fetchClassesReducer,
  postedBuild: postBuildReducer,
  newBuildLevel: newBuildLevelReducer,
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

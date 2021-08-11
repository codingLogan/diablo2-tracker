import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { userLoginEpic, userLoginReducer } from './reducers/userReducer'
import {
  fetchBuildDetailsEpic,
  fetchBuildDetailsReducer,
  fetchBuildsEpic,
  fetchBuildsReducer,
  postBuildEpic,
  postBuildReducer,
} from './reducers/buildReducers'
import {
  fetchClassesEpic,
  fetchClassesReducer,
} from './reducers/classesReducer'

// Import any epics here
// import someReducer, { someEpic } from './some'

const rootEpic = combineEpics(
  userLoginEpic,
  fetchBuildsEpic,
  fetchBuildDetailsEpic,
  fetchClassesEpic,
  postBuildEpic
)
// A global error handler example
// const rootEpic = (action$, store$, dependencies) =>
//   combineEpics(...epics)(action$, store$, dependencies).pipe(
//     catchError((error, source) => {
//       console.error(error)
//       return source
//     })
//   )

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  builds: fetchBuildsReducer,
  buildDetails: fetchBuildDetailsReducer,
  classes: fetchClassesReducer,
  postedBuild: postBuildReducer,
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

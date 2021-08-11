import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { userLoginEpic, userLoginReducer } from './reducers/userReducer'

// Import any epics here
// import someReducer, { someEpic } from './some'

const rootEpic = combineEpics(userLoginEpic)
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
})

const initialState = {
  // any init state you want
  userLogin: {},
}

const epicMiddleWare = createEpicMiddleware()

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(epicMiddleWare))
)

epicMiddleWare.run(rootEpic)

export default store
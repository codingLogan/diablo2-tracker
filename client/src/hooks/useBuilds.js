import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuildsAction } from '../redux/actions/buildActions'

const useBuilds = () => {
  const { builds } = useSelector((state) => state.builds)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!builds) {
      dispatch(getBuildsAction())
    }
  }, [dispatch, builds])

  return builds
}

export default useBuilds

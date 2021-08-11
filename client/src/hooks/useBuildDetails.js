import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuildDetailsAction } from '../redux/actions/buildActions'

const useBuildDetails = (buildId) => {
  const [first, setFirst] = useState(true)
  const dispatch = useDispatch()
  const { build, loading, error } = useSelector((state) => state.buildDetails)

  // There are 3 scenarios where this component will reach out for new info
  // 1 when initially loading
  // 2 when a build doesn't exist
  // 3 when buildIds don't match
  useEffect(() => {
    if (first || !build || build._id !== buildId) {
      setFirst(false)
      dispatch(getBuildDetailsAction(buildId))
    }
  }, [dispatch, build, buildId, first])

  return { build, loading, error }
}

export default useBuildDetails

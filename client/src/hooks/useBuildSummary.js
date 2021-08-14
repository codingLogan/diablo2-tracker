import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { storeBuildLevelAction } from '../redux/actions/buildActions'

const useBuildSummary = (buildId) => {
  const dispatch = useDispatch()
  const [buildSummary, setBuildSummary] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!buildSummary && !loading && !error) {
      setLoading(true)
      fetch(`/builds/${buildId}/summary`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Build summary request failed')
          }
          setLoading(false)
          return response.json()
        })
        .then((data) => {
          setBuildSummary(data)
          dispatch(
            storeBuildLevelAction(buildId ?? null, data?.currentLevel ?? null)
          )
          setLoading(false)
        })
        .catch((error) => {
          setError(true)
          setLoading(false)
          console.error(error)
          return error
        })
    }
  }, [
    buildSummary,
    loading,
    buildId,
    setBuildSummary,
    setLoading,
    error,
    setError,
    dispatch,
  ])

  return { buildSummary, loading, error }
}

export default useBuildSummary

import { useState, useEffect } from 'react'

const useBuildSummary = (buildId) => {
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
  ])

  return { buildSummary, loading, error }
}

export default useBuildSummary

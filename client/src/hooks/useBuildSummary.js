import { useState, useEffect } from 'react'

const useBuildSummary = (buildId) => {
  const [buildSummary, setBuildSummary] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!buildSummary && !loading) {
      setLoading(true)
      fetch(`/builds/${buildId}/summary`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setBuildSummary(data)
          setLoading(false)
        })
    }
  }, [buildSummary, loading, buildId, setBuildSummary, setLoading])

  return { buildSummary, loading }
}

export default useBuildSummary

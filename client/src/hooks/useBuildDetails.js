import { useSelector } from 'react-redux'

const useBuildDetails = () => {
  const { build, loading, error } = useSelector((state) => state.buildDetails)
  return { build, loading, error }
}

export default useBuildDetails

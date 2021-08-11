import { useSelector } from 'react-redux'

const useBuilds = () => {
  const { builds } = useSelector((state) => state.builds)
  return builds
}

export default useBuilds

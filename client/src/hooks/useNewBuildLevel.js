import { useSelector } from 'react-redux'

const useNewBuildLevel = () => {
  const { buildDetail, loading, error } = useSelector(
    (state) => state.newBuildLevel
  )
  return { buildDetail, loading, error }
}

export default useNewBuildLevel

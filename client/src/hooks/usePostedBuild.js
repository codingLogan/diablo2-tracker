import { useSelector } from 'react-redux'

const usePostedBuild = () => {
  const { loading, error, build } = useSelector((state) => state.postedBuild)
  return { loading, error, build }
}

export default usePostedBuild

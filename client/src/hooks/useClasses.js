import { useSelector } from 'react-redux'

const useClasses = () => {
  const { classes, loading, error } = useSelector((state) => state.classes)
  return { classes, loading, error }
}

export default useClasses

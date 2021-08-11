import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClassesAction } from '../redux/actions/classesActions'

const useClasses = () => {
  const dispatch = useDispatch()
  const { classes, loading, error } = useSelector((state) => state.classes)

  useEffect(() => {
    if (!classes) {
      dispatch(getClassesAction())
    }
  }, [dispatch, classes])
  return { classes, loading, error }
}

export default useClasses

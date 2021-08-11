import { useSelector } from 'react-redux'

const useLoggedInUser = () => {
  const { user } = useSelector((state) => state.userLogin)
  return user
}

export default useLoggedInUser

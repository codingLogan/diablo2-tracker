export default function checkAuthorization(req, res, dataUserId) {
  const usersMatch = String(req.user._id) == String(dataUserId)
  if (!usersMatch) {
    res.status(401)
    throw new Error('Unauthorized, ownership error')
  }
}

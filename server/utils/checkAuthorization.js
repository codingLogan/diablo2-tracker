export default function checkAuthorization(req, res, dataUserId) {
  if (req.user._id !== dataUserId) {
    res.status(401)
    throw new Error('Unauthorized, ownership error')
  }
}

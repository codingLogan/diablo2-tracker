// Creates a build for the classes specified
/**
 *
 * @param {string} userId
 * @param {Array<{classId, name}>} classes
 * @returns
 */
function getBuilds(userId, classes) {
  return classes.map(({ classId, name }) => ({
    userRef: userId,
    classId,
    name,
    summary: 'Example Summary',
  }))
}

export default getBuilds

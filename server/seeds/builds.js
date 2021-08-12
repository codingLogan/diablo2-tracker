// Creates a build for the classes specified
function getBuilds(userId, classIds) {
  return classIds.map((classId) => ({
    userRef: userId,
    classId,
    name: 'Example Build',
    summary: 'Example Summary',
  }))
}

export default getBuilds

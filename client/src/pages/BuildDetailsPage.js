import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Row, Modal } from 'react-bootstrap'
import ContainerPage from './ContainerPage'
import useBuildDetails from '../hooks/useBuildDetails'
import Attributes from '../components/AttributeIncrease'
import SkillAllocation from '../components/SkillAllocation'
import { LinkContainer } from 'react-router-bootstrap'
import useLoggedInUser from '../hooks/useLoggedInUser'
import { Link } from 'react-router-dom'
import useBuildSummary from '../hooks/useBuildSummary'
import LoadingSpinner from '../components/LoadingSpinner'
import { defaultAttributes } from '../forms/LevelForm'
import HeaderBlock from '../components/HeaderBlock'
import { deleteBuild, getBuildsAction } from '../redux/actions/buildActions'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_CLEAR } from '../redux/constants/buildConstants'

function BuildDetailsPage({ match, history }) {
  const dispatch = useDispatch()
  const deleteBuildState = useSelector((state) => state.deleteBuild)

  const buildId = match.params.buildId
  const { build, loading } = useBuildDetails(buildId)
  const user = useLoggedInUser()

  const deleteBuildHandler = () => {
    dispatch(deleteBuild(buildId))
  }

  const [showDelete, setShowDelete] = useState(false)
  const closeModal = () => setShowDelete(false)
  const openModal = () => setShowDelete(true)

  // If the user deletes the build... refresh and put the user onto the build list page
  useEffect(() => {
    if (
      deleteBuildState.buildId !== null &&
      deleteBuildState.loading === false &&
      deleteBuildState.error === null
    ) {
      dispatch({ type: DELETE_CLEAR })
      dispatch(getBuildsAction())
      history.push('/')
    }
  })

  const {
    buildSummary,
    loading: loadingSummary,
    error: errorSummary,
  } = useBuildSummary(buildId)
  let ownerIsViewing = build?.userRef?._id === user?._id

  return build && !loading ? (
    <>
      <ContainerPage title={build.name} showHomeButton>
        <HeaderBlock
          header={build.classId.name}
          subHeader={`Created by ${build?.userRef?.name ?? 'anonymous'}${
            ownerIsViewing ? ' (you)' : ''
          }`}
        />

        <h4 className='mt-5'>Description</h4>
        <p>{build.summary}</p>

        {ownerIsViewing && (
          <div className='mt-5'>
            <hr />
            <h3>Build-Owner Actions</h3>
            <LinkContainer to={`/builds/${buildId}/edit`}>
              <Button variant='secondary'>Edit Description</Button>
            </LinkContainer>
            <span> OR </span>
            <Button variant='danger' onClick={openModal}>
              DELETE this Build
            </Button>
          </div>
        )}
        <hr />

        <h4 className='mt-5'>Build Summary</h4>

        {errorSummary && !loadingSummary ? (
          <Alert variant='danger'>
            Server failed to load the summary, try again later
          </Alert>
        ) : loadingSummary || !buildSummary ? (
          <LoadingSpinner />
        ) : (
          <Card bg='primary'>
            <Card.Header>
              Character is at Level {buildSummary.currentLevel}
            </Card.Header>
            <Card.Body>
              <div>
                <h5>Skill Allocation</h5>
                {Object.getOwnPropertyNames(buildSummary.skillsTotals).length >
                0 ? (
                  Object.getOwnPropertyNames(buildSummary.skillsTotals).map(
                    (property) => (
                      <div
                        key={`build${property}`}
                      >{`${property}: ${buildSummary.skillsTotals[property]}`}</div>
                    )
                  )
                ) : (
                  <Alert variant='info'>No Skills Allocated</Alert>
                )}

                <Attributes
                  className='my-3'
                  attributes={
                    buildSummary?.attributesTotals ?? defaultAttributes
                  }
                />
              </div>
            </Card.Body>
          </Card>
        )}

        {ownerIsViewing && (
          <LinkContainer className='my-3' to={`/builds/${build._id}/level`}>
            <Button type='button'>Level Up!</Button>
          </LinkContainer>
        )}

        <div className='mt-3'>
          <h3 className='mb-4'>Progression By Level</h3>

          {build.buildDetails.levels.map((level) => (
            <Card key={level.level} bg='dark' className='my-2'>
              <Card.Header>
                <Row className='justify-content-between'>
                  <Col className='text-start'>Level {level.level} </Col>

                  {ownerIsViewing && (
                    <Col className='text-end'>
                      <Link to={`/builds/${build._id}/level/${level.level}`}>
                        Edit
                      </Link>
                    </Col>
                  )}
                </Row>
              </Card.Header>
              <Card.Body>
                <div className='py-2'>
                  {level?.improvements?.skills?.length > 0 ? (
                    <SkillAllocation
                      className='my-3'
                      skills={level.improvements.skills}
                    />
                  ) : (
                    <Alert variant='info'>No Skills Allocated</Alert>
                  )}

                  <Attributes
                    className='my-3'
                    attributes={
                      level?.improvements?.attributes ?? defaultAttributes
                    }
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </ContainerPage>
      {showDelete && (
        <Modal variant='dark' show={showDelete} onHide={closeModal}>
          <Modal.Header>
            <Modal.Title>Delete this build?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              If you really want to delete this entire build, click "Yes,
              Delete".
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>
              Close
            </Button>
            <Button variant='primary' onClick={deleteBuildHandler}>
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  ) : (
    <LoadingSpinner />
  )
}

export default BuildDetailsPage

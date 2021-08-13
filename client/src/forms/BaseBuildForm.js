import React from 'react'
import { Form, Button } from 'react-bootstrap'

function BaseBuildForm({
  onSubmit,
  classes = [],
  name,
  setName,
  summary,
  setSummary,
  characterClass,
  setClass,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId='name'>
        <Form.Label>Build Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter the build name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='summary'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          placeholder='Enter a descriptive summary'
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </Form.Group>

      {classes && (
        <div className='my-3'>
          <select
            style={{ width: '100%' }}
            onChange={(e) => setClass(e.target.value)}
            value={characterClass}
          >
            {classes.map((charClass) => (
              <option key={charClass._id} value={charClass._id}>
                {charClass.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <Button type='submit' className='my-3'>
        Create Build
      </Button>
    </Form>
  )
}

export default BaseBuildForm

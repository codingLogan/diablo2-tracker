import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SkillSelect from '../formHelpers/SkillSelect'

export const defaultAttributes = {
  strength: 0,
  dexterity: 0,
  vitality: 0,
  energy: 0,
}

function LevelForm({
  buildId,
  onSubmit = () => {},
  skills = [], // What skills should be selectable by this charcter
  selectedSkills = [{}],
  setSelectedSkills,
  attributes = defaultAttributes,
  setAttributes,
}) {
  return (
    <Form className='mt-4' onSubmit={onSubmit}>
      <SkillSelect
        onChange={(e) => {
          // Replace the index with the correct index
          const dataIndex = e.target.getAttribute('data-index')
          const newSkills = [...selectedSkills]
          newSkills[dataIndex] = { name: e.target.value }
          setSelectedSkills(newSkills)
        }}
        values={selectedSkills}
        skillTrees={skills}
      />

      <Form.Group className='py-2' controlId='strength'>
        <Form.Label>Strength</Form.Label>
        <Form.Control
          type='number'
          placeholder='Enter strenth points'
          value={attributes.strength}
          onChange={(e) =>
            setAttributes({
              ...attributes,
              strength: Number(e.target.value),
            })
          }
        />
      </Form.Group>

      <Form.Group className='py-2' controlId='dexterity'>
        <Form.Label>Dexterity</Form.Label>
        <Form.Control
          type='number'
          placeholder='Enter dexterity points'
          value={attributes.dexterity}
          onChange={(e) =>
            setAttributes({
              ...attributes,
              dexterity: Number(e.target.value),
            })
          }
        />
      </Form.Group>

      <Form.Group className='py-2' controlId='vitality'>
        <Form.Label>Vitality</Form.Label>
        <Form.Control
          type='number'
          placeholder='Enter vitality points'
          value={attributes.vitality}
          onChange={(e) =>
            setAttributes({
              ...attributes,
              vitality: Number(e.target.value),
            })
          }
        />
      </Form.Group>

      <Form.Group className='py-2' controlId='energy'>
        <Form.Label>Energy</Form.Label>
        <Form.Control
          type='number'
          placeholder='Enter energy points'
          value={attributes.energy}
          onChange={(e) =>
            setAttributes({ ...attributes, energy: Number(e.target.value) })
          }
        />
      </Form.Group>

      <Button className='mt-3 me-1' type='submit'>
        Save Level
      </Button>
      <LinkContainer to={`/builds/${buildId}`}>
        <Button variant='secondary' className='mt-3' type='button'>
          Back to Build
        </Button>
      </LinkContainer>
    </Form>
  )
}

export default LevelForm

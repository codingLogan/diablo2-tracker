import React from 'react'
import OptGroupSelect from './OptGroupSelect'

/**
 * @description This component is useful for displaying selectable options
 * that are grouped by the skill tree name.  It takes an array of arrays
 * as a skillTrees prop
 */
function SkillSelect({
  id = 'skillselect',
  label = 'Select a skill',
  onChange,
  value,
  skillTrees = [],
}) {
  const optGroupOptions = skillTrees.map((tree) => {
    // We need a map of group.name, group.options
    // options is option.value and option.text

    const mappedSkills = tree.skills.map((skill) => ({
      value: skill.name,
      text: skill.name,
    }))

    return {
      name: tree.name,
      options: mappedSkills,
    }
  })
  return (
    <OptGroupSelect
      id={id}
      label={label}
      onChange={onChange}
      value={value}
      optgroupOptions={optGroupOptions}
    />
  )
}

export default SkillSelect

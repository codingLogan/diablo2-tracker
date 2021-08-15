import React from 'react'

function OptGroupSelect({
  id,
  label,
  onChange,
  value,
  optgroupOptions,
  dataIndex,
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        style={{ width: '100%', padding: '0.5em', borderRadius: '4px' }}
        onChange={onChange}
        value={value}
        data-index={dataIndex}
        id={id}
      >
        {optgroupOptions.map((group) => (
          <optgroup key={group.name} label={group.name}>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </>
  )
}

export default OptGroupSelect

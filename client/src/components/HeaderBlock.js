import React from 'react'

function HeaderBlock({ header, subHeader }) {
  return (
    <>
      <h3>{header}</h3>
      <h5>{subHeader}</h5>
    </>
  )
}

export default HeaderBlock

import React from 'react'

const MaterialsImg = ( {width, background} ) => {
  return (
    <div style={{
      minWidth: "20px",
      width: width + "px",
      height: "150px",
      backgroundImage: "url(/img/materials/" + background + ")",
      margin: "1px"
    }}>

    </div>
  )
}

export default MaterialsImg
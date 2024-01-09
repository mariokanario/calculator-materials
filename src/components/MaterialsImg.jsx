import React from 'react'

const MaterialsImg = ( {width, background} ) => {
  const lastWidth = width < 0 ? (width * 1000) : (width * 100)

  return (
    <div style={{
      width: lastWidth + "px",
      minWidth: "10px",
      maxWidth: "250px",
      height: "150px",
      backgroundImage: "url(/img/materials/" + background + ")",
    }}>

    </div>
  )
}

export default MaterialsImg
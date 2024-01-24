import React from 'react'

const MaterialsImg = ( {width, background} ) => {
  const lastWidth = width < 0 ? (width * 1000) : (width * 100)

  return (
    <div style={{
      width: lastWidth + "px",
      minWidth: "10px",
      maxWidth: "250px",
      height: "150px",
      backgroundImage: `url("${window.location.origin}${window.location.pathname}assets/img/materials/${background}")`,
    }}>

    </div>
  )
}

export default MaterialsImg
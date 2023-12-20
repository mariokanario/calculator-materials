import React from 'react'
import MaterialsImg from './MaterialsImg'

const MaterialsCont = ({ info }) => {
  return (
      <div className='materiales col-span-1 md:col-span-2 p-5 flex'>
        {
              info ?
                  info.map(data => (
                      <MaterialsImg
                          width={data.espesor}
                          background={data.imagen}
                      />
                  ))
                  :
                  null
        }
      </div>
  )
}

export default MaterialsCont
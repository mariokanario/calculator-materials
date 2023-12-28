import React from 'react'
import MaterialsImg from './MaterialsImg'
import { useProvider } from './context/Provider'

const MaterialsCont = () => {

  const { allData } = useProvider()

  return (
    <div className='materiales col-span-1 md:col-span-2 p-5 flex'>
      {
        allData ?
          allData.materiales.map( (data, i) => (
            <MaterialsImg
              key={i}
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
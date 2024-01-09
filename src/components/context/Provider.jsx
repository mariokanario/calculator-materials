import { createContext, useContext, useState } from 'react'

export const Context = createContext();

const Provider = ({ children }) => {

  /*   const [materials, setMaterials] = useState({
      "desperdicio": null,
      "tipo": null,
      "subtipo" : null,
      "values" : []
    }); */

  const [userData, setUserData] = useState()
  const [locationData, setLocationData] = useState()

  const [allData, setAllData] = useState({
    tempAmb: "",
    tempInt: "",
    materiales: []
  })

  /* const swapUp = (arr, index1, index2) => {
    let aux = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = aux
    return arr
  } */

  return (
    <Context.Provider value={{
      allData,
      userData,
      locationData,
      setAllData,
      setUserData,
      setLocationData
    }}>
      {children}
    </Context.Provider>
  );
};

export const useProvider = () => {
  return useContext(Context)
}


export default Provider;

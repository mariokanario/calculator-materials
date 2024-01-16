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

  const [totalData, setTotalData] = useState()

  return (
    <Context.Provider value={{
      allData,
      userData,
      locationData,
      totalData,
      setAllData,
      setUserData,
      setLocationData,
      setTotalData
    }}>
      {children}
    </Context.Provider>
  );
};

export const useProvider = () => {
  return useContext(Context)
}


export default Provider;

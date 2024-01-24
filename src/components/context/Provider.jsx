import { createContext, useContext, useState, useEffect } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [locationData, setLocationData] = useState();

  const [allData, setAllData] = useState({
    tempAmb: "",
    tempInt: "",
    materiales: [],
  });

  const [totalData, setTotalData] = useState();

  const [dataColombia, setDataColombia] = useState();
  const [dataMateriales, setDataMateriales] = useState();
  const [dataWhatsapp, setDataWhatsapp] = useState();

  useEffect(() => {
    fetchData("/json/dataColombia.json", setDataColombia);
    fetchData("/json/dataMateriales.json", setDataMateriales);
    fetchData("/json/whatsapp.json", setDataWhatsapp);
  }, []);

  const fetchData = async (url, set) => {
    const response = await fetch(url);
    const data = await response.json();
    set(data);
  };

  return (
    <Context.Provider
      value={{
        allData,
        userData,
        locationData,
        totalData,
        setAllData,
        setUserData,
        setLocationData,
        setTotalData,
        dataColombia,
        dataMateriales,
        dataWhatsapp,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useProvider = () => {
  return useContext(Context);
};

export default Provider;

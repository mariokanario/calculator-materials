import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaChevronRight, FaAngleDown, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import MaterialsImg from "../components/MaterialsImg";
import TableMaterials from "../components/TableMaterials";
import * as yup from "yup";
import { useFormik } from "formik";
import Transition from "../components/Transition";
import MaterialsCont from "../components/MaterialsCont";
import { useProvider } from "../components/context/Provider";

const Materials = () => {
  const navigate = useNavigate();

  const { allData, setAllData, locationData, dataMateriales: dataMat } = useProvider();

  const Schema = yup
    .object({
      tempAmb: yup.string().required("Escriba un valor"),
      tempInt: yup.string().required("Escriba un valor"),
      familia: yup.string().required("Elije una opción"),
      tipologia: yup.string().required("Elije una opción"),
      material: yup.string().required("Elije una opción"),
    })
    .required();

  const formik = useFormik({
    initialValues: {
      tempAmb: locationData?.temperatura,
      tempInt: "",
      familia: "",
      tipologia: "",
      material: "",
      espesor: 0,
    },
    validationSchema: Schema,
    onSubmit: () => {
      if (allData.materiales.length > 0) {
        setAllData({
          ...allData,
          tempAmb,
          tempInt,
        });
        navigate("/result");
      } else {
        alert("Recuerda añadir el material para poder continuar");
      }
    },
  });

  const { familia, tipologia, material, tempAmb, tempInt, espesor } =
    formik.values;

  const familiaData = Object.keys(dataMat);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tipologias, setTipologias] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [espesores, setEspesores] = useState();
  const [conductividad, setConductividad] = useState();
  const [resistenciaTermica, setResistenciaTermica] = useState();
  const [stateResistenData, setStateResistenData] = useState(false);

  const addData = () => {
    if (familia && tipologia && material) {
      if (allData.materiales.length < 6) {
        setAllData({
          materiales: [
            ...allData.materiales,
            {
              familia,
              tipologia,
              material,
              ...dataMat[familia][tipologia][material],
              espesor,
              conductividad,
              resistenciaTermica,
            },
          ],
        });
        setStateResistenData(true);
      } else {
        alert("Solo puede agregar un máximo de 6 materiales");
      }
    } else {
      alert("Debes llenar primero el formulario de Selecciónar material");
    }
  };

  useEffect(() => {
    if (familia) {
      const tmpTipologias = Object.keys(dataMat[familia]);
      setMateriales([]);
      formik.setFieldValue("material", "");
      formik.setFieldValue("tipologias", "");
      setTipologias(tmpTipologias);
    } else {
      setTipologias([]);
    }
  }, [familia]);

  useEffect(() => {
    if (tipologia) {
      const tmpMaterials = Object.keys(dataMat[familia][tipologia]);
      setMateriales(tmpMaterials);
      formik.setFieldValue("material", "");
    } else {
      setMateriales([]);
    }
  }, [tipologia]);

  useEffect(() => {
    if (material) {
      setEspesores(dataMat[familia][tipologia][material].espesor / 1000);
      setConductividad(
        dataMat[familia][tipologia][material].conductividad / 1000
      );
    } else {
      setEspesores(0);
    }
  }, [material]);

  useEffect(() => {
    formik.setFieldValue("espesor", espesores);
    setResistenciaTermica(espesores / conductividad);
  }, [espesores]);

  useEffect(() => {
    const resultResisTerm = allData?.materiales?.length
      ? allData?.materiales
          ?.map(({ resistenciaTermica }) => resistenciaTermica)
          .reduce((acumulador, valor) => acumulador + valor, 0)
      : 0;
    const valueResistTem =
      resultResisTerm <= 0 ? 0 : resultResisTerm.toFixed(5);

    const transTerm = 1 / resultResisTerm;
    const valueTransTer = transTerm == "Infinity" ? 0 : transTerm.toFixed(5);

    setAllData({
      ...allData,
      resTer: valueResistTem,
      transTer: valueTransTer,
    });

    setStateResistenData(false);
  }, [stateResistenData]);

  useEffect(() => {
    setAllData({
      tempAmb: "",
      tempInt: "",
      materiales: [],
    });
  }, []);

  // console.log(allData);

  return (
    <main className="grid grid-cols-1 md:grid-cols-5 min-h-screen">
      <section className="bg-left col-span-1 md:col-span-2 p-4 flex items-center justify-end">
        <article className="title-cont text-left pl-8">
          <h2 className=" text-1xl md:text-4xl font-bold uppercase">Paso 2:</h2>
          <h2 className=" text-1xl md:text-4xl font-normal uppercase">
            Condiciones interiores
          </h2>
          <Breadcrumb />
        </article>
      </section>

      <section className="bg-right col-span-1 md:col-span-3 p-4  flex flex-col justify-center">
        <div className="cont-logo pb-0">
          <img
            className="pb-0 mx-auto"
            src="./img/logo.svg"
            alt=""
            style={{ width: "150px" }}
          />
        </div>
        <Transition>
          <Card className="card-cont p-10 ms-5">
            <h2 className="font-bold text-left mt-5">
              Seleccionar condiciones climáticas
            </h2>

            <form
              onSubmit={(e) => {
                setIsSubmitting(true);
                return formik.handleSubmit(e);
              }}
            >
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">
                <Input
                  size="lg"
                  type="number"
                  min="0"
                  label="Temperatura media ambiente (ºC)"
                  placeholder="0 ºC"
                  id="tempAmb"
                  value={tempAmb}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.errors.tempAmb &&
                    (formik.touched.tempAmb || isSubmitting)
                      ? formik.errors.tempAmb
                      : null
                  }
                  isInvalid={formik.errors.tempAmb && formik.touched.tempAmb}
                />

                <Input
                  size="lg"
                  type="number"
                  min="0"
                  label="Temperatura interior deseada (ºC)"
                  placeholder="0 ºC"
                  id="tempInt"
                  value={tempInt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.errors.tempInt &&
                    (formik.touched.tempInt || isSubmitting)
                      ? formik.errors.tempInt
                      : null
                  }
                  isInvalid={formik.errors.tempInt && formik.touched.tempInt}
                />
              </div>

              <h2 className="font-bold text-left  mt-8">
                Seleccionar material
              </h2>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">
                <Select
                  size="lg"
                  label="Familia"
                  id="familia"
                  value={familia}
                  name="familia"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.errors.familia && isSubmitting
                      ? formik.errors.familia
                      : null
                  }
                  isInvalid={formik.errors.familia}
                >
                  {familiaData.map((fam) => (
                    <SelectItem key={fam} value={fam} textValue={fam}>
                      {fam}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  size="lg"
                  label="Tipología"
                  id="tipologia"
                  value={tipologia}
                  isDisabled={familia ? false : true}
                  name="tipologia"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.errors.tipologia && isSubmitting
                      ? formik.errors.tipologia
                      : null
                  }
                  isInvalid={formik.errors.tipologia}
                >
                  {tipologias?.map((tip) => (
                    <SelectItem key={tip} value={tip} textValue={tip}>
                      {tip}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  size="lg"
                  label="Material"
                  id="material"
                  value={material}
                  isDisabled={tipologia ? false : true}
                  name="material"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.errors.material && isSubmitting
                      ? formik.errors.material
                      : null
                  }
                  isInvalid={formik.errors.material}
                >
                  {materiales?.map((mat) => (
                    <SelectItem key={mat} value={mat} textValue={mat}>
                      {mat}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  size="lg"
                  type="number"
                  min="0,000000001"
                  label="Espesor (m)"
                  placeholder="0"
                  id="espesor"
                  value={espesor}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.errors.espesor && isSubmitting
                      ? formik.errors.espesor
                      : null
                  }
                  isInvalid={formik.errors.espesor}
                />

                <div className="col-span-1 md:col-span-2">
                  <Button
                    size="lg"
                    className="my-1"
                    color="primary"
                    variant="bordered"
                    onPress={addData}
                  >
                    Añadir material
                    <FaAngleDown />
                  </Button>
                </div>

                <TableMaterials view={true} />

                <MaterialsCont />
              </div>

              <div className="flex justify-center gap-5">
                <Button
                  size="lg"
                  className="my-8"
                  color="primary"
                  variant="faded"
                  onPress={() => navigate(-1)}
                >
                  <FaChevronLeft />
                  Anterior
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="my-8"
                  color="primary"
                >
                  Siguiente
                  <FaChevronRight />
                </Button>
              </div>
            </form>
          </Card>
        </Transition>
      </section>
    </main>
  );
};

export default Materials;

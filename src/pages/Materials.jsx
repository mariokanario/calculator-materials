import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FaChevronRight, FaAngleDown, FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import MaterialsImg from '../components/MaterialsImg';
import TableMaterials from '../components/TableMaterials';
import * as yup from "yup";
import { useFormik } from "formik";

import dataMat from '../../json/dataMateriales.json'
import MaterialsCont from '../components/MaterialsCont';

const Materials = () => {

  const [allData, setAllData] = useState([])
  const navigate = useNavigate();

  const Schema = yup
    .object({
      familia: yup
        .string()
        .required("Elije una opción"),
      tipologia: yup
        .string()
        .required("Elije una opción"),
      material: yup
        .string()
        .required("Elije una opción"),
    })
    .required();

  const formik = useFormik({
    initialValues: {
      familia: "",
      tipologia: "",
      material: "",
    },
    validationSchema: Schema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const { familia, tipologia, material } = formik.values;

  const familiaData = Object.keys(dataMat);

  const [tipologias, setTipologias] = useState([]);
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    if (familia) {
        const tmpTipologias = Object.keys(dataMat[familia]);
        setTipologias(tmpTipologias);
        formik.setFieldValue('tipologia', '');
    }
  }, [familia]);

  useEffect(() => {
    if (tipologia) {
        const tmpMaterials = Object.keys(dataMat[familia][tipologia]);
        setMateriales(tmpMaterials);
        formik.setFieldValue('material', '');
    }
  }, [tipologia]);

  const addData = () => {
    if (allData.length < 6) {
      setAllData([
        ...allData,
        {
          familia,
          tipologia,
          material,
          espesor: dataMat[familia][tipologia][material].espesor,
          conductividad: dataMat[familia][tipologia][material].conductividad,
          resistencia: dataMat[familia][tipologia][material].resistencia,
          imagen: dataMat[familia][tipologia][material].imagen
        }
      ])
    } else {
      alert("Solo puede agregar un máximo de 6 materiales")
    }

  }


  return (
    <div className='container container-medium'>
      <h2 className='text-2xl font-bold'>Paso 2: <span className='font-normal'>Condiciones interiores</span></h2>

      <Breadcrumb />

      <form onSubmit={formik.handleSubmit}>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">

          <Input type="number" label="Temperatura media ambiente (ºC)" placeholder="0 ºC" />

          <Input type="number" label="Temperatura interior deseada (ºC)" placeholder="0 ºC" />


        </div>

        <h2 className='title-radio mt-5'>Seleccionar material</h2>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">

          <Select
            label="Familia"
            id="familia"
            value={familia}
            name="familia"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.familia}
            isInvalid={formik.errors.familia && formik.touched.familia}
          >
            {
              familiaData.map((fam) => (
                <SelectItem
                  key={fam}
                  value={fam}
                  textValue={fam}
                >
                  {fam}
                </SelectItem>
              ))
            }

          </Select>

          <Select
            label="Tipología"
            id="tipologia"
            value={tipologia}
            name="tipologia"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.tipologia}
            isInvalid={formik.errors.tipologia && formik.touched.tipologia}
          >
            {
              tipologias?.map((tip) => (
                <SelectItem
                  key={tip}
                  value={tip}
                  textValue={tip}
                >
                  {tip}
                </SelectItem>
              ))
            }
          </Select>

          <Select
            label="Material"
            id="material"
            value={material}
            name="material"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.material}
            isInvalid={formik.errors.material && formik.touched.material}
          >
            {
              materiales?.map((mat) => (
                <SelectItem
                  key={mat}
                  value={mat}
                  textValue={mat}
                >
                  {mat}
                </SelectItem>
              ))
            }
          </Select>

          <Input type="number" label="Espesor (mt)" placeholder="0" />

          <div className='col-span-1 md:col-span-2'>
            <Button size="lg" className='my-1' color="primary" variant="bordered"
              onPress={addData}
              disabled={!(familia && tipologia && material)}
            >
              Añadir material
              <FaAngleDown />
            </Button>
          </div>



          <TableMaterials
            info={allData}
          />

          <MaterialsCont
            info={allData}
          />
        </div>

        <div className='flex justify-center gap-5'>
          <Button size="lg" className='my-8' color="primary" variant="faded" onPress={() => navigate(-1)}>
            <FaChevronLeft />
            Anterior
          </Button>
          <Button type='submit' size="lg" className='my-8' color="primary">
            Siguiente
            <FaChevronRight />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Materials
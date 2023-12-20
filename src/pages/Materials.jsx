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
import { useProvider } from '../components/context/Provider';

const Materials = () => {

  const navigate = useNavigate();

  const { allData, setAllData } = useProvider()

  const Schema = yup
    .object({
      tempAmb: yup
        .string()
        .required("Escriba un valor"),
      tempInt: yup
        .string()
        .required("Escriba un valor"),
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
      tempAmb: "",
      tempInt: "",
      familia: "",
      tipologia: "",
      material: "",
    },
    validationSchema: Schema,
    onSubmit: (data) => {
      setAllData([
        ...allData,
        {
          data,
          material,
          ...dataMat[familia][tipologia][material]
        }
      ])
      navigate("/result")
    },
  });

  const { familia, tipologia, material, tempAmb, tempInt } = formik.values;

  const familiaData = Object.keys(dataMat);
  const [tipologias, setTipologias] = useState([]);
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    if (familia) {
      const tmpTipologias = Object.keys(dataMat[familia]);
      setMateriales([])
      formik.setFieldValue('material', '');
      formik.setFieldValue('tipologias', '');
      setTipologias(tmpTipologias);
    } else {
      setTipologias([])
    }
  }, [familia]);

  useEffect(() => {
    if (tipologia) {
      const tmpMaterials = Object.keys(dataMat[familia][tipologia]);
      setMateriales(tmpMaterials);
      formik.setFieldValue('material', '');
    } else {
      setMateriales([])
    }
  }, [tipologia]);

  const addData = () => {
    if (familia && tipologia && material) {
      if (allData.length < 6) {
        setAllData([
          ...allData,
          {
            tempAmb,
            tempInt,
            familia,
            tipologia,
            material,
            ...dataMat[familia][tipologia][material]
          }
        ])
      } else {
        alert("Solo puede agregar un máximo de 6 materiales")
      }
    } else {
      alert("no esta completo el formulario")
    }
  }

  return (
    <div className='container container-medium'>
      <h2 className='text-2xl font-bold'>Paso 2: <span className='font-normal'>Condiciones interiores</span></h2>

      <Breadcrumb />

      <h2 className='title-radio mt-5'>Seleccionar condiciones climáticas</h2>


      <form onSubmit={formik.handleSubmit}>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">

          <Input
            type="number"
            min="0"
            label="Temperatura media ambiente (ºC)"
            placeholder="0 ºC"
            id="tempAmb"
            value={tempAmb}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.tempAmb}
            isInvalid={formik.errors.tempAmb && formik.touched.tempAmb}
          />

          <Input
            type="number"
            min="0"
            label="Temperatura interior deseada (ºC)"
            placeholder="0 ºC"
            id="tempInt"
            value={tempInt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.tempInt}
            isInvalid={formik.errors.tempInt && formik.touched.tempInt}
          />


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
            >
              Añadir material
              <FaAngleDown />
            </Button>
          </div>

          <TableMaterials />

          <MaterialsCont />

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
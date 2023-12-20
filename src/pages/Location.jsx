import React from 'react'
import { Button,  Select, SelectItem } from "@nextui-org/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import * as yup from "yup";
import { useFormik } from "formik";

import dataCol from '../../json/dataColombia.json'

const Location = () => {

    const navigate = useNavigate();

    const Schema = yup
        .object({
            departamento: yup
                .string()
                .required("Elije una opción"),
            municipio: yup
                .string()
                .required("Elije una opción"),
        })
        .required();

    const formik = useFormik({
        initialValues: {
            departamento: "",
            municipio: ""
        },
        validationSchema: Schema,
        onSubmit: (data) => {
            console.log(data);
            // navigate("/materials")
        },
    });

    const { departamento, municipio } = formik.values;

    const departamentos = Object.keys(dataCol)

    const tempMunicipios = departamento ? dataCol[departamento] : []; 
    const tempSingleMunicipio = tempMunicipios?.find(dep => dep.MUNICIPIO === municipio);

    return (
        <div className='container container-medium'>
            <h2 className='text-2xl font-bold'>Paso 1: <span className='font-normal'>Selecciona la localización geográfica</span></h2>

            <Breadcrumb />

            <form onSubmit={formik.handleSubmit}>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">
                    <div>

                        <Select
                            label="Departamento"
                            id="departamento"
                            value={departamento}
                            name="departamento"
                            placeholder="ejem: Antioquia"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            errorMessage={formik.errors.departamento}
                            isInvalid={formik.errors.departamento && formik.touched.departamento}
                        >
                            {
                                departamentos.map((dep) => (
                                    <SelectItem
                                        key={dep}
                                        value={dep}
                                        textValue={dep}
                                    > 
                                    {dep} 
                                    </SelectItem>
                                ))
                            }
                        </Select>

                        <Select
                            className='mt-3'
                            label="Municipio"
                            id="municipio"
                            value={municipio}
                            name="municipio"
                            placeholder="ejem: Medellín"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            errorMessage={formik.errors.municipio}
                            isInvalid={formik.errors.municipio && formik.touched.municipio}

                        >
                            {
                               tempMunicipios.map(dep=>(
                                    <SelectItem key={dep.MUNICIPIO} value={dep.MUNICIPIO}>
                                        {dep.MUNICIPIO}
                                    </SelectItem>
                                ))
                            }

                           
                        </Select>


                        <div className='text-4x2 text-left  mt-5'>
                            <h2>Altitud departamento:</h2>

                            {
                                departamento && municipio  ?
                                    <h2 className='text-4xl font-bold'>
                                        {tempSingleMunicipio?.ALTITUD}
                                    </h2>
                                    :
                                    <small className='text-slate-200'>Selecciona departamento y municipio</small>
                            }

                        </div>

                        <div className='text-4x2 text-left  mt-5'>
                            <h2>Zona climática:</h2>

                            {
                                departamento && municipio ?
                                    <h2 className='text-4xl font-bold'>
                                        {tempSingleMunicipio?.CLIMA}
                                    </h2>
                                    :
                                    <small className='text-slate-200'>Selecciona departamento y municipio</small>
                            }

                        </div> 



                    </div>
                    <div className='m-8 mt-0'>
                        <img src="./img/mapacolombia.svg" alt="" />
                    </div>



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

export default Location
import React, { useState } from 'react'
import { Button, Card, Select, SelectItem } from "@nextui-org/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import * as yup from "yup";
import { useFormik } from "formik";
import Transition from '../components/Transition';
import dataCol from '../../json/dataColombia.json'
import { useProvider } from '../components/context/Provider';

const Location = () => {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { setLocationData } = useProvider()

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
            setLocationData({
                ...data,
                clima: tempSingleMunicipio?.CLIMA,
                altitud: tempSingleMunicipio?.ALTITUD,
                temperatura: tempSingleMunicipio?.TEMPERATURA
            });
            navigate("/materials")
        },
    });

    const { departamento, municipio } = formik.values;

    const departamentos = Object.keys(dataCol)

    const tempMunicipios = departamento ? dataCol[departamento] : [];
    const tempSingleMunicipio = tempMunicipios?.find(dep => dep.MUNICIPIO === municipio);

    return (
        <main className="grid grid-cols-1 md:grid-cols-5 min-h-screen">

            <section className='bg-left col-span-1 md:col-span-2 p-4 flex items-center justify-end'>

                <section className='bg-left col-span-1 md:col-span-2 p-4 flex items-center justify-end'>
                    <article className='title-cont text-left pl-8'>

                        <div className='mb-8 hidden md:block' style={{ width: "150px" }}>
                            <img src="./img/mapacolombia.svg" alt="" />
                        </div>
                        <h2 className=' text-1xl md:text-4xl font-bold uppercase'>Paso 1:</h2>
                        <h2 className=' text-1xl md:text-4xl font-normal uppercase'>Selecciona la <br /> localización geográfica</h2>
                        <Breadcrumb />
                    </article>
                </section>

            </section>
            <section className="bg-right col-span-1 md:col-span-3 p-4  flex flex-col justify-center">

                <div className="cont-logo pb-0">
                    <img className='pb-0 mx-auto' src="./img/logo.svg" alt="" style={{ width: "150px" }} />
                </div>
                <Transition>
                    <Card className='card-cont p-10 ms-5'>

                        <form onSubmit={(e) => {
                            setIsSubmitting(true)
                            return formik.handleSubmit(e)
                        }}>
                            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">
                                <div className='col-span-1 md:col-span-2'>

                                    <Select
                                        size="lg"
                                        label="Departamento"
                                        id="departamento"
                                        value={departamento}
                                        name="departamento"
                                        placeholder="ejem: Antioquia"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessage={formik.errors.departamento && (isSubmitting) ? formik.errors.departamento : null}
                                        isInvalid={formik.errors.departamento}
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
                                        size="lg"
                                        className='mt-3'
                                        label="Municipio"
                                        id="municipio"
                                        value={municipio}
                                        name="municipio"
                                        placeholder="ejem: Medellín"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessage={formik.errors.municipio && (isSubmitting) ? formik.errors.municipio : null}
                                        isInvalid={formik.errors.municipio }

                                    >
                                        {
                                            tempMunicipios.map(dep => (
                                                <SelectItem key={dep.MUNICIPIO} value={dep.MUNICIPIO}>
                                                    {dep.MUNICIPIO}
                                                </SelectItem>
                                            ))
                                        }


                                    </Select>


                                </div>

                                    <div className='text-4x2 text-left  mt-5'>
                                        <h2>Altitud departamento:</h2>

                                        {
                                            departamento && municipio ?
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

                    </Card>
                </Transition>
            </section>
        </main>
    )
}

export default Location
import React, { useEffect, useState } from 'react'
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import dataCol from '../../json/dataColombia.json'


const Location = () => {

    const navigate = useNavigate();

    const [departamentoSel, setDepartamentoSel] = useState(null)
    const [municipioSel, setMunicipioSel] = useState(null)
    const [dataMun, setDataMun] = useState(null)

    const array = dataCol.map(data => data.DEPARTAMENTO)
    const uniqueSet = new Set(array)
    const departamentos = [...uniqueSet]

    useEffect(() => {
        setDataMun(dataCol.find(e => e.DEPARTAMENTO == departamentoSel && e.MUNICIPIO == municipioSel))
    }, [departamentoSel, municipioSel])

    console.log(dataMun);



    return (
        <div className='container container-medium'>
            <h2 className='text-2xl font-bold'>Paso 1: <span className='font-normal'>Selecciona la localización geográfica</span></h2>

            <Breadcrumb />

            <form>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">
                    <div>

                        <Select
                            label="Departamento"
                            id="departamento"
                            name="departamento"
                            placeholder="ejem: Antioquia"
                            onChange={(e) => setDepartamentoSel(e.target.value)}
                        >
                            {
                                departamentos.map((departamento) => (
                                    <SelectItem 
                                    key={departamento} 
                                    value={departamento}
                                    textValue={departamento}
                                    > {departamento} </SelectItem>
                                ))
                            }
                        </Select>

                        <Select
                            className='mt-3'
                            label="Ciudad"
                            id="ciudad"
                            name="ciudad"
                            placeholder="ejem: Medellín"
                            onChange={(e) => setMunicipioSel(e.target.value)}

                        >
                            {
                                departamentoSel != undefined || departamentoSel != null ?
                                    dataCol
                                        .filter(dataC => dataC.DEPARTAMENTO == departamentoSel)
                                        .map(municipio => (
                                            <SelectItem key={municipio.MUNICIPIO} value={municipio.MUNICIPIO}>
                                                {municipio.MUNICIPIO}
                                            </SelectItem>
                                        )
                                        )
                                    :
                                    null
                            }
                        </Select>

                        <div className='text-4x2 text-left  mt-5'>
                            <h2>Altitud departamento:</h2>

                            {
                                dataMun != undefined && dataMun != null ?
                                    <h2 className='text-4xl font-bold'>
                                        {dataMun.ALTITUD}
                                    </h2>
                                    :
                                    <small className='text-slate-200'>Selecciona departamento y ciudad</small>
                            }

                        </div>

                        <div className='text-4x2 text-left  mt-5'>
                            <h2>Zona climática:</h2>

                            {
                                dataMun != undefined && dataMun != null ?
                                    <h2 className='text-4xl font-bold'>
                                        {dataMun.CLIMA}
                                    </h2>
                                    :
                                    <small className='text-slate-200'>Selecciona departamento y ciudad</small>
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
                    <Button size="lg" className='my-8' color="primary" onPress={() => navigate("/materials")}>
                        Siguiente
                        <FaChevronRight />
                    </Button>
                </div>
            </form>


        </div>
    )
}

export default Location
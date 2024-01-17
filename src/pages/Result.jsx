import React from 'react'
import { Card, Button, CardBody, Tooltip } from "@nextui-org/react";
import {  FaWhatsapp } from "react-icons/fa";
import { RiFileDownloadLine } from "react-icons/ri";
import {  MdOutlineAttachEmail } from "react-icons/md";
import Transition from '../components/Transition';
import { useProvider } from './../components/context/Provider';
import { useNavigate } from 'react-router-dom';
import TableMaterials from '../components/TableMaterials';
import MaterialsCont from '../components/MaterialsCont';

const Result = () => {

    const navigate = useNavigate();

    const { userData, locationData, allData } = useProvider()

    
    // console.log(userData, locationData, allData);

    const createPdf = () => {
        /* setTotalData({
            userData,
            locationData,
            materialsData: {...allData}
        }) */
        localStorage.pdf = JSON.stringify({
            userData,
            locationData,
            materialsData: { ...allData }
        })

        navigate('/PdfView')
    }


    return (
        <main className="grid grid-cols-1 md:grid-cols-4 min-h-screen">

            <section className='bg-left col-span-1 md:col-span-1 p-4 flex items-center justify-end'>

            </section>
            <section className="bg-right col-span-1 md:col-span-3 p-4  flex flex-col justify-center">

                <div className="flex justify-between" style={{ maxWidth: "900px" }}>
                    <div className="cont-logo pb-0">
                        <img className='pb-0 mx-auto' src="./img/logo.svg" alt="" style={{ width: "150px" }} />
                    </div>

                    <Card className="menu-result flex flex-row box-border p-5 justify-around gap-0 sm:gap-5 rounded-none rounded-t-lg mr-5">
                        <Tooltip content="Descargar" color="primary">
                            <Button size="lg" className='text-xl' isIconOnly color="primary"
                                onClick={createPdf}>
                                <RiFileDownloadLine />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Enviar a email" color="primary">
                            <Button size="lg" className="text-xl" isIconOnly color="primary">
                                <MdOutlineAttachEmail />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Contactar" color="primary">
                            <Button size="lg" className="text-xl" isIconOnly color="primary">
                                <a href="https://wa.me/573185480907/?text=Hola%20acabo%20de%20realizar%20una%20cotización%20desde%20la%20web"
                                    target="_blank">
                                    <FaWhatsapp />
                                </a>

                            </Button>
                        </Tooltip>
                    </Card>
                </div>

                <Transition>
                    <Card className='card-result p-10 ms-5'>
                        <div className="container  container-medium relative">
                            <div id='print' className='p-5'>
                                <h2 className="text-2xl font-bold">Cálculo resistencia térmica </h2>

                                <div className="result-info mt-5" style={{ width: "100%" }}>
                                    <Card className='col-span-1 md:col-span-3 '>
                                        <CardBody className='gap-4 p-10 grid grid-cols-2 md:grid-cols-3'>

                                            <div className='col-span-2 md:col-span-1'>
                                                <h4 className='font-semibold'>Cliente: </h4>
                                                <p>{userData.name}</p>
                                            </div>
                                            <div className='col-span-2 md:col-span-1'>
                                                <h4 className='font-semibold'>Documento: </h4>
                                                <p>{userData.typeDocument + " " + userData.document}</p>
                                            </div>
                                            <div className='col-span-2 md:col-span-1'>
                                                <h4 className='font-semibold'>Email: </h4>
                                                <p>{userData.email}</p>
                                            </div>
                                            <div  className='col-span-2 md:col-span-1'>
                                                <h4 className='font-semibold'>Celular: </h4>
                                                <p>{userData.cellphone}</p>
                                            </div>
                                            <div  className='col-span-2 md:col-span-1'>
                                                <h4 className='font-semibold'>Nombre del proyecto: </h4>
                                                <p>{userData.nameProject}</p>
                                            </div>
                                            <div  className='col-span-2 md:col-span-1'>
                                                <h4 className='font-semibold'>Tipo de certificación de sostenibilidad: </h4>
                                                <p>{userData.typeCert}</p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>


                                <h2 className='font-bold text-left  mt-5'>Localización geográfica</h2>
                                <div className="flex gap-1 md:gap-10 text-left flex-col md:flex-row">
                                    <div className='my-5'>
                                        <p className='font-semibold'>Departamento:</p>
                                        <p>{locationData.departamento}</p>
                                    </div>

                                    <div className='my-5'>
                                        <p className='font-semibold'>Municipio:</p>
                                        <p>{locationData.municipio}</p>
                                    </div>

                                    <div className='my-5'>
                                        <p className='font-semibold'>Altitud:</p>
                                        <p>{locationData.altitud}</p>
                                    </div>

                                    <div className='my-5'>
                                        <p className='font-semibold'>Clima:</p>
                                        <p>{locationData.clima}</p>
                                    </div>
                                </div>

                                <h2 className='font-bold text-left  mt-5'>Condiciones climáticas</h2>
                                <div className='flex gap-1 md:gap-10 text-left flex-col md:flex-row'>
                                    <div className='my-5'>
                                        <p className='font-semibold'>Temperatura media ambiente:</p>
                                        <p>{allData.tempAmb} ºC</p>
                                    </div>

                                    <div className='my-5'>
                                        <p className='font-semibold'>Temperatura interior:</p>
                                        <p>{allData.tempInt} ºC</p>
                                    </div>
                                </div>

                                <h2 className='font-bold text-left  my-5'>Materiales</h2>
                                <TableMaterials view={false} />

                                <MaterialsCont />


                                
                            </div>
                            <Button
                                className='my-5 bt-new'
                                size="lg"
                                color="primary"
                                onPress={() => navigate("/")}
                            >
                                Crear nueva calculadora
                            </Button>
                        </div>

                        
                    </Card>
                </Transition >
            </section >
        </main >
    )
}

export default Result
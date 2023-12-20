import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Card, Button, CardBody, Tooltip } from "@nextui-org/react";
import { FaFileDownload } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import Transition from '../components/Transition';
import { useProvider } from './../components/context/Provider';
import { useNavigate } from 'react-router-dom';
import TableMaterials from '../components/TableMaterials';

const Result = () => {

    const navigate = useNavigate();

    const { userData, locationData } = useProvider()


    console.log(userData, locationData);

    return (
        <Transition>
            <div className='container  container-medium relative' style={{ paddingBottom: "8rem" }}>

                <h2 className='text-2xl font-bold'>Resultado </h2>

                <div className="result-info" style={{ width: "100%" }}>
                    <Card className='col-span-1 md:col-span-3 '>
                        <CardBody className='gap-4 p-10 grid grid-cols-2 md:grid-cols-3'>

                            <img className='mb-10 mx-auto col-span-2 md:col-span-3' src="./img/logo.svg" alt="" style={{ width: "180px" }} />


                            <div>
                                <h4 className='font-semibold'>Cliente: </h4>
                                <p>{userData.name}</p>
                            </div>
                            <div>
                                <h4 className='font-semibold'>Documento: </h4>
                                <p>{userData.typeDocument + " " + userData.document}</p>
                            </div>
                            <div>
                                <h4 className='font-semibold'>Email: </h4>
                                <p>{userData.email}</p>
                            </div>
                            <div>
                                <h4 className='font-semibold'>Celular: </h4>
                                <p>{userData.cellphone}</p>
                            </div>
                            <div>
                                <h4 className='font-semibold'>Nombre del proyecto: </h4>
                                <p>{userData.nameProject}</p>
                            </div>
                            <div>
                                <h4 className='font-semibold'>Tipo de certificación de sostenibilidad: </h4>
                                <p>{userData.typeCert}</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <h2 className='font-bold text-2xl mt-8 cot-title'>Cotización</h2>

                <div className='flex justify-between'>
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
                
                <TableMaterials />

                {/* <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Material</TableColumn>
                        <TableColumn>Unidad de medida</TableColumn>
                        <TableColumn>Unidad de venta</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {
                            materials?.values?.map((material, i) => (
                                <TableRow key={i} className='text-left'>
                                    <TableCell>
                                        {material.nombre}
                                    </TableCell>
                                    <TableCell>
                                        {datosJson[material.tipo][material.nombre].medida}
                                    </TableCell>
                                    <TableCell>
                                        {Math.round(datosJson[material.tipo][material.nombre].valor * materials.metrocuadrado)}
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                        {
                            datosJson.complementos != undefined ?
                                <TableRow className='text-left'>
                                    <TableCell>
                                        <h2 className='font-semibold text-base'>Complementos</h2>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                                : null
                        }

                        {
                            datosJson.complementos != undefined ?

                                datosJson.complementos.map((complemento, i) => (
                                    <TableRow key={i} className='text-left'>
                                        <TableCell>
                                            {complemento.material}
                                        </TableCell>
                                        <TableCell>
                                            {complemento.medida}
                                        </TableCell>
                                        <TableCell>
                                            {Math.round(complemento.valor * materials.metrocuadrado)}
                                        </TableCell>
                                    </TableRow>
                                ))

                                : null
                        }

                        {
                            datosJson.metales != undefined ?
                                <TableRow className='text-left'>
                                    <TableCell>
                                        <h2 className='font-semibold text-base'>Metales</h2>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                                : null
                        }



                        {
                            datosJson.metales != undefined ?

                                datosJson.metales.map((metal, i) => (
                                    <TableRow key={i} className='text-left'>
                                        <TableCell>
                                            {metal.material}
                                        </TableCell>
                                        <TableCell>
                                            {metal.medida}
                                        </TableCell>
                                        <TableCell>
                                            {Math.round(metal.valor * materials.metrocuadrado)}
                                        </TableCell>
                                    </TableRow>
                                ))

                                : null

                        }

                    </TableBody>
                </Table>
 */}


                <h3 className='text-lg mt-5 font-bold text-left'>Notas</h3>
                <ul className='list-disc text-left text-sm pl-4'>
                    <li>Estas cantidades son aproximadas y no se deben de considerar como definitivas, ya que se deberán de revisar por los responsables de los trabajos.</li>
                    <li>Solo se indican las cantidades a utilizar, más no así el tipo de anclaje.</li>
                    <li>No se consideran refuerzos, esquinas ni huecos para ventanas.</li>
                    <li>En esta explosión de insumos solo se indican las cantidades de perfiles metálicos más no así su dimensión.</li>
                    <li>Producto de pedido especial*.</li>
                    <li>Se considera 3% de desperdicio.</li>
                </ul>

                <Button
                    className='my-5 bt-new'
                    size="lg"
                    color="primary"
                    onPress={() => navigate("/")}
                >
                    Crear nueva cotización
                </Button>

                <Card className='fixed w-4/6  menu-result flex flex-row box-border p-5 justify-around'>
                    <Tooltip content="Descargar" color="primary">
                        <Button size="lg" className='text-xl' isIconOnly color="primary">
                            <FaFileDownload />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Enviar a email" color="primary">
                        <Button size="lg" className='text-xl' isIconOnly color="primary">
                            <MdAttachEmail />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Contactar" color="primary">
                        <Button size="lg" className='text-xl' isIconOnly color="primary">
                            <IoLogoWhatsapp />
                        </Button>
                    </Tooltip>
                </Card>
            </div>
        </Transition >
    )
}

export default Result
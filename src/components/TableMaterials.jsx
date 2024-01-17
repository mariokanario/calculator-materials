import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useProvider } from './context/Provider'
import { TiTimes, TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";


const TableMaterials = ( {view }) => {

    const { allData, setAllData } = useProvider()

    /* DOWN UP */


    const swapUp = (arr, index1, index2) => {
        let aux = arr[index1]
        arr[index1] = arr[index2]
        arr[index2] = aux
        return arr
    }

    const editData = (i, metodo) => {
        /* if (i === 0 && allData.materiales.length === 0) return
        if (i === allData.materiales.length) return */
        const operacion = metodo === "up" ? i - 1 : i + 1
        const tempData = swapUp(allData.materiales, i, operacion)
        setAllData(
            {
                ...allData,
                materiales: tempData
            }
        )
    }

    /* DELETE */

    const deleteData = (i) => {
        let deleteArray = allData.materiales;
        deleteArray = deleteArray.filter((item, index) => index !== 1);
        setAllData(
            {
                ...allData,
                materiales: deleteArray
            }
        )
    }

    // console.log(allData);
    return (
        <Table className='col-span-1 md:col-span-2'>
            <TableHeader>
                <TableColumn>Material</TableColumn>
                <TableColumn>Espesor (e)<br /> (m)</TableColumn>
                <TableColumn>Conductividad (λ)<br />(W / m·K) </TableColumn>
                <TableColumn>Resistencia Térmica (R)<br />(m2·K / W)  </TableColumn>
                <TableColumn>  </TableColumn>
            </TableHeader>

            <TableBody>
                {
                    allData ?
                        allData.materiales.map((data, i) => (
                            <TableRow key={i} className='text-left'>
                                <TableCell> {data.material} </TableCell>
                                <TableCell> {data.espesor}  </TableCell>
                                <TableCell> {data.conductividad}  </TableCell>
                                <TableCell> {data.resistenciaTermica ? data.resistenciaTermica.toFixed(5) : "N/A"}  </TableCell>
                                <TableCell>
                                    <div className={`flex ${!view && 'hidden'}`} style={{ width: "60px" }}>
                                        {
                                            i > 0 ?
                                                <button
                                                    className='mx-1 text-xl'
                                                    type='button'
                                                    onClick={() => editData(i, "up")}
                                                >

                                                    <TiArrowSortedUp />
                                                </button>
                                                :
                                                <button className='mx-1 text-gray-400 text-xl' type='button' disabled>
                                                    <TiArrowSortedUp />
                                                </button>
                                        }

                                        {
                                            i < (allData?.materiales?.length - 1) ?
                                                <button
                                                    className='mx-1 text-xl'
                                                    type='button'
                                                    onClick={() => editData(i, "down")}
                                                >
                                                    <TiArrowSortedDown />
                                                </button>
                                                :
                                                <button className='mx-1 text-gray-400 text-xl' type='button' disabled>
                                                    <TiArrowSortedDown />
                                                </button>
                                        }

                                        <button
                                            className='mx-1 text-xl'
                                            type='button'
                                            onClick={() => deleteData(i)}
                                        >
                                            <TiTimes />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                        :
                        null
                }


                <TableRow key={100} className='text-left'>
                    <TableCell> <h2 className="font-semibold text-base">Resistencia total</h2> </TableCell>
                    <TableCell>   </TableCell>
                    <TableCell>   </TableCell>
                    <TableCell> {allData.resTer}  </TableCell>
                    <TableCell>   </TableCell>

                </TableRow>
                <TableRow key={101} className='text-left'>
                    <TableCell> <h2 className="font-semibold text-base">Transmitancia térmica <br /> (W/m2K)</h2> </TableCell>
                    <TableCell>   </TableCell>
                    <TableCell>   </TableCell>
                    <TableCell> {allData.transTer}  </TableCell>
                    <TableCell>   </TableCell>

                </TableRow>


            </TableBody>
        </Table>
    )
}

export default TableMaterials
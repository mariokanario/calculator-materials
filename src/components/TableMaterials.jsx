import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useProvider } from './context/Provider'

const TableMaterials = () => {

    const { allData, setAllData } = useProvider()
    
    const resultResisTerm = allData.materiales.length ? allData.materiales.map(({ resistenciaTermica }) => resistenciaTermica).reduce((acumulador, valor) => acumulador + valor, 0) :  0

    const transTerm = 1 / resultResisTerm

    /* DOWN UP */

    const tempData = allData?.materiales
    
    const swapUp = (arr, index1, index2) => {
        let aux = arr[index1]
        arr[index1] = arr[index2]
        arr[index2] = aux
        return arr
    }

    const editData = (i) => {
        swapUp(tempData, i, i - 1)
        setAllData(
            {
                ...allData,
                materiales: swapUp
            }
        )
    }

    // console.log(allData);
    return (
        <Table className='col-span-1 md:col-span-2'>
            <TableHeader>
                <TableColumn>Material</TableColumn>
                <TableColumn>Espesor (e)<br /> (m)</TableColumn>
                <TableColumn>Conductividad (λ)<br/>(W / m·K) </TableColumn>
                <TableColumn>Resistencia Térmica (R)<br />(m2·K / W)  </TableColumn>
               {/*  <TableColumn>  </TableColumn> */}
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
                                {/* <TableCell>
                                    <button 
                                    className='mx-1'
                                        // onClick={editData(i)}
                                    >up</button>
                                </TableCell> */}
                            </TableRow>
                        ))
                        :
                        null
                }


                <TableRow key={100} className='text-left'>
                    <TableCell> <h2 className="font-semibold text-base">Resistencia total</h2> </TableCell>
                    <TableCell>   </TableCell>
                    <TableCell>   </TableCell>
                    <TableCell> {resultResisTerm <= 0 ? 0 : resultResisTerm.toFixed(5)}  </TableCell>
                    {/* <TableCell>   </TableCell> */}

                </TableRow>
                <TableRow key={101} className='text-left'>
                    <TableCell> <h2 className="font-semibold text-base">Transmitancia térmica</h2> </TableCell>
                    <TableCell>   </TableCell>
                    <TableCell>   </TableCell>
                    <TableCell> {transTerm == "Infinity" ? 0 : transTerm.toFixed(5)}  </TableCell>
                    {/* <TableCell>   </TableCell> */}

                </TableRow>


            </TableBody>
        </Table>
    )
}

export default TableMaterials
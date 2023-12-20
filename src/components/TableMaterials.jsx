import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'
import { useProvider } from './context/Provider'

const TableMaterials = () => {

    const { allData } = useProvider()


    return (
        <Table className='col-span-1 md:col-span-2'>
            <TableHeader>
                <TableColumn>Material</TableColumn>
                <TableColumn>Espesor e (m)</TableColumn>
                <TableColumn>Conductividad λ (W / m·K) </TableColumn>
                <TableColumn>Resistencia Térmica Rn (m2·K / W)  </TableColumn>
                <TableColumn>  </TableColumn>
            </TableHeader>

            <TableBody>
                {
                    allData ?
                        allData.map( (data, i) => (
                            <TableRow key={i} className='text-left'>
                                <TableCell> {data.material} </TableCell>
                                <TableCell> {data.espesor}  </TableCell>
                                <TableCell> {data.conductividad}  </TableCell>
                                <TableCell> {data.resistencia ? data.resistencia : "N/A"}  </TableCell>
                                <TableCell>
                                    <button className='mx-1'>up</button>
                                    <button className='mx-1'>down</button>
                                </TableCell>
                            </TableRow>
                        ))
                        :
                        null
                }

            </TableBody>
        </Table>
    )
}

export default TableMaterials
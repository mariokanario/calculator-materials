import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'

const TableMaterials = ({ info }) => {

    return (
        <Table className='col-span-1 md:col-span-2'>
            <TableHeader>
                <TableColumn>Material</TableColumn>
                <TableColumn>Espesor e (m)</TableColumn>
                <TableColumn>Conductividad λ (W / m·K) </TableColumn>
                <TableColumn>Resistencia Térmica Rn (m2·K / W)  </TableColumn>
            </TableHeader>

            <TableBody>
                {
                    info ?
                        info.map(data => (
                            <TableRow className='text-left'>
                                <TableCell> {data.material} </TableCell>
                                <TableCell> {data.espesor}  </TableCell>
                                <TableCell> {data.conductividad}  </TableCell>
                                <TableCell> {data.resistencia ? data.resistencia : "N/A"}  </TableCell>
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
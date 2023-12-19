import { Button, Input, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react'
import React from 'react'
import { FaChevronRight, FaAngleDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import dataMat from '../../json/dataMateriales.json'
import MaterialsImg from '../components/MaterialsImg';

const Materials = () => {

  const navigate = useNavigate();


  return (
    <div className='container container-medium'>
      <h2 className='text-2xl font-bold'>Paso 2: <span className='font-normal'>Condiciones interiores</span></h2>

      <Breadcrumb />

      <form>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">

          <Input type="number" label="Temperatura media ambiente (ºC)" placeholder="0 ºC" />

          <Input type="number" label="Temperatura interior deseada (ºC)" placeholder="0 ºC" />


        </div>

        <h2 className='title-radio mt-5'>Seleccionar material</h2>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-3">

          <Select
            label="Familia"
          >
            <SelectItem value="Salud"> Metales </SelectItem>
            <SelectItem value="Educación"> Maderas </SelectItem>
            <SelectItem value="Residencial"> Hormigones </SelectItem>
            <SelectItem value="Comercial"> Morteros </SelectItem>
          </Select>

          <Select
            label="Tipología"
          >
            <SelectItem value="Salud"> Plásticos </SelectItem>
            <SelectItem value="Educación"> Productos de plásticos </SelectItem>
          </Select>

          <Select
            label="Material"
          >
            <SelectItem value="Salud"> Acrílicos </SelectItem>
            <SelectItem value="Educación"> Linóleo </SelectItem>
          </Select>

          <Input type="number" label="Espesor (mt)" placeholder="0" />

          <div className='col-span-1 md:col-span-2'>
            <Button size="lg" className='my-1' color="primary" variant="bordered" onPress={() => navigate("/result")}>
              Añadir material
              <FaAngleDown />
            </Button>
          </div>



          <Table className='col-span-1 md:col-span-2'>
            <TableHeader>
              <TableColumn>Material</TableColumn>
              <TableColumn>Espesor e (m)</TableColumn>
              <TableColumn>Conductividad λ (W / m·K) </TableColumn>
              <TableColumn>Resistencia Térmica Rn (m2·K / W)  </TableColumn>
            </TableHeader>

            <TableBody>
              <TableRow className='text-left'>
                <TableCell> 1 </TableCell>
                <TableCell> 1 </TableCell>
                <TableCell> 1 </TableCell>
                <TableCell> 1 </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className='materiales col-span-1 md:col-span-2 p-5 flex'>
            <MaterialsImg
              width={ "20" }
              background={"aislante.png"}
            />
            <MaterialsImg
              width={"60"}
              background={"placo_placo.png"}
            />
          </div>
        </div>

        <Button size="lg" className='my-8' color="primary" onPress={() => navigate("/result")}>
          Calcular
          <FaChevronRight />
        </Button>
      </form>
    </div>
  )
}

export default Materials
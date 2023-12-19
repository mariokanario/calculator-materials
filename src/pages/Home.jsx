import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import { FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();


    return (
        <div className='container mx-auto container-small'>
            <img className='mb-10 mx-auto' src="./img/logo.svg" alt="" style={{ width: "150px" }} />
            {/* <h2 className='text-4xl font-bold text'>Bienvenido</h2> */}
            <h3 className='text-lg'>Bienvenido, para iniciar tu cotización llena el siguiente formulario</h3>
            <form action="">
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-10">
                    <Input className='col-span-1 md:col-span-2' type="text" label="Nombre" placeholder="" />
                    <Select
                        label="Tipo de documento"
                    >
                        <SelectItem value="CC"> CC </SelectItem>
                        <SelectItem value="CC"> TI </SelectItem>
                        <SelectItem value="CC"> Pasaporte </SelectItem>
                    </Select>

                    <Input type="text" label="Número de documento" placeholder="" />

                    <Input type="email" label="Correo electrónico" placeholder="" />

                    <Input type="email" label="Celular de empresa" placeholder="" />

                    <Input type="text" label="Nombre del proyecto" placeholder="" />

                    <Select
                        label="Tipo de certificación de sostenibilidad"
                    >
                        <SelectItem value="LI"> LI </SelectItem>
                        <SelectItem value="EDGE"> EDGE </SelectItem>
                        <SelectItem value="Casa colombiana"> Casa colombiana </SelectItem>
                        <SelectItem value="WELL"> WELL </SelectItem>
                        <SelectItem value="Estimula"> Estimula </SelectItem>
                        <SelectItem value="No certificado"> No certificado </SelectItem>

                    </Select>

                    <Checkbox >Aceptación de tratamientos de datos</Checkbox>

                </div>
                <Button size="lg" className='my-8' color="primary"  onPress={() => navigate("/location")}>
                    Siguiente
                    <FaChevronRight />
                </Button>
            </form>
        </div>
    )
}

export default Home
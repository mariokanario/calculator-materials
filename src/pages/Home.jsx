import { Button, Card, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import { FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { useProvider } from '../components/context/Provider';
import { useState } from 'react';

const Home = () => {

    const navigate = useNavigate();

    const { setUserData } = useProvider()

    const [agree, setAgree] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const Schema = yup
        .object({
            name: yup
                .string()
                .required("El nombre es obligatorio")
                .min(5, "El nombre debe tener mínimo 5 letras"),
            typeDocument: yup
                .string()
                .required("Elige un tipo de documento"),
            document: yup
                .string()
                .required("El documento es obligatorio")
                .min(6, "El documento debe mínimo 6 letras"),
            email: yup
                .string()
                .required("El correo es obligatorio")
                .min(5, "El correo debe de tener mínimo 5 letras")
                .email("Ingresa un correo válido"),
            cellphone: yup
                .string()
                .required("El teléfono es obligatorio")
                .min(5, "El teléfono debe de tener mínimo 5 letras")
                .typeError("El teléfono es obligatorio"),
            nameProject: yup
                .string(),
            typeCert: yup
                .string()
                .required("Elige un tipo de certificación de sostenibilidad"),
        })
        .required();


    const formik = useFormik({
        initialValues: {
            name: "",
            typeDocument: "",
            document: "",
            email: "",
            cellphone: "",
            nameProject: "",
            typeCert: ""
        },
        validationSchema: Schema,
        onSubmit: (data) => {
            setUserData(data);
            navigate("/location")
        },
    });

    
    const { name, typeDocument, document, email, cellphone, nameProject, typeCert } = formik.values;

    return (
        <main class="grid grid-cols-1 md:grid-cols-5 min-h-screen">

            <section className='bg-left col-span-1 md:col-span-2 p-4 flex items-center justify-end'>

                <article className='title-cont text-left pr-8'>
                    <h2 className=' text-1xl md:text-4xl font-normal'>BIENVENIDO A LA <br /> <b>CALCULADORA</b> DE </h2>
                    <h3 className=' text-1xl md:text-4xl font-bold' style={{ color: "#ffcf00", fontSize: "50px" }}>RESISTENCIA <br />TÉRMICA</h3>
                    <p className='title-f3'>Para iniciar tu cotización,<br />
                        llena el siguiente formulario</p>
                </article>

            </section>

            <section className="bg-right col-span-1 md:col-span-3 p-4 static flex flex-col justify-center">

                <div className="cont-logo pb-0">
                    <img className='pb-0 mx-auto' src="./img/logo.svg" alt="" style={{ width: "150px" }} />
                </div>
                <Card className='card-cont p-10 ms-5'>
                    <form onSubmit={(e) => {
                        setIsSubmitting(true)
                        return formik.handleSubmit(e)
                        }}>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-6">


                            <Input
                                className='col-span-1 md:col-span-2'
                                type="text"
                                label="Nombre"
                                placeholder=""
                                id="name"
                                value={name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMessage={formik.errors.name && (formik.touched.name || isSubmitting) ? formik.errors.name : null}
                                isInvalid={formik.errors.name && formik.touched.name}
                            />

                            <Select
                                label="Tipo de documento"
                                id="typeDocument"
                                name="typeDocument"
                                value={typeDocument}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMessage={formik.errors.typeDocument && (formik.touched.typeDocument || isSubmitting) ? formik.errors.typeDocument : null }
                                isInvalid={formik.errors.typeDocument && formik.touched.typeDocument}
                            >
                                <SelectItem key="CC" value="CC"> CC </SelectItem>
                                <SelectItem key="CE" value="CE"> CE </SelectItem>
                                <SelectItem key="Pasaporte" value="Pasaporte"> Pasaporte </SelectItem>
                                <SelectItem key="NIT" value="NIT"> NIT </SelectItem>
                            </Select>

                            <Input
                                type="text"
                                label="Número de documento"
                                placeholder=""
                                id="document"
                                value={document}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMessage={formik.errors.document && (formik.touched.document || isSubmitting) ? formik.errors.document : null}
                                isInvalid={formik.errors.document && formik.touched.document}
                            />

                            <Input
                                type="email"
                                label="Correo electrónico"
                                placeholder=""
                                id="email"
                                value={email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMessage={formik.errors.email && (formik.touched.email || isSubmitting) ? formik.errors.email : null}
                                isInvalid={formik.errors.email && formik.touched.email}
                            />

                            <Input
                                type="cellphone"
                                label="Celular"
                                placeholder=""
                                id="cellphone"
                                value={cellphone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMessage={formik.errors.cellphone && (formik.touched.cellphone || isSubmitting) ? formik.errors.cellphone : null}
                                isInvalid={formik.errors.cellphone && formik.touched.cellphone}
                            />

                            <Select
                            className='text-left'
                                label="Tipo de certificación de sostenibilidad"
                                id="typeCert"
                                name="typeCert"
                                value={typeCert}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMessage={formik.errors.typeCert && (formik.touched.typeCert || isSubmitting) ? formik.errors.typeCert : null}
                                isInvalid={formik.errors.typeCert && formik.touched.typeCert}
                            >
                                <SelectItem key="LI" value="LI"> LI </SelectItem>
                                <SelectItem key="EDGE" value="EDGE"> EDGE </SelectItem>
                                <SelectItem key="Casa colombiana" value="Casa colombiana"> Casa colombiana </SelectItem>
                                <SelectItem key="WELL" value="WELL"> WELL </SelectItem>
                                <SelectItem key="Estimula" value="Estimula"> Estimula </SelectItem>
                                <SelectItem key="No certificado" value="No certificado"> No certificado </SelectItem>
                            </Select>

                            <Input
                                type="text"
                                label="Nombre del proyecto"
                                placeholder=""
                                id='nameProject'
                                value={nameProject}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                errorMessage={formik.errors.nameProject && (formik.touched.nameProject || isSubmitting) ? formik.errors.nameProject : null}
                                isInvalid={formik.errors.nameProject && formik.touched.nameProject}
                            />


                            <Checkbox className='col-span-1 md:col-span-2 text-center flex' onChange={() => setAgree(!agree)} >
                                Aceptación de <a className='underline decoration-1' href='https://www.isover.com.co/sites/mac3.isover.com.co/files/2023-07/s15_pol_029_rh_politica_y_procedimiento_proteccion_datos_personales.pdf' target='_blanck'>
                                    tratamientos de datos
                                </a>
                            </Checkbox>

                        </div>
                        <Button

                            isDisabled={agree == false && true}
                            type='submit'
                            size="lg"
                            className='my-8'
                            color="primary"
                        >
                            Siguiente
                            <FaChevronRight />
                        </Button>
                    </form>
                </Card>
            </section>
        </main>

    )
}

export default Home
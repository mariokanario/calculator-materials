import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

const Breadcrumb = () => {

    const { pathname, search } = useLocation()
    const [breadRout, setBreadRout] = useState([])
    

    const routesArray = {
        "/": ["Inicio"],

        "/location": ["Inicio", "Localización"],
        "/materials": ["Inicio", "Localización", "Materiales"],

    }

    useEffect(() => {
        if (pathname) {
            setBreadRout(routesArray[pathname + search]);
        }
    }, [pathname])


    return (
        <>
            <Breadcrumbs variant='solid' className='flex justify-center my-5'>
                {
                    breadRout ?
                     breadRout.map((rou, i) => (
                         <BreadcrumbItem key={i}>{rou}</BreadcrumbItem>
                    )) 
                    :
                    null
                }
            </Breadcrumbs>
        </>
    )
}

export default Breadcrumb
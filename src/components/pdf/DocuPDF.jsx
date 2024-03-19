import React from 'react'
import {
    Document, Page, Image, View, Text, StyleSheet, Font
} from '@react-pdf/renderer'
import MyFontNormal from '../../../public/fonts/Gotham-Book.otf'
import MyFontBold from '../../../public/fonts/Gotham-Bold.otf'

Font.register({
    family: 'Gotham', fonts: [
        { src: MyFontNormal, fontStyle: 'normal' }, // font-style: normal, font-weight: normal
        { src: MyFontBold, fontWeight: 'bold' },
    ]
});

const DocuPDF = () => {

    const styles = StyleSheet.create({
        page: {
            position: 'relative',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
        },
        title: {
            fontSize: "12px",
            fontFamily: 'Gotham',
            fontWeight: 'bold',
        },
        titleThead: {
            fontSize: "11px",
            fontFamily: 'Gotham',
            fontWeight: 'bold',
        },
        paragraph: {
            fontFamily: 'Gotham',
            fontSize: "10px",
            fontWeight: "normal"
        },
        sectionOne: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px 50px",
        },
        sectionTwo: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            border: "solid 1px black"
        },
        sectionTwoThead: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            border: "solid 1px black",
            backgroundColor: 'white'
        },
        sectionThree: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            margin: "10px 0 0 0"
        },
        tableTh: {
            width: "25%",
            border: "1px solid black",
            padding: "2px 5px"
        },
    });

    const data = JSON.parse(localStorage.pdf)

    return (
        <Document>
            <Page size="A4">
                <View>
                    <Image src={`${window.location.origin}${window.location.pathname}img/pdf-header.jpg`} style="width: 100%; " alt="" />
                </View>

                <View style={{
                    backgroundColor: "#FFCF00",
                    width: "88%",
                    margin: "0 auto",
                    padding: "0 20px"
                }}>
                    <Text style={{
                        margin: "0 0 10px 0",
                        fontFamily: 'Gotham',
                        fontWeight: 'bold',
                    }}>
                        Cálculo de resistencia térmica
                    </Text>
                    <View style={styles.sectionOne}>
                        <View>
                            <Text style={styles.title}>Cliente:</Text>
                            <Text style={styles.paragraph}>{data.userData.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Documento:</Text>
                            <Text style={styles.paragraph}>{data.userData.typeDocument + " " + data.userData.document}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Email:</Text>
                            <Text style={styles.paragraph}>{data.userData.email}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Celular:</Text>
                            <Text style={styles.paragraph}>{data.userData.cellphone}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Tipo de proyecto:</Text>
                            <Text style={styles.paragraph}>{data.userData.typeCert}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Nombre del proyecto:</Text>
                            <Text style={styles.paragraph}>{data.userData.nameProject}</Text>
                        </View>

                    </View>
                </View>

                <View style={{ backgroundColor: "#FFCF00", width: "88%", margin: "0 auto", padding: "20px" }}>

                    <Text style={styles.title}>Localización geográfica:</Text>
                    <View style={styles.sectionOne}>
                        <View>
                            <Text style={styles.title}>Departamento:</Text>
                            <Text style={styles.paragraph}>{data.locationData.departamento}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Municipio:</Text>
                            <Text style={styles.paragraph}>{data.locationData.municipio}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Altitud:</Text>
                            <Text style={styles.paragraph}>{data.locationData.altitud}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Clima:</Text>
                            <Text style={styles.paragraph}>{data.locationData.clima}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionOne}>
                        <View style={{ marginTop: "10px" }}>
                            <Text style={styles.title}>Condiciones climáticas:</Text>
                        </View>
                    </View>
                    <View style={styles.sectionOne}>
                        <View>
                            <Text style={styles.title}>Temperatura media ambiente:</Text>
                            <Text style={styles.paragraph}>{data.materialsData.tempAmb} ºC</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Temperatura interior:</Text>
                            <Text style={styles.paragraph}>{data.materialsData.tempInt} ºC</Text>
                        </View>
                    </View>
                </View>

                {/* TABLA */}
                <View style={{
                    backgroundColor: "#FFCF00",
                    width: "88%",
                    margin: "0 auto",
                    padding: "0 20px"
                }}>
                    <View style={styles.sectionTwoThead}>
                        <View style={styles.tableTh}>
                            <Text style={styles.titleThead}>Material:</Text>
                        </View>
                        <View style={styles.tableTh}>
                            <Text style={styles.titleThead}>Espesor (e)(m):</Text>
                        </View>
                        <View style={styles.tableTh}>
                            <Text style={styles.titleThead}>Conductividad (&lambda;) (W / m·K) </Text>
                        </View>
                        <View style={styles.tableTh}>
                            <Text style={styles.titleThead}>Resistencia Térmica (R)(m2·K / W):</Text>
                        </View>
                    </View>
                    {
                        data.materialsData.materiales.map((val, i) => (
                            <View style={styles.sectionTwo} key={i}>
                                <View style={styles.tableTh}>
                                    <Text style={styles.paragraph}> {val.material} </Text>
                                </View>
                                <View style={styles.tableTh}>
                                    <Text style={styles.paragraph}> {val.espesor} </Text>
                                </View>
                                <View style={styles.tableTh}>
                                    <Text style={styles.paragraph}> {val.conductividad} </Text>
                                </View>
                                <View style={styles.tableTh}>
                                    <Text style={styles.paragraph}> {val.resistenciaTermica.toFixed(5)} </Text>
                                </View>
                            </View>
                        ))
                    }

                    <View style={styles.sectionTwo}>
                        <View style={styles.tableTh}>
                            <Text style={styles.paragraph}> Resistencia total: </Text>
                        </View>
                        <View style={styles.tableTh}>
                            <Text style={styles.paragraph}> {data.materialsData.resTer} </Text>
                        </View>
                    </View>
                    <View style={styles.sectionTwo}>
                        <View style={styles.tableTh}>
                            <Text style={styles.paragraph}> Transmitancia térmica (W/m2K): </Text>
                        </View>
                        <View style={styles.tableTh}>
                            <Text style={styles.paragraph}> {data.materialsData.transTer} </Text>
                        </View>
                    </View>

                    {/* IMAGENES */}
                    <View style={styles.sectionThree}>
                        {
                            data.materialsData.materiales.map((val, i) => (
                                <Image
                                    key={i}
                                    src={`/img/materials/${val.imagen}`}
                                    style={{
                                        width: val.espesor < 0 ? (val.espesor * 1000) : (val.espesor * 100) + "px",
                                        minWidth: "10px",
                                        maxWidth: "200px",
                                        height: "140px"
                                    }} alt="" />

                            ))
                        }
                    </View>
                    {/* FIN IMAGENES */}


                </View>

                {/* FIN TABLA */}


                <View style=" margin-top: -4px">
                    <Image src={`${window.location.origin}${window.location.pathname}img/pdf-footer.jpg`} style="width: 100%;" alt="" />
                </View>
            </Page>
        </Document>
    )
}

export default DocuPDF
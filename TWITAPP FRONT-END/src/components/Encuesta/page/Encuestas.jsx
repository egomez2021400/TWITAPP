import Encuesta from '../components/Encuesta'
import EncuestasList from "../components/EncuestasList";

const Encuestas = () => {
    return (
        <>
            <Encuesta encuesta={Encuesta} />
            <EncuestasList encuestalist={EncuestasList} />
        </>
    )
}

export default Encuestas
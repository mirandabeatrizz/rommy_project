import { Interesse as InteresseDb } from "../models/interesse";


const interesse = {

    async list() {
        try {
            console.log("Model TipoImovel:", InteresseDb === undefined ? "Não inicializado" : "Inicializado");

            const interesse = await InteresseDb.findAll()
                .then((response: InteresseDb[]) => {
                    const data = response.map((record) => {
                        return record.toJSON();
                    });
                    return data;
                })
                .then((response: any) => response);

            if (interesse) {
                return { list: interesse };
            } else {
                throw new Error('Não foi possivel listar os interesses.');
            }
        } catch (error: any) {
            const newError = new Error(
                `Method: list; \n file: interesseController.ts:: ${error}`
            );
            console.log(newError.message, { critical: false, track: newError.stack });
            return { error: true, message: newError.message };
        }
    }


}


export default interesse;
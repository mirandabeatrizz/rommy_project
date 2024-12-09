import { Interesse as InteresseDb } from "../models/interesse";
import { Imovel as ImovelDb } from "../models/imovel";
import { InteresseImovel as InteresseImovelDb } from "../models/interesseImovel";

const interesse = {

    async list() {
        try {
            console.log("Model InteresseDb:", InteresseDb === undefined ? "Não inicializado" : "Inicializado");

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
    },

    async create(data: InteresseDb) {
        try {
            const { valor, qtd_moradores, imovel_id } = data
            if (data) {

                //procura o imovel
                const imovel = await ImovelDb.findOne({
                    where: { id: imovel_id }
                })

                if (imovel) {
                    //adiciona na tabela de Interesse
                    const novo_interesse = await InteresseDb.create({
                        valor: valor,
                        qtd_moradores:qtd_moradores
                    }).then(async (interesse)=>{

                        await InteresseImovelDb.create({
                            interesse_id: interesse.id,
                            imovel_id: imovel.id
                        })
                    });
                    return novo_interesse;
                }else{
                    throw new Error("Não foi possível encontrar o imóvel")
                }

            }
        } catch (error: any) {
            const newError = new Error(
                `Method: create; \n file: intersseController.ts:: ${error}`
            );
            console.log(newError.message, { critical: false, track: newError.stack });
            return { error: true, status: 500, message: newError.message };
        }
    }


}


export default interesse;
import { useState } from "react";

export default function CreateInteresse({
  idImovel,
  showModal,
  setShowModal,
}: {
  idImovel: number;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}) {
  const [valor, setValor] = useState("");
  const [qtdMaxima, setQtdMaxima] = useState("");

  // Função para verificar se todos os campos estão preenchidos
  const isFormValid = () => {
    return valor.trim() !== "" && qtdMaxima.trim() !== "";
  };

  // Função para enviar os dados para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      valor: parseFloat(valor),
      qtd_moradores: parseInt(qtdMaxima, 10),
      usuario_id: 1, // Substitua com o ID do usuário real
      imovel_id: idImovel,
    };

    console.log(data);

    try {
      const response = await fetch("/api/interesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar os dados");
      }

      // Fechar modal após salvar os dados
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[80%] my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-[#eb6d6d] text-xl font-semibold">
                    Cadastrar interesse
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        className="block text-black text-md mb-2"
                        htmlFor="valor"
                      >
                        Valor
                      </label>
                      <input
                        className="h-[5vh] px-2 border border-solid border-zinc-300 bg-white w-full rounded-lg outline-none text-black"
                        id="valor"
                        type="text"
                        placeholder="Ex: 1000.00"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-black text-md mb-2"
                        htmlFor="qtd_max"
                      >
                        Quantidade de roommates
                      </label>
                      <input
                        className="h-[5vh] px-2 border border-solid border-zinc-300 bg-white w-full rounded-lg outline-none text-black"
                        id="qtd_maxima"
                        type="text"
                        placeholder="Ex: 4"
                        value={qtdMaxima}
                        onChange={(e) => setQtdMaxima(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className={`${
                          isFormValid()
                            ? "bg-[#1f4d78] hover:bg-[#2a68a2]"
                            : "bg-zinc-300 cursor-not-allowed"
                        } text-white font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1`}
                        type="submit"
                        disabled={!isFormValid()}
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

import type { AppProps } from "next/app";
import { ensureDbConnection } from "../../middlewares/ensureDbConnection";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Testa a conexão com o banco ao iniciar o app
  ensureDbConnection()
    .then(() => console.log("Banco conectado com sucesso."))
    .catch((error: any) => console.error("Erro ao conectar ao banco:", error));

  return <Component {...pageProps} />;
}

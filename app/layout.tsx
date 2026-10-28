import {
  DatabaseDataProvider,
  type DatabaseData,
} from "@/components/database-data";
import { getDocument } from "@/lib/repository";
import type { Metadata } from "next";
import "./globals.css";
import "./analysis.css";
import "./controls.css";
import "./theme.css";
import "./context.css";
export const metadata: Metadata = {
  title: "Brasil em Evidências | Dados, contexto e fontes",
  description:
    "Consulte indicadores públicos, documentos e explicações sobre pandemia e processos judiciais no Brasil.",
};
export const dynamic = "force-dynamic";
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mobility, prices, budget, pandemic] = await Promise.all([
    getDocument<DatabaseData["mobility"]>("mobility.json"),
    getDocument<DatabaseData["prices"]>("price-index.json"),
    getDocument<DatabaseData["budget"]>("budget.json"),
    getDocument<DatabaseData["pandemic"]>("pandemic-estimates.json"),
  ]);
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('brasil-evidencias-theme');document.documentElement.dataset.theme=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}",
          }}
        />
      </head>
      <body>
        <DatabaseDataProvider value={{ mobility, prices, budget, pandemic }}>
          {children}
        </DatabaseDataProvider>
      </body>
    </html>
  );
}

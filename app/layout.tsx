import type { Metadata } from "next";
import "./globals.css";
import "./analysis.css";
import "./controls.css";
import "./theme.css";
export const metadata: Metadata = {
  title: "Brasil em Evidências | Dados, contexto e fontes",
  description:
    "Consulte indicadores públicos, documentos e explicações sobre pandemia e processos judiciais no Brasil.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
      <body>{children}</body>
    </html>
  );
}

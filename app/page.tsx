import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  ChartNoAxesCombined,
  Scale,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { IndicatorLibrary } from "@/components/indicator-library";
import { FactChecks } from "@/components/fact-checks";
import { NewAxes } from "@/components/new-axes";
export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="dot" /> O BRASIL ALÉM DA MANCHETE
            </div>
            <h1>
              Menos ruído.
              <br />
              Mais <span>evidências.</span>
            </h1>
            <p>
              Entenda o Brasil com séries históricas, gráficos interativos e
              análises completas. Os números contam uma história. O contexto
              ajuda a interpretá-la.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/indicadores">
                Entenda os indicadores
                <ArrowRight size={18} />
              </Link>
              <Link className="text-link" href="/checagens">
                Confira os fatos
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="hero-note">
              <ShieldCheck size={17} /> Análises próprias<span>·</span>Fontes
              identificadas
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Ilustração do Brasil com representação decorativa de uma série histórica"
          >
            <div className="art-grid" />
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <svg className="brazil" viewBox="0 0 350 360" aria-hidden="true">
              <path
                d="M67 40 95 48 116 30 139 44 161 32 185 55 207 54 224 76 264 82 286 110 323 123 309 151 278 168 273 198 248 215 236 249 205 270 188 301 166 314 152 346 130 326 141 295 124 269 102 250 99 219 74 207 65 180 42 169 34 139 14 120 27 90 51 83Z"
                fill="currentColor"
              />
            </svg>
            <div className="floating-card art-source">
              <span className="tiny-icon">
                <BookOpen size={18} />
              </span>
              <div>
                Uma análise por tema<strong>A história inteira importa.</strong>
              </div>
              <ArrowUpRight size={18} />
            </div>
            <div className="floating-card art-data">
              <span className="eyebrow">SÉRIES HISTÓRICAS</span>
              <div className="mini-bars" aria-hidden="true">
                {[35, 55, 43, 72, 62, 88, 100].map((n, i) => (
                  <i key={i} style={{ height: n + "%" }} />
                ))}
              </div>
              <span className="data-caption">
                Veja a trajetória, entenda o contexto
                <ChartNoAxesCombined size={14} />
              </span>
            </div>
            <div className="art-label">
              BRASIL, EM PERSPECTIVA<span>↗</span>
            </div>
          </div>
        </section>
        <div className="principles">
          <div className="wrap">
            <span>
              <BookOpen size={17} />
              Análises completas
            </span>
            <span>
              <ChartNoAxesCombined size={17} />
              Gráficos ao longo do tempo
            </span>
            <span>
              <Scale size={17} />
              Contexto dos governos
            </span>
            <span>
              <ShieldCheck size={17} />
              Checagens explicadas
            </span>
          </div>
        </div>
        <section id="biblioteca" className="section wrap">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                SÉRIES HISTÓRICAS, NÃO APENAS UM RECORTE
              </div>
              <h2>
                Entenda os indicadores<span className="green">.</span>
              </h2>
            </div>
            <Link className="text-link" href="/indicadores">
              Todas as análises
              <ArrowRight size={16} />
            </Link>
          </div>
          <IndicatorLibrary />
        </section>
        <section id="checagens" className="checks-section">
          <div className="wrap section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">ALEGAÇÃO, EVIDÊNCIA E CONCLUSÃO</div>
                <h2>
                  Checagem de fake news<span className="green">.</span>
                </h2>
              </div>
              <Link className="text-link" href="/checagens">
                Todas as checagens
                <ArrowRight size={16} />
              </Link>
            </div>
            <p className="dossier-lead">
              O que foi dito? O que os dados mostram? Leia a explicação e o
              alcance de cada conclusão, sem sair do site.
            </p>
            <FactChecks />
          </div>
        </section>
        <section className="section wrap">
          <div className="dossier-features">
            <article className="feature-pandemic">
              <div className="eyebrow">DOSSIÊ · COVID-19</div>
              <h2>A pandemia explica tudo?</h2>
              <p>
                Veja a cronologia da resposta brasileira: equipamentos,
                oxigênio, testagem, vacinas, coordenação e comunicação pública.
              </p>
              <Link href="/pandemia" className="button light">
                Entenda a resposta à pandemia
                <ArrowRight size={17} />
              </Link>
            </article>
            <article className="feature-justice">
              <div className="eyebrow">JUSTIÇA E CORRUPÇÃO</div>
              <h2>
                O que foi acusado.
                <br />O que foi decidido.
              </h2>
              <p>
                Mensalão, orçamento secreto, processos de Lula, casos envolvendo
                a família Bolsonaro e hospitais do Rio. Cada caso com seu
                contexto.
              </p>
              <Link href="/justica" className="text-link">
                Entenda os casos e desfechos
                <ArrowRight size={17} />
              </Link>
            </article>
          </div>
        </section>
        <NewAxes />
        <section id="metodologia" className="section wrap methodology">
          <div>
            <div className="eyebrow">TRANSPARÊNCIA DESDE O COMEÇO</div>
            <h2>
              A fonte faz parte
              <br />
              da informação.
            </h2>
            <p>
              As análises ficam aqui. As fontes servem para conferir os números
              e documentos. Cada série identifica seu intervalo, definição e
              limites.
            </p>
          </div>
          <div className="method-items">
            <div>
              <span>01</span>
              <p>
                <strong>O histórico completo do recorte</strong>Gráficos com
                anos consecutivos, filtros de período, tabela equivalente e
                download dos dados.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <strong>Governos como contexto</strong>Faixas destacam mandatos
                do PT. O ano compartilhado de 2016 é identificado. Coincidência
                temporal não comprova causalidade.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <strong>Períodos e revisões à vista</strong>Anos fechados e
                edições das fontes ficam explícitos. Não misturamos uma taxa de
                homicídios com toda a criminalidade ou um ano parcial com um ano
                completo.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

"use client";
import { useState } from "react";
import { Download, ArrowUpRight } from "lucide-react";
import { type Poll } from "@/data/polls";
const date = (s: string) => s.split("-").reverse().join("/");
const show = (v: string | number | null) =>
  v === null ? "Não informado na fonte consultada" : String(v);
const colors: Record<string, string> = {
  Lula: "#1c6d4c",
  "Flávio Bolsonaro": "#ac722b",
};
export function PollsDashboard({ polls }: { polls: Poll[] }) {
  const [institute, setInstitute] = useState("Todos"),
    [basis, setBasis] = useState<"totals" | "valid">("totals"),
    [start, setStart] = useState("2026-01-01"),
    [end, setEnd] = useState("2026-12-31"),
    [selected, setSelected] = useState(polls.at(-1)!.id),
    [bands, setBands] = useState(true);
  const visible = polls
    .filter(
      (p) =>
        (institute === "Todos" || p.institute === institute) &&
        p.fieldEnd >= start &&
        p.fieldEnd <= end,
    )
    .sort((a, b) => a.fieldEnd.localeCompare(b.fieldEnd));
  const active = visible.find((p) => p.id === selected) ?? visible.at(-1);
  const left = 65,
    right = 945,
    top = 35,
    bottom = 340,
    lo = visible.length ? Date.parse(visible[0].fieldEnd) : 0,
    hi = visible.length ? Date.parse(visible.at(-1)!.fieldEnd) : 1;
  const x = (p: Poll) =>
      hi === lo
        ? (left + right) / 2
        : left + ((Date.parse(p.fieldEnd) - lo) / (hi - lo)) * (right - left),
    y = (v: number) => bottom - (v / 60) * (bottom - top);
  const institutes = [...new Set(visible.map((p) => p.institute))];
  return (
    <>
      <div className="poll-filters">
        <label>
          Instituto
          <select
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            aria-label="Instituto"
          >
            <option>Todos</option>
            {[...new Set(polls.map((p) => p.institute))].map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
        <label>
          Base dos resultados
          <select
            value={basis}
            onChange={(e) => setBasis(e.target.value as "totals" | "valid")}
            aria-label="Base dos resultados"
          >
            <option value="totals">Votos totais</option>
            <option value="valid">Votos válidos</option>
          </select>
        </label>
        <label>
          Campo encerrado a partir de
          <input
            type="date"
            aria-label="Campo a partir de"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label>
          Até
          <input
            type="date"
            aria-label="Campo até"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
      </div>
      <div className="poll-coverage">
        <strong>
          {visible.length} levantamentos no recorte · {institutes.length}{" "}
          institutos
        </strong>
        <p>
          Acervo inicial conferido: três levantamentos nacionais de outubro de
          2026. Não é o catálogo completo de todas as pesquisas. Metadados não
          encontrados ficam explicitamente em aberto; os registros TSE são os
          informados pelas fontes, sem validação independente nesta versão.
        </p>
      </div>
      {visible.length ? (
        <>
          <div className="series-card">
            <div className="series-toolbar">
              <div>
                <h2>Presidência 2026 · segundo turno</h2>
                <p>
                  Lula × Flávio Bolsonaro · Brasil ·{" "}
                  {basis === "totals" ? "votos totais" : "votos válidos"}
                </p>
              </div>
              <label className="poll-band-toggle">
                <input
                  type="checkbox"
                  checked={bands}
                  onChange={(e) => setBands(e.target.checked)}
                />
                Mostrar margens declaradas
              </label>
            </div>
            <div className="series-legend">
              {Object.keys(colors).map((c) => (
                <span key={c}>
                  <i
                    className="legend-line"
                    style={{ background: colors[c] }}
                  />
                  {c}
                </span>
              ))}
              {institutes.map((i, n) => (
                <span key={i}>
                  {n === 0 ? "Linha contínua" : "Linha tracejada"}: {i}
                </span>
              ))}
            </div>
            <div className="series-scroll">
              <svg
                className="series-svg"
                viewBox="0 0 1000 410"
                role="group"
                aria-label="Evolução das pesquisas no mesmo cenário. Barras indicam margens gerais declaradas, não intervalos calculados pelo site."
              >
                {[0, 10, 20, 30, 40, 50, 60].map((t) => (
                  <g key={t}>
                    <line
                      x1={left}
                      x2={right}
                      y1={y(t)}
                      y2={y(t)}
                      stroke="#dbe3d7"
                      strokeDasharray="3 5"
                    />
                    <text
                      x={left - 12}
                      y={y(t) + 4}
                      textAnchor="end"
                      fontSize="12"
                      fill="#6c7569"
                    >
                      {t}%
                    </text>
                  </g>
                ))}
                {institutes.map((inst, n) =>
                  Object.keys(colors).map((candidate) => {
                    const rows = visible.filter(
                      (p) => p.institute === inst && candidate in p[basis],
                    );
                    return (
                      <g key={inst + candidate}>
                        {rows.length > 1 && (
                          <path
                            d={rows
                              .map(
                                (p, i) =>
                                  `${i ? "L" : "M"}${x(p)},${y(p[basis][candidate])}`,
                              )
                              .join(" ")}
                            fill="none"
                            stroke={colors[candidate]}
                            strokeWidth="2.5"
                            strokeDasharray={n ? "6 4" : undefined}
                          />
                        )}
                        {rows.map((p) => {
                          const value = p[basis][candidate];
                          return (
                            <g key={p.id}>
                              {bands && p.error !== null && (
                                <g stroke={colors[candidate]} opacity=".4">
                                  <line
                                    x1={x(p)}
                                    x2={x(p)}
                                    y1={y(Math.min(100, value + p.error))}
                                    y2={y(Math.max(0, value - p.error))}
                                    strokeWidth="5"
                                  />
                                  <line
                                    x1={x(p) - 7}
                                    x2={x(p) + 7}
                                    y1={y(value + p.error)}
                                    y2={y(value + p.error)}
                                  />
                                  <line
                                    x1={x(p) - 7}
                                    x2={x(p) + 7}
                                    y1={y(value - p.error)}
                                    y2={y(value - p.error)}
                                  />
                                </g>
                              )}
                              <circle
                                cx={x(p)}
                                cy={y(value)}
                                r="6"
                                fill="white"
                                stroke={colors[candidate]}
                                strokeWidth="2"
                                role="button"
                                tabIndex={0}
                                aria-label={`${p.institute}, ${date(p.fieldEnd)}, ${candidate}: ${value}%`}
                                onClick={() => setSelected(p.id)}
                                onFocus={() => setSelected(p.id)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ")
                                    setSelected(p.id);
                                }}
                              />
                            </g>
                          );
                        })}
                      </g>
                    );
                  }),
                )}
                {visible.map((p, i) => (
                  <text
                    key={p.id}
                    x={x(p)}
                    y={bottom + 28 + (i % 2) * 16}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#6c7569"
                  >
                    {date(p.fieldEnd)}
                  </text>
                ))}
              </svg>
            </div>
            <p className="series-context">
              O eixo temporal usa o fim do campo. Linhas só conectam o mesmo
              instituto, cenário e base de votos; não calculamos uma média entre
              institutos. As barras usam ± a margem geral declarada, como
              referência gráfica, sem recalcular margens de votos válidos ou de
              subgrupos. Sobreposição não prova igualdade de resultados, e
              pesquisa não prevê o resultado eleitoral.
            </p>
            <a
              className="download"
              download="pesquisas-no-recorte.json"
              href={
                "data:application/json;charset=utf-8," +
                encodeURIComponent(JSON.stringify(visible, null, 2))
              }
            >
              <Download size={16} />
              Baixar fichas completas deste recorte
            </a>
          </div>
          <div className="poll-record-picker">
            <label>
              Ver ficha do levantamento
              <select
                aria-label="Ver ficha do levantamento"
                value={active!.id}
                onChange={(e) => setSelected(e.target.value)}
              >
                {visible.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.institute} · publicado em {date(p.published)} ·{" "}
                    {p.registration}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {active && <PollDetail poll={active} basis={basis} />}
        </>
      ) : (
        <p className="empty">
          Nenhum levantamento nesse período. Ajuste as datas ou o instituto.
        </p>
      )}
    </>
  );
}
function PollDetail({
  poll,
  basis,
}: {
  poll: Poll;
  basis: "totals" | "valid";
}) {
  const fields: [string, string | number | null][] = [
    ["Instituto", poll.institute],
    ["Publicação", date(poll.published)],
    ["Campo", `${date(poll.fieldStart)} a ${date(poll.fieldEnd)}`],
    ["Cargo / turno", `${poll.office} · ${poll.round}º turno`],
    ["Abrangência", poll.territory],
    ["Cenário", poll.scenario],
    ["Amostra", poll.sample],
    ["Municípios", poll.municipalities],
    ["Universo", poll.population],
    ["Método", poll.method],
    ["Contratante informado", poll.commissioner],
    ["Divulgação", poll.publisher],
    ["Registro TSE informado", poll.registration],
    [
      "Verificação independente no TSE",
      poll.registrationChecked ? "Realizada" : "Pendente",
    ],
    [
      "Margem geral",
      poll.error === null ? null : `±${poll.error} pontos percentuais`,
    ],
    [
      "Confiança declarada",
      poll.confidence === null ? null : `${poll.confidence}%`,
    ],
    ["Custo contratado", poll.cost],
    ["Origem dos recursos", poll.funding],
    ["Responsável estatístico", poll.statistician],
    ["Ponderação", poll.weighting],
    ["Pergunta literal", poll.question],
  ];
  return (
    <article className="poll-detail">
      <div className="eyebrow">
        FICHA DO LEVANTAMENTO · CAMPOS AUSENTES IDENTIFICADOS
      </div>
      <h2>
        {poll.institute} · {date(poll.published)}
      </h2>
      <div className="poll-results">
        {Object.entries(poll[basis]).map(([name, value]) => (
          <div key={name}>
            <span>{name}</span>
            <strong>{value.toLocaleString("pt-BR")}%</strong>
          </div>
        ))}
      </div>
      <dl className="poll-facts">
        {fields.map(([name, value]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{show(value)}</dd>
          </div>
        ))}
      </dl>
      <p className="coverage-note">{poll.notes}</p>
      {poll.breakdowns && (
        <div className="series-scroll">
          <table>
            <caption>
              Recortes informados na publicação · não representam todas as
              tabulações da pesquisa
            </caption>
            <thead>
              <tr>
                <th scope="col">Grupo</th>
                <th scope="col">Lula</th>
                <th scope="col">Flávio Bolsonaro</th>
                <th scope="col">Margem específica</th>
              </tr>
            </thead>
            <tbody>
              {poll.breakdowns.map((b) => (
                <tr key={b.group}>
                  <th scope="row">{b.group}</th>
                  <td>{b.results.Lula}%</td>
                  <td>{b.results["Flávio Bolsonaro"]}%</td>
                  <td>
                    {b.error === null ? "Não informada" : `±${b.error} p.p.`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="record-sources">
        <a href={poll.source.url} target="_blank" rel="noreferrer">
          {poll.source.label}
          <ArrowUpRight size={16} />
        </a>
        <a
          href="https://www.tse.jus.br/eleicoes/pesquisas-eleitorais"
          target="_blank"
          rel="noreferrer"
        >
          Consultar orientações e sistema de pesquisas do TSE
          <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}

import IndicatorPage from "../indicadores/[slug]/page";
export const metadata = { title: "Industrialização | Brasil em Evidências" };
export default function Industry() {
  return (
    <IndicatorPage params={Promise.resolve({ slug: "industrializacao" })} />
  );
}

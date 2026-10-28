CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS raw;
CREATE SCHEMA IF NOT EXISTS editorial;
CREATE TABLE IF NOT EXISTS core.imports (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 started_at timestamptz NOT NULL DEFAULT now(), completed_at timestamptz,
 series_count integer, observation_count integer, document_count integer
);
CREATE TABLE IF NOT EXISTS raw.documents (
 name text PRIMARY KEY, sha256 text NOT NULL, payload jsonb NOT NULL,
 imported_at timestamptz NOT NULL DEFAULT now(), import_id bigint REFERENCES core.imports(id)
);
CREATE TABLE IF NOT EXISTS core.series (
 id text PRIMARY KEY, parent_slug text NOT NULL, slug text NOT NULL,
 provider text NOT NULL, theme text NOT NULL, is_primary boolean NOT NULL,
 definition jsonb NOT NULL, import_id bigint NOT NULL REFERENCES core.imports(id)
);
CREATE INDEX IF NOT EXISTS series_parent ON core.series(parent_slug);
CREATE INDEX IF NOT EXISTS series_provider_theme ON core.series(provider,theme);
CREATE TABLE IF NOT EXISTS core.observations (
 series_id text NOT NULL REFERENCES core.series(id) ON DELETE CASCADE,
 geo_id text NOT NULL, period date NOT NULL,
 kind text NOT NULL CHECK(kind IN ('primary','secondary')),
 value numeric NOT NULL,
 PRIMARY KEY(series_id,geo_id,period,kind)
);
CREATE INDEX IF NOT EXISTS observation_period ON core.observations(period);
CREATE INDEX IF NOT EXISTS observation_geo_period ON core.observations(geo_id,period);
CREATE TABLE IF NOT EXISTS editorial.records (
 collection text NOT NULL, id text NOT NULL, payload jsonb NOT NULL,
 PRIMARY KEY(collection,id)
);
CREATE OR REPLACE VIEW core.observations_catalog AS
SELECT s.id AS series_id,s.parent_slug,s.slug,s.provider,s.theme,
 s.definition->>'seriesName' AS series_name,
 s.definition->>'unit' AS unit,s.definition->>'frequency' AS frequency,
 s.definition->>'methodology' AS methodology,
 s.definition->'sources' AS sources,
 o.geo_id,o.period,o.kind,o.value
FROM core.series s JOIN core.observations o ON o.series_id=s.id;
CREATE OR REPLACE VIEW core.geographies AS
SELECT s.id AS series_id,'br'::text AS geo_id,'Brasil'::text AS name,'br'::text AS level FROM core.series s
UNION
SELECT s.id,g->>'id',g->>'name',g->>'level' FROM core.series s
CROSS JOIN LATERAL jsonb_array_elements(coalesce(s.definition->'geographies','[]'::jsonb)) g;

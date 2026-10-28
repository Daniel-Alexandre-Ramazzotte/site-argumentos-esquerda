import { randomBytes } from 'node:crypto';
import { existsSync, writeFileSync } from 'node:fs';
if(existsSync('.env')) { console.log('.env existente preservado.'); process.exit(); }
const admin=randomBytes(24).toString('hex'), reader=randomBytes(24).toString('hex');
writeFileSync('.env',`POSTGRES_DB=brasil_perspectiva\nPOSTGRES_USER=brasil_admin\nPOSTGRES_PASSWORD=${admin}\nPOSTGRES_PORT=5433\nDATABASE_ADMIN_URL=postgresql://brasil_admin:${admin}@127.0.0.1:5433/brasil_perspectiva\nDATABASE_URL=postgresql://brasil_reader:${reader}@127.0.0.1:5433/brasil_perspectiva\nDATABASE_READER_PASSWORD=${reader}\n`,{mode:0o600});
console.log('Configuração local criada em .env (ignorada pelo Git).');

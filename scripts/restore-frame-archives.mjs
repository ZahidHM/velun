import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const directory=new URL('../dist/assets/',import.meta.url);
const archives=[{"name":"velun-cover-frames.zip","sha256":"69786a75db433bbad64b0252d95b3f7e90463d274351fa73bfb616405cba58fd"},{"name":"velun-intermediate-frames.zip","sha256":"a907878ed6fad1cd086c793d75c157fce9661642ff3c3721c75b8ee569c185c4"}];
for(const {name,sha256} of archives){
 const target=new URL(name,directory);
 if(existsSync(target)&&createHash('sha256').update(readFileSync(target)).digest('hex')===sha256)continue;
 const pieces=[];
 for(let index=1;;index++){
  const part=new URL(name+'.part'+String(index).padStart(2,'0'),directory);
  if(!existsSync(part))break;
  pieces.push(readFileSync(part));
 }
 if(!pieces.length)throw new Error('Faltan las partes de '+name);
 const bytes=Buffer.concat(pieces);
 if(createHash('sha256').update(bytes).digest('hex')!==sha256)throw new Error('Archivo incompleto: '+name);
 writeFileSync(target,bytes);
 console.log('Reconstruido: '+name);
}

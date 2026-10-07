import './scripts/restore-frame-archives.mjs';
import {build} from 'esbuild';
await build({entryPoints:['src/app.jsx'],bundle:true,minify:true,format:'esm',target:['es2022'],outfile:'dist/app.js',jsx:'automatic',legalComments:'none'});
console.log('Velun React + Framer Motion built.');

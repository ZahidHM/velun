import fs from 'node:fs';
import {Resvg} from '@resvg/resvg-js';
const dir='dist/assets/intermediate-frames';fs.mkdirSync(dir,{recursive:true});
const data=name=>'data:image/png;base64,'+fs.readFileSync(`${dir}/textures/${name}.png`).toString('base64');
const planet=data('frame-2'),mark=data('mark');
const smooth=x=>x*x*(3-2*x),clamp=x=>Math.min(1,Math.max(0,x));
function cubic(x,points){const [x1,y1,x2,y2]=points;const curve=(t,a,b)=>3*(1-t)*(1-t)*t*a+3*(1-t)*t*t*b+t*t*t;let lo=0,hi=1;for(let i=0;i<24;i++){const m=(lo+hi)/2;if(curve(m,x1,x2)<x)lo=m;else hi=m}return curve((lo+hi)/2,y1,y2)}
const E=[.22,1,.36,1],orbE=[.45,0,.18,1];
function k(t,times,values,e=E){const x=clamp(t);let i=0;while(i<times.length-2&&x>times[i+1])i++;const f=cubic(clamp((x-times[i])/(times[i+1]-times[i])),e);return values[i]+(values[i+1]-values[i])*f}
const V='M-101 -87 H-30 C-77 -53 -63 4 -20 21 C2 29 25 25 43 14 L65 -87 H103 L2 103 Z';
const manifest=[];
for(let i=0;i<31;i++){
 const t=i*.5,x=k(t/7.5,[0,.19,.73,1],[390,390,122,54],orbE),y=k(t/7.5,[0,.19,.73,1],[120,120,50,-24],orbE);
 const orbOpacity=k(t/10.5,[0,.12,.58,.82,1],[0,1,1,1,0]),scale=k(t/10.5,[0,.12,.58,.82,1],[.94,1,1,.84,.67]);
 const logoOpacity=k(t/14.5,[0,.57,.74,.88,1],[0,0,1,1,0]);const logoScale=k(t/14.5,[0,.57,.74,.88,1],[.8,.8,1,1,1]);
 const sweep=-340+cubic(clamp((t-8.4)/2.1),E)*230,finalAlpha=cubic(clamp((t-12)/2.5),E);
 const geomOpacity=k(t/12,[0,.55,.64,.86,1],[0,0,.6,.6,0]);
 for(const mode of ['software','gaming']){
 const stars=Array.from({length:85},(_,j)=>`<circle cx="${(j*173+43)%1280}" cy="${(j*137+59)%680}" r="${j%4===0?.9:.5}" fill="#d8cabb" opacity="${(j%5+1)*.065}"/>`).join('');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1280" height="720" viewBox="0 0 1280 720"><defs><radialGradient id="bg"><stop stop-color="#10141b"/><stop offset="1" stop-color="#030609"/></radialGradient><radialGradient id="moon"><stop stop-color="#0c1118"/><stop offset="1" stop-color="#010305"/></radialGradient><clipPath id="planet"><circle r="170"/></clipPath><mask id="eclipse"><rect x="-270" y="-250" width="540" height="500" fill="white"/><circle cx="${x}" cy="${y}" r="166" fill="black"/></mask><clipPath id="v"><path d="${V}"/></clipPath><mask id="sweep"><rect x="-120" y="${sweep}" width="240" height="230" fill="white"/></mask></defs><rect width="1280" height="720" fill="url(#bg)"/>${stars}<g transform="translate(640 324) scale(${scale})" opacity="${orbOpacity}"><g mask="url(#eclipse)"><image xlink:href="${planet}" x="-263" y="-242" width="529" height="417" clip-path="url(#planet)"/><circle r="170" fill="none" stroke="#e7b184" stroke-width="1.1" opacity="${clamp(t/7.5)}"/></g><circle cx="${x}" cy="${y}" r="166" fill="url(#moon)" stroke="#f1d2ae" stroke-width=".45" opacity="${clamp((t-1.4)/4)}"/></g><g transform="translate(640 324)" fill="none" stroke="#d1b99e" stroke-width=".45" stroke-dasharray="3 5" opacity="${geomOpacity}"><circle r="157"/><circle r="108"/><path d="M-214-177 0 191 214-177ZM0-217V217M-245 0H245M-213 177 0-191 213 177Z"/></g><g transform="translate(640 324) scale(${logoScale*1.1})" opacity="${logoOpacity}"><path d="${V}" fill="none" stroke="#d7b793" stroke-width=".7"/><g mask="url(#sweep)"><image xlink:href="${mark}" x="-106" y="-90" width="213" height="197" clip-path="url(#v)"/></g></g><text x="640" y="487" text-anchor="middle" font-family="Liberation Sans" font-size="38" letter-spacing="24" fill="#dec4ad" opacity="${logoOpacity*clamp((t-10.5)/1.7)}">VELUN</text><image xlink:href="${data(mode)}" x="0" y="97.5" width="1280" height="525" opacity="${finalAlpha}"/></svg>`;
 const filename=`${mode}-${String(i).padStart(2,'0')}`;let portable=svg;for(const texture of ['frame-2','mark','software','gaming'])portable=portable.replaceAll(data(texture),`textures/${texture}.png`);fs.writeFileSync(`${dir}/${filename}.svg`,portable);fs.writeFileSync(`${dir}/${filename}.png`,new Resvg(svg).render().asPng());manifest.push({mode,time_seconds:t,svg:`${filename}.svg`,png:`${filename}.png`});
 }
}
fs.writeFileSync(`${dir}/manifest.json`,JSON.stringify({fps:2,duration_seconds:15,note:'Intermedios calculados del eclipse, la geometría y el barrido de la V; snapshots de referencia a 1280 × 720. La web anima de forma continua a la frecuencia de pantalla.',frames:manifest},null,2));
console.log(`Exported ${manifest.length} intermediate frames in SVG and PNG.`);

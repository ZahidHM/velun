import React, {useState,useEffect,useCallback,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,AnimatePresence,useReducedMotion,useScroll,useTransform,useInView} from 'framer-motion';

const projects={software:[{name:'Namy',category:'Plataforma SaaS',description:'Cursos, citas y experiencias de belleza en un solo lugar.',type:'namy',label:'N'},{name:'Project Brain',category:'Herramienta para equipos',description:'Un espacio para organizar proyectos, módulos y decisiones.',type:'brain',label:'PB'},{name:'Orbit',category:'Aplicación web',description:'Una vista clara de la operación, los datos y el siguiente paso.',type:'orbit',label:'O'}],gaming:[{name:'Eclipse',category:'Aventura · Concepto',description:'Un mundo que despierta cuando la luz desaparece.',type:'eclipse',image:'/assets/gaming.webp'},{name:'Lunar Drift',category:'Exploración · Concepto',description:'Un viaje entre órbitas, silencio y territorios desconocidos.',type:'lunar',image:'/assets/frame-2.webp'},{name:'The Last Signal',category:'Ciencia ficción · Concepto',description:'Una señal distante. Una última oportunidad para encontrarla.',type:'signal',image:'/assets/frame-5.webp'}]};
const V='M-101 -87 H-30 C-77 -53 -63 4 -20 21 C2 29 25 25 43 14 L65 -87 H103 L2 103 Z';
const ease=[.22,1,.36,1];
function ReplayIcon(){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/></svg>}
function Eclipse({mode,onFinish,reduced}){
 useEffect(()=>{const timer=setTimeout(onFinish,reduced?0:6500);return()=>clearTimeout(timer)},[onFinish,reduced]);
 return <motion.div className="revelation" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.208}}>
 <motion.div className="starfield" initial={{opacity:0}} animate={{opacity:mode==='gaming'?.6:.25}} transition={{duration:1.04}}/>
 <motion.div className="orb-stage" initial={{opacity:1,scale:1}} animate={reduced?{opacity:0}:{opacity:[1,1,1,0],scale:1}} transition={{duration:5.408,times:[0,.64,.81,1],ease:'easeInOut'}}>
 <svg className="orb" viewBox="-260 -230 520 460" aria-hidden="true"><defs>
 <clipPath id="planet-clip"><circle r="170"/></clipPath>
 <radialGradient id="eclipse-shade" cx=".68" cy=".28" r=".95"><stop stopColor="#020407" stopOpacity=".99"/><stop offset=".62" stopColor="#020407" stopOpacity=".94"/><stop offset="1" stopColor="#030609" stopOpacity=".83"/></radialGradient>
 <filter id="rim-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3"/></filter>
 </defs>
 <image className="original-moon" href="/assets/frame-2.webp" x="-263" y="-242" width="529" height="417" clipPath="url(#planet-clip)"/>
 <motion.circle className="eclipse-shadow" r="170" fill="url(#eclipse-shade)" initial={{opacity:0}} animate={{opacity:[0,0,.6,.97]}} transition={{duration:4.056,times:[0,.18,.7,1],ease:'easeInOut'}}/>
 <motion.circle r="170" fill="none" stroke="#e3c29f" strokeWidth=".7" initial={{opacity:0}} animate={{opacity:[0,.1,.32,.12]}} transition={{duration:4.056,times:[0,.18,.7,1],ease:'easeInOut'}}/>
 </svg></motion.div>
 <motion.svg className="geometry" viewBox="-260 -230 520 460" aria-hidden="true" initial={{opacity:0}} animate={{opacity:[0,0,.5,.5,0]}} transition={{duration:5.928,times:[0,.57,.67,.85,1]}}><circle r="157"/><circle r="108"/><path d="M-214-177 0 191 214-177ZM0-217V217M-245 0H245M-213 177 0-191 213 177Z"/></motion.svg>
 <motion.div className="logo-reveal illuminated" initial={{opacity:reduced?1:0,scale:reduced?1:.86,y:reduced?0:12}} animate={reduced?{opacity:1,scale:1,y:0}:{opacity:[0,0,1,1],scale:[.86,.86,1,1],y:[12,12,0,0]}} transition={{duration:reduced?0:6.5,times:[0,.61,.86,1],ease}}>
 <svg viewBox="-120 -110 240 230" aria-hidden="true"><defs><clipPath id="logo-clip"><path d={V}/></clipPath><linearGradient id="metal" x1="0" y1="0" x2=".55" y2="1"><stop stopColor="#fff0d3"/><stop offset=".28" stopColor="#eed2ac"/><stop offset=".58" stopColor="#b5a08c"/><stop offset="1" stopColor="#68646a"/></linearGradient><mask id="logo-sweep" maskUnits="userSpaceOnUse" x="-120" y="-110" width="240" height="230"><motion.rect x="-120" width="240" height="230" fill="white" initial={{y:reduced?-110:-340}} animate={{y:-110}} transition={{duration:reduced?0:1.3,delay:reduced?0:4.264,ease}}/></mask></defs>
 <motion.path d={V} fill="none" stroke="#e7c7a3" strokeWidth=".8" initial={{pathLength:reduced?1:0,opacity:reduced?1:0}} animate={{pathLength:1,opacity:1}} transition={{duration:reduced?0:1.248,delay:reduced?0:4.108,ease}}/>
 <g mask="url(#logo-sweep)"><path d={V} fill="url(#metal)"/><image href="/assets/mark.webp" x="-106" y="-90" width="213" height="197" clipPath="url(#logo-clip)" opacity=".26"/><path d={V} fill="none" stroke="#ead2b6" strokeWidth=".65" opacity=".7"/></g></svg>
 <motion.div className="reveal-name" initial={{opacity:reduced?1:0,letterSpacing:'.65em',y:reduced?0:10}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:0.884,delay:reduced?0:5.46,ease}}>VELUN</motion.div>
 </motion.div></motion.div>
}
function AnimationStage({mode}){
 const section=useRef(null),visible=useInView(section,{amount:.25});
 const [started,setStarted]=useState(false),[take,setTake]=useState(0),[done,setDone]=useState(false),[forcePlay,setForcePlay]=useState(false);
 const prefersReduced=useReducedMotion(),reduced=!!prefersReduced&&!forcePlay;
 const finish=useCallback(()=>setDone(true),[]);
 useEffect(()=>{if(visible)setStarted(true)},[visible]);
 useEffect(()=>{
  if(!done||!visible||reduced)return;
  const timer=setTimeout(()=>{setDone(false);setTake(t=>t+1)},1200);
  return()=>clearTimeout(timer);
 },[done,visible,reduced]);
 return <section ref={section} className={'hero animation-stage '+mode} data-play={reduced?'automatic':'enabled'} aria-label="Animación del logo Velun">
 <div className="ambient"/>{started&&<AnimatePresence mode="wait"><Eclipse key={take} mode={mode} onFinish={finish} reduced={reduced}/></AnimatePresence>}
 <div className="stage-meta"><span>{mode==='software'?'01 / SOFTWARE':'02 / GAMING'}</span><button id="replay" onClick={()=>{setForcePlay(true);setStarted(true);setTake(t=>t+1);setDone(false)}}><ReplayIcon/><span>{reduced?'Reproducir':'Repetir'}</span></button></div>
 <div className="timeline" aria-hidden="true">{started&&<motion.div key={take} initial={{width:0}} animate={{width:'100%'}} transition={{duration:reduced?0:6.5,ease:'linear'}}/>}</div><span className="sr-only" aria-live="polite">{done?'Animación finalizada.':''}</span>
 </section>
}
function ProjectCard({project,index}){
 return <motion.article className={'project-card '+project.type} initial={{opacity:0,y:34}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.7,delay:index*.09,ease}} whileHover={{y:-7}}>
 <div className="card-visual">{project.image?<img src={project.image} alt="" loading="lazy"/>:<div className="software-preview"><div className="preview-toolbar"><span/><span/><span/></div><div className="preview-sidebar"><span className="preview-monogram">{project.label}</span><i/><i/><i/></div><div className="preview-main"><span className="preview-title">{project.type==='namy'?'Tu próximo paso.':project.type==='brain'?'Todo empieza aquí.':'Una nueva perspectiva.'}</span><div className="preview-blocks"><i/><i/><i/></div><div className="preview-chart"><i/><i/><i/><i/><i/><i/><i/></div></div></div>}<span className="example-label">EJEMPLO</span></div>
 <div className="card-info"><span className="card-category">{project.category}</span><h3>{project.name}</h3><p>{project.description}</p></div>
 </motion.article>
}
const teamMembers=[
 {name:'Zahid Hernández Mejía',initials:'ZH',role:'Desarrollo de producto',description:'Ideas que se convierten en experiencias claras, útiles y fáciles de usar.',areas:['Experiencia de usuario','Productos web','Diseño de interfaces']},
 {name:'Fernando Aguilar Torres',initials:'FA',role:'Desarrollo de software',description:'Soluciones que conectan diseño y tecnología para dar forma a nuevos productos.',areas:['Aplicaciones web','Arquitectura de software','Experiencias interactivas']}
];
function TeamProfile({person,onClose}){
 const dialog=useRef(null);
 useEffect(()=>{if(person&&!dialog.current.open)dialog.current.showModal();else if(!person&&dialog.current.open)dialog.current.close()},[person]);
 return <dialog ref={dialog} className="profile-dialog" onClose={onClose} onClick={e=>{if(e.target===e.currentTarget)e.currentTarget.close()}} aria-labelledby="profile-name">
 {person&&<motion.div className="profile-content" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.25,ease}}><button className="profile-close" onClick={()=>dialog.current.close()} aria-label="Cerrar perfil"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><div className="team-monogram" aria-hidden="true">{person.initials}</div><span className="team-example">PERFIL DE EJEMPLO</span><h2 id="profile-name">{person.name}</h2><p className="profile-role">{person.role}</p><p className="profile-description">{person.description}</p><div className="profile-areas">{person.areas.map(area=><span key={area}>{area}</span>)}</div></motion.div>}
 </dialog>
}
function AboutPage(){
 const reduced=useReducedMotion(),[selectedPerson,setSelectedPerson]=useState(null);
 const enter={initial:reduced?false:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.15},transition:{duration:.8,ease}};
 return <><header><a className="brand" href="/" aria-label="Velun, inicio"><img src="/assets/mark.webp" alt="" width="32" height="30"/><span>VELUN</span></a><nav aria-label="Navegación principal"><a className="header-team" href="/#software">Software</a><a className="header-team" href="/#gaming">Gaming</a><a className="header-team current" href="/equipo/" aria-current="page">Equipo</a></nav><span className="header-note">BUILD WORLDS. SHIP IDEAS.</span></header>
 <main className="about-page">  <section className="team" id="equipo" aria-labelledby="team-title"><div className="section-top"><div><span className="eyebrow">LAS PERSONAS DETRÁS DE VELUN</span><h2 id="team-title">NUESTRO EQUIPO</h2></div></div><div className="team-grid">
 {teamMembers.map((person,index)=><motion.article className="team-card" key={person.name} initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.65,delay:index*.1,ease}}><div className="team-monogram" aria-hidden="true">{person.initials}</div><div className="team-details"><span className="team-example">PERFIL DE EJEMPLO</span><h3>{person.name}</h3><p>{person.role}</p><button className="team-profile-button" onClick={()=>setSelectedPerson(person)}>Ver perfil</button></div></motion.article>)}
 </div></section><section className="about-hero"><motion.div className="about-intro" {...enter}><span className="eyebrow">VELUN / NUESTRA HISTORIA</span><h1>Una idea.<br/>Dos órbitas.<br/><em>La misma visión.</em></h1><p>Software que resuelve.<br/>Mundos que despiertan la imaginación.</p><a className="about-story-link" href="#historia" onClick={e=>{e.preventDefault();document.querySelector('#historia').scrollIntoView({behavior:reduced?'instant':'smooth'})}}>Conoce nuestra historia <span aria-hidden="true">01 / 03</span></a></motion.div><motion.div className="about-art" initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{duration:1.4}}><img src="/assets/cover-gaming-mobile.png" alt="La identidad de Velun: una V metálica y una luna sobre un paisaje cósmico"/><span className="about-art-caption">ENTRE LO QUE IMAGINAMOS<br/>Y LO QUE CONSTRUIMOS.</span></motion.div></section>
 <section className="origin-story" id="historia" aria-labelledby="origin-title"><div className="story-index"><span className="eyebrow">EL ORIGEN</span><span className="story-coordinate">01 — 03</span></div><motion.div className="origin-opening" {...enter}><h2 id="origin-title">Todo empezó con<br/>una pregunta.</h2><p className="origin-question">¿Y si pudiéramos construir herramientas para la vida real y mundos para salir de ella?</p></motion.div>
 <div className="story-chapters"><motion.article {...enter}><span className="chapter-number">01</span><div><h3>Dos formas de crear.</h3><p>Velun nace de una inquietud compartida: convertir ideas en algo que las personas puedan usar, explorar y disfrutar. De un lado, aplicaciones que simplifican el trabajo. Del otro, videojuegos que invitan a descubrir algo nuevo.</p><p>Decidimos darles un mismo lugar. Una marca para construir con la misma atención al detalle, tanto una herramienta cotidiana como una experiencia extraordinaria.</p></div></motion.article><motion.article {...enter}><span className="chapter-number">02</span><div><h3>Un símbolo que revela.</h3><p>La luna ocupa un lugar especial en nuestra identidad. Cambia, se oculta y vuelve a aparecer. En el espacio de nuestra Vida, esa creciente representa una idea que empieza a tomar forma.</p><p>El eclipse cuenta ese proceso: una pausa, una transformación y, finalmente, una revelación. Así imaginamos cada proyecto de Velun.</p></div></motion.article><motion.article {...enter}><span className="chapter-number">03</span><div><h3>Lo que viene después.</h3><p>Queremos crear productos con una intención clara: hacer más fácil algo que hoy cuesta trabajo, o hacer posible una experiencia que todavía no existe.</p><p>El camino se construye proyecto a proyecto. Con curiosidad para explorar, criterio para decidir y cuidado para llevar cada idea hasta sus últimos detalles.</p></div></motion.article></div></section>
 <motion.section className="about-manifesto" {...enter} aria-label="Nuestra visión"><span className="eyebrow">NUESTRA FORMA DE TRABAJAR</span><p>Imaginamos con libertad.<br/>Construimos <em>con intención.</em></p><div className="manifesto-values"><span>Claridad</span><span>Curiosidad</span><span>Atención al detalle</span></div></motion.section>


 <div className="about-return"><span>DESCUBRE LO QUE ESTAMOS CONSTRUYENDO</span><div><a href="/#software">Explorar Software</a><a href="/#gaming">Explorar Gaming</a></div></div>
 <footer><span>BUILD WORLDS. SHIP IDEAS.</span><span className="footer-brand">VELUN <span>© 2026</span></span></footer></main><TeamProfile person={selectedPerson} onClose={()=>setSelectedPerson(null)}/></>
}
function App(){
 const [mode,setMode]=useState(location.hash==='#gaming'?'gaming':'software'),[selectedPerson,setSelectedPerson]=useState(null);
 const reduced=useReducedMotion(),{scrollYProgress}=useScroll();const scrollOpacity=useTransform(scrollYProgress,[0,.1],[1,0]);
 function choose(value){if(value===mode)return;setMode(value);history.replaceState(null,'',`#${value}`);window.scrollTo({top:0,behavior:'instant'})}
 useEffect(()=>{function change(){setMode(location.hash==='#gaming'?'gaming':'software')}addEventListener('hashchange',change);return()=>removeEventListener('hashchange',change)},[]);
 return <><header><a className="brand" href="#software" onClick={e=>{e.preventDefault();choose('software')}} aria-label="Velun, inicio"><img src="/assets/mark.webp" alt="" width="32" height="30"/><span>VELUN</span></a><nav aria-label="Universos de Velun">{['software','gaming'].map(value=><button key={value} className={mode===value?'active':''} aria-pressed={mode===value} onClick={()=>choose(value)}>{mode===value&&<motion.span className="nav-active" layoutId="nav-active" transition={{type:'spring',stiffness:350,damping:35}}/>}<span>{value==='software'?'Software':'Gaming'}</span></button>)}<a className="header-team" href="/equipo/">Equipo</a></nav><span className="header-note">BUILD WORLDS. SHIP IDEAS.</span></header>
 <main><section className={'cover cover-'+mode} aria-label={mode==='software'?'Velun Software':'Velun Gaming'}><AnimatePresence mode="wait"><motion.picture className="cover-image" key={mode} initial={{opacity:0,x:'-50%',scale:reduced?1:1.015}} animate={reduced?{opacity:1,x:'-50%',scale:1,filter:'brightness(1)'}:{opacity:1,x:'-50%',scale:mode==='gaming'?[1.015,1.04,1.015]:[1.015,1.028,1.015],filter:['brightness(1)','brightness(1.07)','brightness(1)']}} exit={{opacity:0}} transition={{opacity:{duration:.7},scale:{duration:20,repeat:Infinity,ease:'easeInOut'},filter:{duration:20,repeat:Infinity,ease:'easeInOut'}}}>
 <source media="(max-width: 720px)" srcSet={`/assets/cover-${mode}-mobile.png`}/><img className="cover-source" src={`/assets/${mode}.webp`} alt={mode==='software'?'Velun Software: emblema y nombre sobre un fondo orbital':'Velun Gaming: emblema y nombre frente a un paisaje lunar'}/></motion.picture></AnimatePresence>
 <motion.a className="scroll-indicator" href="#animacion" style={{opacity:scrollOpacity}} onClick={e=>{e.preventDefault();document.querySelector('#animacion').scrollIntoView({behavior:reduced?'instant':'smooth'})}} aria-label="Ver la animación de Velun"><span>EXPLORA</span><span className="scroll-track"><motion.i animate={reduced?{}:{y:[0,19,19],opacity:[0,1,0]}} transition={{duration:2,repeat:Infinity,ease:'easeInOut'}}/></span></motion.a></section>
 <div id="animacion"><AnimationStage key={mode} mode={mode}/></div>
 <section className="projects" id="proyectos" aria-labelledby="projects-title"><div className="section-top"><div><span className="eyebrow">{mode==='software'?'SOFTWARE / IDEAS QUE COBRAN FORMA':'GAMING / MUNDOS POR DESCUBRIR'}</span><h2 id="projects-title">PROYECTOS</h2></div><span className="section-count">03 <span>/ EJEMPLOS</span></span></div><AnimatePresence mode="wait"><motion.div className="project-grid" key={mode} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}}>{projects[mode].map((p,i)=><ProjectCard key={p.name} project={p} index={i}/>)}</motion.div></AnimatePresence></section>
 <footer><span>BUILD WORLDS. SHIP IDEAS.</span><span className="footer-brand">VELUN <span>© 2026</span></span></footer></main><TeamProfile person={selectedPerson} onClose={()=>setSelectedPerson(null)}/></>
}
createRoot(document.getElementById('root')).render(location.pathname.startsWith('/equipo')?<AboutPage/>:<App/>);

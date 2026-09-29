import {useState, useEffect, useCallback} from 'react'

//------------------TEMPORAL
const level = 2
const porcentaje = 10
//------------------TEMPORAL


const tabs = [
    {"id":"mapa", "label":"Mapa", "level":0},
    {"id":"explorar", "label":"Explorar", "level":0},
    {"id":"estadisticas", "label":"Estadisticas", "level":0},
    {"id":"aportar", "label":"Aportar", "level":1},
    {"id":"admin", "label":"Administracion", "level":2}
]

const MapFilters = [
    {"id":"All","filter":"Todo","range":"Puntos","number":1,"color":"#26495F"},
    {"id":"high","filter":"Alto","range":"≥60%","number":2,"color":"#B3261E"},
    {"id":"medium","filter":"Medio","range":"30-59%","number":3,"color":"#237050"},
    {"id":"low","filter":"Okey","range": "<30%","number":4,"color":"#F2A900"},
]

export default function App(){
    /* 
    const [level, setLevel] = useState([])
    */ 
    const [actualTab, setTab] = useState(tabs[0].id)
    const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark')
    const [carOn, setCarOn] = useState(() => localStorage.getItem('carOn') === 'dark')
    
    /* 
    useEffect(()=>{
        setLevel(0)
    },[])
    */
   useEffect(() => {
       document.documentElement.setAttribute('dark-theme', isDark ? 'dark' : 'light');
       localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);
    
    useEffect(() => {
        document.documentElement.setAttribute('car-on', carOn ? 'carOn' : 'notcar');
        localStorage.setItem('carOn', carOn ? 'carOn' : 'notcar');
    }, [carOn]);
    
    return (
        <>
            <header className='header'>
                <div className='header-container'>
                    <div className='title'>
                        <img src="/public/favicon.ico" width={50} alt=""/>
                        <div>
                            <h1>Proyecto Raíces</h1>
                            <p>Estado de la red vial</p>
                        </div>
                    </div>
                    <div className='login'>
                        <button id='darkMode' label='darkMode' onClick={() => setIsDark(!isDark)}>{isDark ? '🌚' : '🌝'}</button>
                        <button id='login' label='login'>Iniciar Sesión</button>
                    </div>
                </div>
                <nav className='tabs'>
                    {tabs.filter(tab => tab.level <= level).map(tab => (<button className={tab.id === actualTab ? 'tabActive':'tab'} key={tab.id} label={tab.label} onClick={()=>setTab(tab.id)}>{tab.label}</button>))}
                </nav>
            </header>  
            <main>
            {actualTab === 'mapa' && (
                <>
                <section className='mapaSection'>
                    <article className='mapaBusqueda mapaClase'>
                        <p>🔎</p>
                        <input type="text" name="busqueda" id="mapaBusqueda" placeholder='Busqueda'/>
                        <p id='mapaResultados'>0 Resultados</p>
                    </article>
                    <article className='mapaFiltros mapaClase'>
                        {MapFilters.map(f => (
                            <button className='mapBtnFilter' id={f.id} style={{ "--borde": f.color }}>
                                <p id='mapaIndicador'>{f.number}</p>
                                <div>
                                    <h4>{f.filter}</h4> 
                                    <p>{f.range}</p>
                                </div>
                            </button>
                        ))}
                    </article>
                    <article className='mapaMapa mapaClase'>
                        <h3>mapa</h3>
                    </article>
                    <article className='mapaInfo mapaClase'>
                        <div class=''>
                            <h4>Lugar</h4>
                        </div>
                        <div id='mapaImagen'>
                            <img src='https://tse3.mm.bing.net/th/id/OIP.7m8cTvaVwswtmZtFV5nhQwHaEI?w=300&h=180&c=7&r=0&o=7&pid=1.7&rm=3'/>
                        </div>
                        <div className='mapaBarraEstado'>
                            <h4>Estado de calle</h4>
                            <p id='mapaPorcentaje'>{porcentaje}%</p>
                            <div id='mapaDrawBarra'>
                                <div id='mapaBarraCentrada'>
                                    <div id='mapaBarra'></div>
                                    <div id='mapaRellenoBarra'></div>
                                    <div className='mapaLinea' id='linea1'></div>
                                    <div className='mapaLinea' id='linea2'></div>
                                    <div className='mapaLinea' id='linea3'></div>
                                    <div className='mapaLinea' id='linea4'></div>
                                </div>
                            </div>
                            <div id='mapaBarraIndicadores'>
                                <div>
                                    <p>0%</p>
                                    <p>33%</p>
                                    <p>66%</p>
                                    <p>100%</p>
                                </div>
                            </div>
                        </div>
                        <div>
                          t1
                          t2
                          t3
                        </div>
                    </article>
                </section>
                </>
            )}
            {actualTab === 'explorar' && (
                <section>
                    <h3>Explorar</h3>
                </section>
            )}
            {actualTab === 'estadisticas' && (
                <section>
                    <h3>Estadisticas</h3>
                </section>
            )}
            </main>
            <footer>
                <div className='drawContainer'>
                    <div className='draw50x50'>
                        <div id='cabina'></div>
                        <div id='ventana1'></div>
                        <div id='ventana2'></div>
                        <div id='rectangulo'></div>
                        <div id="luzDelantera"></div>
                        <div id="luzTrasera"></div>
                        <div id='ruedaTrasera'><div></div></div>
                        <div id='ruedaDelantera'><div></div></div>
                        <div id="bache"><div></div></div>
                        <div id="luces"></div>
                        <button onClick={()=>(setCarOn(!carOn))}></button>
                    </div>
                </div>
                <p>© 2026 Proyecto Raíces. Todos los derechos reservados.</p>
            </footer>
        </>
    ) 
}
import {useState, useEffect, useCallback} from 'react'

const tabs = [
    {"id":"mapa", "label":"Mapa", "level":0},
    {"id":"explorar", "label":"Explorar", "level":0},
    {"id":"estadisticas", "label":"Estadisticas", "level":0},
    {"id":"aportar", "label":"Aportar", "level":1},
    {"id":"admin", "label":"Administracion", "level":2}
]

const MapFilters = [
    {"id":"All","filter":"Todo"},
    {"id":"high","filter":"Alto"},
    {"id":"medium","filter":"Medio"},
    {"id":"low","filter":"Okey"},
]

export default function App(){
    const [level, setLevel] = useState([])
    const [actualTab, setTab] = useState(tabs[0].id)
    const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark')
    const [carOn, setCarOn] = useState(() => localStorage.getItem('carOn') === 'dark')

    useEffect(()=>{
        setLevel(0)
    },[])

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
                        <input type="text" name="busqueda" id="busqueda" placeholder='Busqueda'/>
                        <p>0 Resultados</p>
                    </article>
                    <article className='mapaFiltros mapaClase'>
                        {MapFilters.map(f => (<button className='mapBtnFilter' id={f.id}>{f.filter}</button>))}
                    </article>
                    <article className='mapaMapa mapaClase'>
                        <h3>mapa</h3>
                    </article>
                    <article className='mapaInfo mapaClase'>
                        <h3>Card</h3>
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
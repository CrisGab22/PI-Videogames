import React from "react";
import {Link} from 'react-router-dom'
import style from '../components.css/landing.module.css'
import animation from '../components.css/animation.css/landing.module.css'

export default function Landing () {
    return(
        <div className={style.body}>
            <div className={style.glass}>

                <div className={style.container}>


                <div className={style.containerContent}>
                    <div className={style.containerTitle}>
                        <div className={style.words}>
                        <h3 className={`${style.title} ${animation.spaces}`}>-</h3>
                        <h3 className={`${style.title} ${animation.titleW}`}>W</h3>
                        <h3 className={`${style.title} ${animation.titleEone}`}>e</h3>
                        <h3 className={`${style.title} ${animation.titleL}`}>l</h3>
                        <h3 className={`${style.title} ${animation.titleC}`}>c</h3>
                        <h3 className={`${style.title} ${animation.titleO}`}>o</h3>
                        <h3 className={`${style.title} ${animation.titleM}`}>m</h3>
                        <h3 className={`${style.title} ${animation.titleEtwo}`}>e</h3>
                        </div>


                        <div className={style.words}>
                        <h3 className={`${style.title} ${animation.spaces}`}>-</h3>
                        <h3 className={`${style.title} ${animation.titleT}`}>t</h3>
                        <h3 className={`${style.title} ${animation.titleOtwo}`}>o</h3>
                        <h3 className={`${style.title} ${animation.spaces}`}>-</h3>
                        </div>
                        
                        <div className={style.words}>
                        <h3 className={`${style.title} ${animation.titleMtwo}`}>m</h3>
                        <h3 className={`${style.title} ${animation.titleY}`}>y</h3>
                        <h3 className={`${style.title} ${animation.spaces}`}>-</h3>
                        </div>


                        <div className={style.words}>
                        <h3 className={`${style.title} ${animation.titleP}`}>P</h3>
                        <h3 className={`${style.title} ${animation.titleR}`}>r</h3>
                        <h3 className={`${style.title} ${animation.titleOthree}`}>o</h3>
                        <h3 className={`${style.title} ${animation.titleJ}`}>j</h3>
                        <h3 className={`${style.title} ${animation.titleEthree}`}>e</h3>
                        <h3 className={`${style.title} ${animation.titleCtwo}`}>c</h3>
                        <h3 className={`${style.title} ${animation.titleTtwo}`}>t</h3>
                        </div>


                    </div>
                    <Link to={'/home'} className={style.link}>
                        <div className={animation.containerButton}>
                            <button className={`${style.button} ${animation.button}`}>Start</button>
                        </div>  
                    </Link>
                </div>
                <footer className={`${style.containerFooter} ${animation.logos}`}>
                    <div className={style.footer}>

                    <a href="https://github.com/CrisGab22">
                        <img src="https://www.svgrepo.com/show/332084/github.svg" alt="GitHub" className={style.logo}/>
                    </a>
                    <a href="https://www.linkedin.com/in/cristhian-vera-rivas-a08598186/" >
                        <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="Linkedin" className={style.logo} />
                    </a>
                    </div>
                </footer>
                </div>
            </div>
        </div>
    )
}
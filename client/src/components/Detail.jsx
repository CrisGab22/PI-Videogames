import React from "react";
import {getGameDetails, resetGameDetails} from '../redux/actions'
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import style from '../components.css/details.module.css'
import {Link} from 'react-router-dom'

function VideogameDetails() {
    let details = useSelector(state=> state.details)
    const dispatch = useDispatch()
    const params = useParams()
    
    useEffect(() =>{
        dispatch(getGameDetails(params.id));
        return () => dispatch(resetGameDetails())
    // eslint-disable-next-line
    },[dispatch])
    
    return(
    <div className={style.body}>
		<div className={style.glass}>
			{details?.name && details?.createdInDb===false?
				<div className={style.containerPrincipal}>
					<Link to={'/home'}>
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/1024px-Back_Arrow.svg.png" alt="back"  className={style.back}/>
					</Link>
					<div className={`${style.name}`}>
						<h2>{details.name}</h2>
					</div>

					{/* {details.alternative_names&&details.alternative_names[0]?

						<div className={'alternative_names'}>
							{details.alternative_names.map(name =>{
								return <label className={`altName`} key={name}>{name}</label>}
								)}
						</div>
						: null
					}  /// casi nunca se está habilitado o lo si está es con nombres muy similares
					*/}
					<img className={style.img} src={`${details.img}`} alt="" />
					<h4 className={style.descriptionTitle}>Description:</h4>

					

					{details.description[0] === '<'?
					<div className={style.containerDescription}>
					<div className={style.description} dangerouslySetInnerHTML={{__html: details.description}} />
						</div>
						:<span className={style.description}>{details.description}</span>
					}


					<div className={style.ratingXReleased}>
					{details.developers[0]?
						<div className={style.developer}>
							<h4>Developers:</h4>
							{details.developers.map(developer =>{
								return <label className={style.releasedTxt}key={developer}>{developer}</label>
							})}
						</div>
						: <></>
					}


					{details.metacritic!== null?
						<div className={style.released}>
							<h4>Metacritic:</h4>
							<label className={style.releasedTxt}>{details.metacritic}</label>
						</div>
						: <></>
					}
					</div>

					<div className={style.ratingXReleased}>
						<div className={style.rating}>
							<h4>Released:</h4>
								<label className={style.releasedTxt}>{details.released}</label>
						</div>
						<div className={style.released}>
							<h4>Rating:</h4>
							<label className={style.releasedTxt}>{details.rating}</label>
						</div>
					</div>


					<div className={style.containerStores}>
						<div className={style.containerStore}>
						<h4>Genres:</h4>

							{details.genres.map(genre =>{
								return <label className={style.store} key={genre}>{genre}</label>
							})}
						</div>
					</div>
					

					<div className={style.containerStore}>
					<h4>Platforms:</h4>
					<div className={style.containerStores}>
						{details.platforms.map(platform =>{
							return <label className={style.store} key={platform}>{platform}</label>
						})}
					</div>
					</div>
		
					{details.stores[0]?
						<div className={style.containerStore}>
							<h4>Stores:</h4>
							<div className={style.containerStores}>

							{details.stores.map(store =>{
								return <label className={style.store} key={store}>{store}</label>}
								)}    
							</div>
						</div>:
						<></>
					}
				</div>
				:
				details?.name && details?.createdInDb===true?
				<div>
					<div className={`name`}>
						<h2>{details.name}</h2>
					</div>
					<div className="description">
						<p>{details.description}</p>
					</div>
					<h4>Generos:</h4>
						{details.genres.map(genre =>{
							return <label className={`genre`} key={genre.name}>{genre.name}</label>
						})}
					<h4>Released</h4>
						<label className='released'>{details.released}</label>

					<h4>rating:</h4>
						<label className={`rating`}>{details.rating}</label>
						<h4>Plataformas:</h4>
						{details.platforms.map(platform =>{
							return <label className={`platform`} key={platform}>{platform}</label>
						})}
				</div>
				:
				details?.error?
					<div className={style.fakeSpace}>
						<div className={style.error}>
							<div className={style.errorContainer}>
								<h2 className={style.errortxt}>{details.error}</h2>
								<Link to={'/home'} className={style.noUnderline}>
									<button className={style.backBtn}>Volver</button>
								</Link>
							</div>
						</div>
					</div>
				:
				<div className={style.fakeSpace}>
					<div className={style.error}>
						<img className={style.loading} src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif" alt="cargando" />
					</div>
				</div>
				
				
				}
    	</div>
	</div>
        )

        
}

export default VideogameDetails;
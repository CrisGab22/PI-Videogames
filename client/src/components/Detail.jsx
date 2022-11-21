import React from "react";
import {getGameDetails, resetGameDetails} from '../redux/actions'
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";

function VideogameDetails() {
    let details = useSelector(state=> state.details)
    const dispatch = useDispatch()
    const params = useParams()
    
    useEffect(() =>{
        dispatch(getGameDetails(params.id));
        return () => dispatch(resetGameDetails())
    },[dispatch])
    
    return(
        details?.name && details?.createdInDb===false?
            <div>
                <div className={`name`}>
                    <h2>{details.name}</h2>
                </div>

                {details.alternative_names&&details.alternative_names[0]?

                    <div className={'alternative_names'}>
                        {details.alternative_names.map(name =>{
                            return <label className={`altName`} key={name}>{name}</label>}
                        )}
                    </div>
                    : null
                }
                {/* <img src={`${details.img}`} alt="" /> */}
                {details.description[0] === '<'?
                    <div dangerouslySetInnerHTML={{__html: details.description}} />
                    :<></>
                }
                {details.developers[0]?
                    <div>
                        <h4>desarrolladores:</h4>
                        {details.developers.map(developer =>{
                            return <label className={`developer`} key={developer}>{developer}</label>
                        })}
                    </div>
                    : <></>
                }
                <h4>Generos:</h4>
                    {details.genres.map(genre =>{
                        return <label className={`genre`} key={genre}>{genre}</label>
                    })}
                {details.metacritic!== null?
                    <div>
                        <h4>Metacritic:</h4>
                        <label className={`metacritic`}>{details.metacritic}</label>
                    </div>
                    : <></>
                }

                <h4>Released</h4>
                    <label className='released'>{details.released}</label>

                <h4>rating:</h4>
                    <label className={`rating`}>{details.rating}</label>

                <h4>Plataformas:</h4>
                    {details.platforms.map(platform =>{
                        return <label className={`platform`} key={platform}>{platform}</label>
                    })}
    
                {details.stores[0]?
                    <div>
                        <h4>Stores:</h4>
                        {details.stores.map(store =>{
                            return <label className={`store`} key={store}>{store}</label>}
                        )}    
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
            <h2>{details.error}</h2>
        :
        <img src="https://tradinglatam.com/wp-content/uploads/2019/04/loading-gif-png-4.gif" alt="cargando" />
        )

        
}

export default VideogameDetails;
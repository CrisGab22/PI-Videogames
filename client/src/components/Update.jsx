import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getGameDetails, resetGameDetails, getAllGenres, updateVideogame} from '../redux/actions'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from '../components.css/update.module.css'


export default function Update(){

    const dispatch = useDispatch()
    const params = useParams()
    
    let details = useSelector(state=> state.details)
    let genres = useSelector(state=> state.genres)
    
    useEffect(() =>{
        dispatch(getAllGenres())
        dispatch(getGameDetails(params.id));
        return () => dispatch(resetGameDetails())
    // eslint-disable-next-line
    },[dispatch])
    
    let [form, setForm]=useState('')
    let [success,setSuccess] = useState(false)

    let [error, setError] = useState({
        name: '',
        description: '',
        platforms: '',
        genres:'',
        released:'',
    })
    let [warnings, setWarnings] = useState({
        rating:'',
        img:'',
    }    
    )
    const controller ={
        // eslint-disable-next-line 
        description: /[{}<>=@\/\[\]]/g, //verifica que no tenga simbolos 
        // eslint-disable-next-line 
        name: /[{}<>=@\/\[\]]/g, //verifica que no tenga simbolos 
        released: (date) =>date.split('-')[0]<1970 ||date.split('-')[0]> 2025?false:true,
        rating: (rating) => (rating<=5&&rating >=0)? true:false,
        img:/(http(s?):\/\/)/g,
    }
    
    function handleSubmit(e){
        
        e.preventDefault()
    }

    function handlerSuccess(){
        let infoSaved={
            name: form.name? form.name : details.name,
            description: form.description? form.description : details.description,
            img: form.img? form.img: details.img,
            released: form.released? form.released : details.released,
            rating: form.rating? form.rating : details.rating,
            platforms: form.platforms? form.platforms : details.platforms,
            localGenres: form.genres? form.genres : details.genres
        }
        console.log(infoSaved)
        dispatch(updateVideogame(infoSaved,params))
        setSuccess(!success)
    }

    function handleName(e){
        if(e.target.value[e.target.value.length-2] === " " && e.target.value[e.target.value.length -1] === " "){
            return setForm({...form})
        }
        setForm({...form, name: e.target.value})
        !controller.name.test(e.target.value)? setError({...error, name: ''}) : setError({...error, name:'The name contains an invalid character'})
        
        if(e.target.value.length<4 || e.target.value.length>50){
            setError({...error, name:'Must be between 3 and 50 characters in length'})
        }
    }

    function handleDescription(e){
        if(e.target.value[e.target.value.length-2] === " " && e.target.value[e.target.value.length -1] === " "){
            return setForm({...form})
        }
        setForm({...form,description: e.target.value})
        controller.description.test(e.target.value)?setError({...error, description:'The description contains an invalid character'}): setError({...error, description: ''}) 
            
        if(e.target.value.length<30 || e.target.value.length>1020){
            setError({...error, description:'Must be between 30 and 1000 characters in length'})
        }
}
    
    
    function handleReleasd(e){
        setForm({...form, released: e.target.value})
        controller.released(e.target.value)? setError({...error, released:''}): setError({...error, released: 'The year must be between 1970 and 2025'})
    }

    function handleRating(e){
        e.target.value.length>4? 
        setForm({...form, rating: e.target.value.slice(0,4)}):
        setForm({...form, rating: e.target.value})
        controller.rating(e.target.value)? setWarnings({...warnings, rating:''}): setWarnings({...warnings, rating: 'The rating must be a number between 0 and 5'})
    }
    function handleImg(e){
        setForm({...form, img: e.target.value})
        controller.img.test(e.target.value)? setWarnings({...warnings, img:''}): setWarnings({...warnings, img: 'The Url is not valid'})
        if(e.target.value.length===0) setWarnings({...warnings,img:''})
    }

    function handlePlatforms(e){
        console.log(e.target.value)
        let platform = e.target.value.split(',')
        platform[1] = Number(platform[1])
        if(form.platforms.length>=1){
            let noRepeat =  form.platforms.filter(el => el[0] === platform[0])
            noRepeat.length===0?setForm({...form,platforms:[...form.platforms,platform]}):setForm({...form})
        }
        
        if(form.platforms.length===0){
        setForm({...form,platforms:[...form.platforms,platform]})
        }        
    }

    function handlePlatformsAux(e){
        let platform = e.target.value.split(',')
        platform[1] = Number(platform[1])
        if(details.platforms.length>=1){
            let noRepeat =  details.platforms.filter(el => el[0] === platform[0])
            noRepeat.length===0?setForm({...form,platforms:[...details.platforms,platform]}):setForm({...form})
        }
        
        if(details.platforms.length===0){
        setForm({...form,platforms:[...details.form,platform]})
        }

        details.platforms.length<2? setError({...error,platforms:'You must select at least 2 platforms'}) : setError({...error,platforms:''}) 

    }

    function handlePlatformsList(el){
        setForm({
            ...form,
            platforms: form.platforms.filter(platform=> platform[0] !== el[0])
        })

    }

    function handlePlatformsListAux(el){
        setForm({
            ...form,
            platforms: details.platforms.filter(platform=> platform[0] !== el[0])
        })

        
    }

    function handleGenres(e){
        if(form.genres.length>=1){
            let noRepeat =  form.genres.filter(el => el === e.target.value)
            noRepeat.length===0?setForm({...form,genres:[...form.genres,e.target.value]}):setForm({...form})
        }
        if(form.genres.length===0){
        setForm({...form,genres:[...form.genres,e.target.value]})
        }      
    }

    function handleGenresAux(e){
        if(details.genres.length>=1){
            let noRepeat =  details.genres.filter(el => el === e.target.value)
            noRepeat.length===0?setForm({...form,genres:[...details.genres,e.target.value]}):setForm({...form})
        }
        if(details.genres.length===0){
        setForm({...form,genres:[...details.genres,e.target.value]})
        }
    }

    function handleGenresList(el){
        setForm({
            ...form,
            genres: form.genres.filter(genre=> genre !== el)
        })

    }

    function handleGenresListAux(el){
        setForm({
            ...form,
            genres: details.genres.filter(genre=> genre !== el)
        })

        
    }
    
    
    
    
    let platforms = [
        ["PC",4],["PlayStation 5",187],["PlayStation 4",18],["Xbox One",1],["Xbox Series S/X",186],["Nintendo Switch",7],["iOS",3],["Android",21],["Nintendo 3DS",8],["Nintendo DS",9],["Nintendo DSi",13],["macOS",5],["Linux",6],["Xbox 360",14],["Xbox",80],["PlayStation 3",16],["PlayStation 2",15],["PlayStation",27],["PS Vita",19],["PSP",17],["Wii U",10],["Wii",11],["GameCube",105],["Nintendo 64",83],["Game Boy Advance",24],["Game Boy Color",43],["Game Boy",26],["SNES",79],["NES", 49 ],
    ]

    return(
        success===false?
            details.name?
            <div className={style.body}>
                <div className={style.glass}>
                    <div className={style.container}>
                        <div className={style.form}>
                            <Link  to={`/home/videogame/${params.id}`}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/1024px-Back_Arrow.svg.png" alt="back"  className={style.back}/>
                            </Link>
                            <h2 className={style.title}>Update Game</h2>
                            <form onSubmit={(e)=>handleSubmit(e)}>
                                <label className={style.name}>Name</label>
                                <input  type="text" className={style.inputText} placeholder={'Insert the name of your game*'} onChange={(e) => handleName(e)} value={form.name||details.name}/> 
                                <label className={style.error}>{error.name}</label><br/>

                                <label className={style.name} >Descripton</label> 
                                <textarea className={style.inputTextArea} placeholder={'Insert the description of your game*'} onChange={(e) => handleDescription(e)} value={form.description||details.description}/> 
                                <label className={style.error}>{error.description}</label><br/>
                                <div className={`${style.containerInput} ${style.containerInputRating} `}>
                                    <label className={style.released}>Release Date*</label>
                                    <input type="date" className={style.inputReleased} onChange={(e) => handleReleasd(e)} value={form.released || details.released}/> <br />
                                    <label className={style.error}>{error.released}</label><br/>
                                </div>

                                <div className={`${style.containerInput} ${style.containerInputRating} `}>
                                    <label className={style.rating}>Rating</label>
                                    <input placeholder="0.0" type="number" max={5} min={0} step={0.1}className={style.inputRating} onChange={(e) => handleRating(e)} value={form.rating||details.rating}/> <br />
                                    <label className={style.errorRating}>{warnings.rating}</label><br/>
                                </div>

                                <label className={style.name}>Image URL</label>
                                <input type="text" className={style.inputText} placeholder={'Paste the url of your image'}  onChange={(e) => handleImg(e)} value={form.img||details.img}/> 
                                <label className={style.error}>{warnings.img}</label><br/>

                                <div>
                                    <div className={style.containerInput}>
                                        <label className={style.rating}>Platforms*</label>
                                        <select className={style.inputPlatforms} onChange={(e) => form.platforms?handlePlatforms(e): handlePlatformsAux(e) } value={form.platforms}>
                                            <option value={''}  hidden>Choose a Platform</option>
                                            {platforms?.map((platform) =>{
                                                return(
                                                    <option value={platform} key={platform[1]}>{platform[0]}</option>
                                                    )
                                                })}
                                        </select>
                                                
                                        {!form.platforms?       
                                        <div className={style.containerChilds}>
                                            {details.platforms !== '' && details.platforms.length>=1?
                                                details.platforms.map(el=> 
                                                <div key={el+'div'} className={style.separator }>
                                                    <div className={style.Childs}>
                                                        <label className={style.textChilds} key={el}>{Array.isArray(el)?el[0]:el}</label>
                                                        <button className={style.buttonChilds} onClick={() => form.platforms?handlePlatformsList(el) : handlePlatformsListAux(el)} key={el+'button'}>x</button>
                                                    </div>
                                                </div>)
                                        
                                                :null
                                            }
                                        </div>
                                        
                                        :
                                        <div className={style.containerChilds}>
                                            {form.platforms !== '' && form.platforms.length>=1?
                                                form.platforms.map(el=> 
                                                <div key={el+'div'} className={style.separator }>
                                                    <div className={style.Childs}>
                                                        <label className={style.textChilds} key={el}>{Array.isArray(el)?el[0]:el}</label>
                                                        <button className={style.buttonChilds} onClick={() => form.platforms?handlePlatformsList(el) : handlePlatformsListAux(el)} key={el+'button'}>x</button>
                                                    </div>
                                                </div>)
                                        
                                                :null
                                            }
                                        </div>}

                                        <label className={style.error}>
                                        {
                                        form.platforms?
                                        form.platforms.length<2? 'You must select at least 2 platforms' : '' 
                                        :
                                        details.platforms.length<2? 'You must select at least 2 platforms': '' 
                                        }    
                                        </label><br/>
                                    </div>

                                    <div>
                                    <div className={style.containerInput}>
                                        <label className={style.rating}>Genres*</label>
                                        <select className={style.inputPlatforms} onChange={(e) => form.genres?handleGenres(e): handleGenresAux(e) } value={form.genres}>
                                            <option hidden>Choose a Genre</option>
                                            {genres?.map(genre =>{
                                                return(
                                                    <option value={genre.name} key={genre.id}>{genre.name}</option>
                                                    )
                                                })}
                                        </select>
                                                
                                        {!form.genres?       
                                        <div className={style.containerChilds}>
                                            {details.genres !== '' && details.genres.length>=1?
                                                details.genres.map(el=> 
                                                <div key={el+'div'} className={style.separator }>
                                                    <div className={style.Childs}>
                                                        <label className={style.textChilds} key={el}>{Array.isArray(el)?el[0]:el}</label>
                                                        <button className={style.buttonChilds} onClick={() => form.genres?handleGenresList(el) : handleGenresListAux(el)} key={el+'button'}>x</button>
                                                    </div>
                                                </div>)
                                        
                                                :null
                                            }
                                        </div>
                                        
                                        :
                                        <div className={style.containerChilds}>
                                            {form.genres !== '' && form.genres.length>=1?
                                                form.genres.map(el=> 
                                                <div key={el+'div'} className={style.separator }>
                                                    <div className={style.Childs}>
                                                        <label className={style.textChilds} key={el}>{Array.isArray(el)?el[0]:el}</label>
                                                        <button className={style.buttonChilds} onClick={() => form.genres?handleGenresList(el) : handleGenresListAux(el)} key={el+'button'}>x</button>
                                                    </div>
                                                </div>)
                                        
                                                :null
                                            }
                                        </div>}

                                        <label className={style.error}>
                                        {
                                        form.genres?
                                        form.genres.length<2? 'You must select at least 2 platforms' : '' 
                                        :
                                        details.platforms.length<2? 'You must select at least 2 platforms': '' 
                                        }    
                                        </label><br/>
                                    </div>
                                    {Object.values(error).reduce((acumulador,valorActual)=> acumulador+valorActual.length,0)===0&& Object.values(warnings).reduce((acumulador,valorActual)=> acumulador+valorActual.length,0)===0?
                                <div className={style.containerButton}>
                                <button type="submit" className={style.button}
                                onClick={() => handlerSuccess()}
                                >Save</button>
                                </div>
                                
                                :    <div className={style.containerButton}>
                                <button  className={style.buttonDisable}
                                disabled
                                >Save</button>
                                </div>
                            }
                                    </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            :
            <></>
        :
        <div className={style.body}>
        <div className={style.glass}>
            <div className={style.containerSuccess}>
                <h2 className={style.textSuccess}>Your game has been Update</h2>
                <div className={style.return}>
                    <Link to={`/home/videogame/${params.id}`}>
                        <button className={style.backBtn}>Back</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>

    )
}
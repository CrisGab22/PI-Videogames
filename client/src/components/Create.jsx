import React from "react";
import style from '../components.css/create.module.css'
import {useSelector,useDispatch} from 'react-redux'
import { getAllGenres, postVideogame} from "../redux/actions";
import { useEffect } from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'

function Create() {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllGenres())
    },[dispatch])

    let genres= useSelector(state => state.genres) 

    let [success,setSuccess] = useState(false)

    let [form, setForm]=useState({
        name:'',
        description: '',
        released: '',
        rating:'',
        img:'',
        platforms: '',
        genres:'',
    })

    let [error, setError] = useState({
        name: '',
        description: ' ',
        platforms: ' ',
        genres:' ',
        released:' ',
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
        platforms: (e) => {let a = [...form.platforms, e.target.value]
            return a.length>1? true:false
        },
        img:/(http(s?):\/\/)/g,
        genres: (e) => {let a = [...form.genres, e.target.value]
            return a.length>1? true:false
        }
    }
    
    function handleSubmit(e){
        e.preventDefault()
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
    console.log(form.rating)

    function handlePlatforms(e){
        let platform = e.target.value.split(',')
        platform[1] = Number(platform[1])
        if(form.platforms.length>=1){
            let noRepeat =  form.platforms.filter(el => el[0] === platform[0])
            noRepeat.length===0?setForm({...form,platforms:[...form.platforms,platform]}):setForm({...form})

        }
        if(form.platforms.length===0){
        setForm({...form,platforms:[...form.platforms,platform]})
        }
    controller.platforms(e)? setError({...error, platforms:''}): setError({...error, platforms: 'You must select at least 2 platforms'})
    }
    function handleGenres(e){
        if(form.genres.length>=1){
            let noRepeat =  form.genres.filter(el => el === e.target.value)
            noRepeat.length===0?setForm({...form,genres:[...form.genres,e.target.value]}):setForm({...form})
        }
        if(form.genres.length===0){
        setForm({...form,genres:[...form.genres,e.target.value]})
        }
        controller.genres(e)? setError({...error, genres:''}): setError({...error, genres: 'You must select at least 2 genres'})
    }
    
    let platforms = [
        ["PC",4],["PlayStation 5",187],["PlayStation 4",18],["Xbox One",1],["Xbox Series S/X",186],["Nintendo Switch",7],["iOS",3],["Android",21],["Nintendo 3DS",8],["Nintendo DS",9],["Nintendo DSi",13],["macOS",5],["Linux",6],["Xbox 360",14],["Xbox",80],["PlayStation 3",16],["PlayStation 2",15],["PlayStation",27],["PS Vita",19],["PSP",17],["Wii U",10],["Wii",11],["GameCube",105],["Nintendo 64",83],["Game Boy Advance",24],["Game Boy Color",43],["Game Boy",26],["SNES",79],["NES", 49 ],
    ]

    function handleGenresList(el){
        setForm({
            ...form,
            genres: form.genres.filter(genre=> genre !== el)
        })
    }

    function handlePlatformsList(el){
        setForm({
            ...form,
            platforms: form.platforms.filter(platform=> platform[0] !== el)
        })
    }

    function handlerSuccess(){
        dispatch(postVideogame(form))
        setSuccess(true)
    }
    console.log(form)
    return(
        success===false?
        <div className={style.body}>
            <div className={style.glass}>
                <div className={style.container}>
                    <div className={style.form}>
                        <Link to={'/home'}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/1024px-Back_Arrow.svg.png" alt="back"  className={style.back}/>
                        </Link>
                        <h2 className={style.title}>Create Game</h2>
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            <label className={style.name}>Name</label>
                            <input  type="text" className={style.inputText} placeholder={'Insert the name of your game*'} onChange={(e) => handleName(e)} value={form.name}/> 
                            <label className={style.error}>{error.name}</label><br/>

                            <label className={style.name} >Descripton</label> 
                            <textarea className={style.inputTextArea} placeholder={'Insert the description of your game*'} onChange={(e) => handleDescription(e)} value={form.description}/> 
                            <label className={style.error}>{error.description}</label><br/>

                                <div className={`${style.containerInput} ${style.containerInputRating} `}>
                                    <label className={style.released}>Release Date*</label>
                                    <input type="date" className={style.inputReleased} onChange={(e) => handleReleasd(e)} value={form.released}/> <br />
                                    <label className={style.error}>{error.released}</label><br/>
                                </div>
                                <div className={`${style.containerInput} ${style.containerInputRating} `}>
                                    <label className={style.rating}>Rating</label>
                                    <input placeholder="0.0" type="number" max={5} min={0} step={0.1}className={style.inputRating} onChange={(e) => handleRating(e)} value={form.rating}/> <br />
                                    <label className={style.errorRating}>{warnings.rating}</label><br/>
                                </div>


                                <label className={style.name}>Image URL</label>
                                <input type="text" className={style.inputText} placeholder={'Paste the url of your image'}  onChange={(e) => handleImg(e)} value={form.img}/> 
                                <label className={style.error}>{warnings.img}</label><br/>

                                <div>
                                    <div className={style.containerInput}>
                                        <label className={style.rating}>Platforms*</label>
                                        <select className={style.inputPlatforms} onChange={(e) =>{handlePlatforms(e) }} value={form.platforms}>
                                            <option value={''}  hidden>Choose a Platform</option>
                                            {platforms?.map((platform) =>{
                                                return(
                                                    <option value={platform} key={platform[1]}>{platform[0]}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className={style.containerChilds}>
                                    {form.platforms !== '' && form.platforms.length>=1?
                                        form.platforms.map(el=> <div key={el+'div'} className={style.separator }>
                                            <div className={style.Childs}>
                                                <label className={style.textChilds} key={el}>{el[0]}</label>
                                                <button className={style.buttonChilds} onClick={() => handlePlatformsList(el[0])} key={el+'button'}>x</button>
                                            </div>
                                        </div>)
                                
                                        :null
                                    }
                                    </div>
                                    <label className={style.error}>{error.platforms}</label><br/>
                                </div>

                                <div>
                                    <div className={style.containerInput}>

                                    <label className={style.rating}>Genres*</label>
                                        <select className={style.inputPlatforms} onChange={(e) =>{handleGenres(e) }} value={form.genres}>
                                            <option hidden>Choose a Genre</option>
                                            {genres?.map(genre =>{
                                                return(
                                                    <option value={genre.name} key={genre.id}>{genre.name}</option>
                                                    )
                                                })}
                                        </select>
                                    </div>
                                    <div className={style.containerChilds}>

                                    {form.genres !== '' && form.genres.length>=1?
                                        form.genres.map(el=> <div key={el+'div'} className={style.separator}>
                                            <div className={style.Childs}>
                                                <label className={style.textChilds} key={el}>{el}</label>
                                                <button className={style.buttonChilds} onClick={() => handleGenresList(el)} key={el+'button'}>x</button>
                                            </div>
                                        </div>)
                                        
                                        :null
                                    }
                                    </div >
                                    <label className={style.error}>{error.genres}</label>
                                </div>
                            
                            {Object.values(error).reduce((acumulador,valorActual)=> acumulador+valorActual.length,0)===0&& Object.values(warnings).reduce((acumulador,valorActual)=> acumulador+valorActual.length,0)===0?
                            <div className={style.containerButton}>
                            <button type="submit" className={style.button}
                            onClick={() => handlerSuccess()}
                            >Add Game</button>
                            </div>
                            
                            :    <div className={style.containerButton}>
                            <button  className={style.buttonDisable}
                            disabled
                            >Add Game</button>
                            </div>
                        }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    : 
    <div className={style.body}>
        <div className={style.glass}>
            <div className={style.containerSuccess}>
                <h2 className={style.textSuccess}>Your game has been added</h2>
                <div className={style.return}>
                    <Link to={'/home'}>
                        <button className={style.backBtn}>Back</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Create;
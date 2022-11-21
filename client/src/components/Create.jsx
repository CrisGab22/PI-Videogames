import React from "react";
import style from '../components.css/create.module.css'
import {useSelector,useDispatch} from 'react-redux'
import { getAllGenres, postVideogame} from "../redux/actions";
import { useEffect } from "react";
import { useState } from "react";

function Create() {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllGenres())
    },[dispatch])

    let genres= useSelector(state => state.genres) 

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
        name: ' ',
        description: ' ',
        released:' ',
        rating:' ',
        img:' ',
        platforms: ' ',
        genres:' ',
    })

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
        !controller.name.test(e.target.value)? setError({...error, name: ''}) : setError({...error, name:'El nombre contiene un caracter no válido'})
        
        if(e.target.value.length<4 || e.target.value.length>40){
            setError({...error, name:'Debe tener una longitud de entre 3 y 40 caracteres'})
        }
    }

    function handleDescription(e){
        if(e.target.value[e.target.value.length-2] === " " && e.target.value[e.target.value.length -1] === " "){
            return setForm({...form})
        }
        setForm({...form,description: e.target.value})
        controller.description.test(e.target.value)?setError({...error, description:'Existe un carácter inválido dentro de este campo'}): setError({...error, description: ''}) 
            
        if(e.target.value.length<30 || e.target.value.length>1200){
            setError({...error, description:'Debe tener una longitud de entre 30 y 1200 caracteres'})
        }
}
    
    
    function handleReleasd(e){
        setForm({...form, released: e.target.value})
        controller.released(e.target.value)? setError({...error, released:''}): setError({...error, released: 'El año debe ser uno entre 1970 y 2025'})
    }

    function handleRating(e){
        e.target.value.length>4? 
        setForm({...form, rating: e.target.value.slice(0,4)}):
        setForm({...form, rating: e.target.value})
        controller.rating(e.target.value)? setError({...error, rating:''}): setError({...error, rating: 'El rating debe ser un puntaje de entre 5 y 0'})
    }
    function handleImg(e){
        setForm({...form, img: e.target.value})
        controller.img.test(e.target.value)? setError({...error, img:''}): setError({...error, img: 'la Url no es válida'})
    }

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
    controller.platforms(e)? setError({...error, platforms:''}): setError({...error, platforms: 'Debe seleccionar al menos 2 pplataformas'})
    }
    function handleGenres(e){
        if(form.genres.length>=1){
            let noRepeat =  form.genres.filter(el => el === e.target.value)
            noRepeat.length===0?setForm({...form,genres:[...form.genres,e.target.value]}):setForm({...form})
        }
        if(form.genres.length===0){
        setForm({...form,genres:[...form.genres,e.target.value]})
        }
        controller.genres(e)? setError({...error, genres:''}): setError({...error, genres: 'Debe seleccionar al menos 2 géneros'})
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

    return(
        <div className={style.container}>
        <h2 className={style.title}>Crea tu propio juego</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <label>Nombre del juego*</label>
            <input  type="text" className={style.input} onChange={(e) => handleName(e)} value={form.name}/> <br />
            <label className={style.error}>{error.name}</label><br/>

            <label>Descripción*</label> 
            <textarea className={style.input} onChange={(e) => handleDescription(e)} value={form.description}/> <br />
            <label className={style.error}>{error.description}</label><br/>


            <label>Fecha de lanzamiento*</label>
            <input type="date" className={style.input} onChange={(e) => handleReleasd(e)} value={form.released}/> <br />
            <label className={style.error}>{error.released}</label><br/>


            <label>Rating</label>
            <input type="number" max={5} min={0} step={0.1}className={style.input} onChange={(e) => handleRating(e)} value={form.rating}/> <br />
            <label className={style.error}>{error.rating}</label><br/>


            <label>URL imagen</label>
            <input type="text" className={style.input}  onChange={(e) => handleImg(e)} value={form.img}/> <br />
            <label className={style.error}>{error.img}</label><br/>

            <label>Plataformas*</label>
            <select className={style.input} onChange={(e) =>{handlePlatforms(e) }} value={form.platforms}>
                <option value={''} hidden>Elige una plataforma</option>
                {platforms?.map((platform) =>{
                    return(
                        <option value={platform} key={platform[1]}>{platform[0]}</option>
                    )
                })}
            </select>
            {form.platforms !== '' && form.platforms.length>=1?
                form.platforms.map(el=> <div key={el+'div'}>
                    <label key={el}>{el[0]}</label>
                    <button onClick={() => handlePlatformsList(el[0])} key={el+'button'}>X</button>
                </div>)
                
                :null
            }
            <label className={style.error}>{error.platforms}</label><br/>

            <label>Géneros*</label>
            <select className={style.input} onChange={(e) =>{handleGenres(e) }} value={form.genres}>
                <option hidden>Elige un género</option>
                {genres?.map(genre =>{
                    return(
                        <option value={genre.name} key={genre.id}>{genre.name}</option>
                    )
                })}
            </select>
            {form.genres !== '' && form.genres.length>=1?
                form.genres.map(el=> <div key={el+'div'}>
                    <label key={el}>{el}</label>
                    <button onClick={() => handleGenresList(el)} key={el+'button'}>X</button>
                </div>)
                
                :null
            }
            <label className={style.error}>{error.genres}</label><br/>
            
            <button type="submit" className={`${style.button}
            ${Object.values(error).reduce((acumulador,valorActual)=> acumulador+valorActual.length,0)===0? style.buttonOn: style.buttonOff}`
            }
            onClick={() => dispatch(postVideogame(form))}
            >Disponible</button>
        </form>
        </div>
    )
}

export default Create;
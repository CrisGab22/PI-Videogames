import React from "react";
import style from "../components.css/delete.module.css";
import {useState} from 'react';
import {useDispatch} from 'react-redux'
import  {deleteGame}  from '../redux/actions'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Delete(){
    const dispatch = useDispatch()
    const params = useParams()
    let [success, setSuccess] = useState(false)

    function handlerDelete(){
        dispatch(deleteGame(params))
        setSuccess(!success)
    }
return(
    success === false?
        <div className={style.body}>
            <div className={style.glass}>
                <div className={style.containerWarning}>
                    <h2 className={style.title}>Are you sure?</h2>
                    <div className={style.containerButtons}>
                        <Link to={`/home/videogame/${params.id}`}>
                            <button className={style.button}>Cancel</button>
                        </Link>
                            <button onClick={() =>handlerDelete()} className={`${style.button} ${style.buttonRed}`}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    :
        <div className={style.body}>
            <div className={style.glass}>
                <div className={style.containerWarning}>
                    <h2 className={style.title}>Your game has been deleted</h2>

                    <div className={style.containerButtons}>
                        <Link to={`/home`}>
                            <button className={style.button}>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
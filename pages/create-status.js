import React, { useState } from 'react'
import auth0 from '../lib/auth0'
import axios from 'axios'

const CreateStatus = () => {
    const [dados, setDados] = useState({
        status: 'bem',
        coords:{
            lat: null,
            long: null
        }
    })
    const getMyLocation = () => {
        if ( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setDados(oldDados => {
                        return {
                            ...oldDados,
                            coords: {
                                lat: position.coords.latitude,
                                long: position.coords.longitude
                            }
                        }
                    })
                },
                positionError => {
                    console.error('Error getCurrentPosition', positionError);
                    setDados(oldDados => {
                        return {
                            ...oldDados,
                            coords: {
                                lat: 0,
                                long: 0
                            }
                        }
                    })
                }
            )
        }
    }
    const onStatusChange = evt => {
        const targetValue = evt.target.value
        setDados(oldDados => {
            return {
                ...oldDados,
                status: targetValue
            }
        })
    }
    const saveMyStatus = async () => {
        await axios.post('/api/save-status', dados)
    }
    return (
        <div>
            <h1>Informar meu Estado Hoje</h1>
            <br />
            <label className='block'>
                <input type='radio' name='status' value='bem' onChange={onStatusChange} />
                Estou bem.
            </label>
            <label className='block'>
                <input type='radio' name='status' value='gripe' onChange={onStatusChange} />
                Estou com sintomas de Gripe/Resfriado.
            </label>
            <label className='block'>
                <input type='radio' name='status' value='covid19' onChange={onStatusChange} />
                Estou com sintomas do COVID19.
            </label>
            <br />
            <h2>Sua posição atual: {JSON.stringify(dados)}</h2>
            <br />
            <button
                className='py-4 px-2 rounded bg-pink-800 font-bold shadow-xl hover:shadow block w-1/4 text-center text-white'
                onClick={getMyLocation}
            >
                Minha Posição
            </button>
            <br />
            <button
                className='py-4 px-2 rounded bg-pink-800 font-bold shadow-xl hover:shadow block w-1/4 text-center text-white'
                onClick={saveMyStatus}
            >
                Gravar Meu Estado
            </button>
        </div>
    )
}

export default CreateStatus

export async function getServerSideProps({ req, res }){
    const session = await auth0.getSession(req)

    if ( session ) {

        return {
            props: {
                isAuth: true,
                user: session.user
            }
        }
    }
    return {
        props: {
            isAuth: false,
            user: {}
        }
    }
}

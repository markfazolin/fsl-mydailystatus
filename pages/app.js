import React, { useEffect } from 'react'
import auth0 from '../lib/auth0'
import router from 'next/router'
import { db } from '../lib/db'
import { distance } from '../lib/geo'

const App = (props) => {
    useEffect(() => {
        if ( !props.isAuth ) {
            router.push('/')
        } else if ( props.forceCreate ) {
            router.push('/create-status')
        }
    })
    if ( !props.isAuth ) return null
    return (
        <div>
            <h1>Estado das Pessoas próximas de Você</h1>
            <table>
                {props.checkins.map(checkin => {
                    return (
                        <tr>
                            <td>{checkin.id === props.user.sub && 'Você' }</td>
                            <td>{checkin.status}</td>
                            <td>{JSON.stringify(checkin.coords)}</td>
                            <td>{checkin.distance} km</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default App

export async function getServerSideProps({ req, res }){
    const session = await auth0.getSession(req)

    if ( session ) {

        const today = new Date()
        const currentDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        const todayCheckin = await db
            .collection('markers')
            .doc(currentDate)
            .collection('checks')
            .doc(session.user.sub)
            .get()
        const todayData = todayCheckin.data()
        const checkinsList = []
        let forceCreate = true

        if ( todayData ) {
            forceCreate = false
            const checkins = await db
            .collection('markers')
            .doc(currentDate)
            .collection('checks')
            .near({
                center: todayData.coordinates,
                radius: 1000
            })
            .get()
            checkins.docs.forEach(doc => {
                checkinsList.push({
                    id: doc.id,
                    status: doc.data().status,
                    coords: {
                        lat: doc.data().coordinates.latitude,
                        long: doc.data().coordinates.longitude
                    },
                    distance: distance(
                        todayData.coordinates.latitude,
                        todayData.coordinates.longitude,
                        doc.data().coordinates.latitude,
                        doc.data().coordinates.longitude
                    ).toFixed(3)
                })
            })
        }

        return {
            props: {
                isAuth: true,
                user: session.user,
                forceCreate,
                checkins: checkinsList
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

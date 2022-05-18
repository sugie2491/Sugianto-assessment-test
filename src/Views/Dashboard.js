import { useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { getCustomer } from '../Libraries/Common.js'

import EventList from './Section/EventList.js'
import Navigation from './Section/Navigation.js'

const Dashboard = () => {
    let navigate = useNavigate()

    useEffect(() => {
         // check session data.. if session data is null, redirect back to login page
        const customerData = getCustomer()

        if (customerData === null) {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Navigation></Navigation>
            <EventList></EventList>
        </>
    );
}

export default Dashboard;
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { getCustomer, setCustomerSession } from '../Libraries/Common.js'

import Navigation from './Section/Navigation.js'

const CreateEvents = () => {
    const config = require('../config.json')
    let navigate = useNavigate()
    const customer = getCustomer()
    const eventName = useFormInput('')
    const proposedDate1 = useFormInput('')
    const proposedDate2 = useFormInput('')
    const proposedDate3 = useFormInput('')
    const [arrUser, setArrUser] = useState([])
    const userId = useFormInput(0)

    useEffect(() => {
        // check session data.. if session data is null, redirect back to login page
        const customerData = getCustomer()

        if (customerData === null) {
            navigate('/login')
        }

        // get all vendor data
        axios.get(config.API_MAIN_URL + 'api/get_vendor/', {}, config.AXIOS_CONFIG).then(response => {
            if (response.data.status === 'success') {
                setArrUser(response.data.data)
            }
        })
    }, [])

    const submitForm = () => {
        if (userId.value === 0 || eventName.value === '') {
            return
        }

        // generate data to send to backend
        const payload = {
            author_id: customer.value.customer.id,
            user_id: userId.value,
            name: eventName.value,
            proposed_date_1: Date.parse(proposedDate1.value) / 1000,
            proposed_date_2: Date.parse(proposedDate2.value) / 1000,
            proposed_date_3: Date.parse(proposedDate3.value) / 1000,

            author_name: customer.value.customer.name,
        }

        axios.post(config.API_MAIN_URL + 'api/create_events/', payload, config.AXIOS_CONFIG).then(response => {
            if (response.data.status === 'success') {
                navigate('/')
            }
        })
    }

    return (
        <>
            <Navigation></Navigation>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 title">Create New Events</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="label">Event Name</div>
                            <input type="text" { ...eventName } />
                        </div>

                        <div className="col-6">
                            <div className="label">Vendor</div>
                            <select { ...userId } id="user-list">
                                <option value="0">Select User</option>
                                { arrUser.map((item) => {
                                    return (
                                        <option key={ item.id } value={ item.id }>{ item.name }</option>
                                    )
                                }) }
                            </select>
                        </div>
                    </div>

                    <div className="row mt-15">
                        <div className="col-4">
                            <div className="label">Proposed Date 1</div>
                            <input type="date" { ...proposedDate1 } />
                        </div>
                        <div className="col-4">
                            <div className="label">Proposed Date 2</div>
                            <input type="date" { ...proposedDate2 } />
                        </div>
                        <div className="col-4">
                            <div className="label">Proposed Date 3</div>
                            <input type="date" { ...proposedDate3 } />
                        </div>
                    </div>

                    <div className="row mt-15">
                        <div className="col-12">
                            <button onClick={ submitForm }>Submit</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return {
        value,
        onChange: handleChange
    }
}


export default CreateEvents;
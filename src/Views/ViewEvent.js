import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCustomer } from '../Libraries/Common.js'

import Navigation from './Section/Navigation.js'

const ViewEvents = () => {
    const config = require('../config.json')
    let navigate = useNavigate()
    const params = useParams();
    const [customerType, setCustomerType] = useState('HR')
    const [eventRecord, setEventRecord] = useState({})
    const [eventStatus, setEventStatus] = useState('')
    const confirmedDate = useFormInput('')
    const remarks = useFormInput('')
    const customer = getCustomer()

    useEffect(() => {
        // check session data.. if session data is null, redirect back to login page
        if (customer === null) {
            navigate('/login')
        }
        else {
            setCustomerType(customer.value.customer.type)
        }

        // load event data based on event id
        const payload = {
            event_id: params.eventId,
        }

        axios.get(config.API_MAIN_URL + 'api/get_event_detail/', payload, config.AXIOS_CONFIG).then(response => {
            if (response.data.status === 'success') {
                let newEventRecord = response.data.data[0]
                newEventRecord.confirmed_date_display = convertDate(newEventRecord.confirmed_date)
                newEventRecord.proposed_date_1_display = convertDate(newEventRecord.proposed_date_1)
                newEventRecord.proposed_date_2_display = convertDate(newEventRecord.proposed_date_2)
                newEventRecord.proposed_date_3_display = convertDate(newEventRecord.proposed_date_3)

                setEventRecord(newEventRecord)
            }
        })
    }, [])

    const convertDate = (unixTimestamp) => {
        let date = new Date(unixTimestamp*1000);

        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }

    const changeEventStatus = (status) => {
        setEventStatus(status)
    }

    const updateEvent = () => {
        if (eventStatus === 'Approved' && confirmedDate.value === '') {
            return
        }

        if (eventStatus === 'Rejected' && remarks.value === '') {
            return
        }
        console.log(params)

        const payload = {
            event_id: params.eventId,
            status: eventStatus,
            confirmed_date: confirmedDate.value,
            remarks: remarks.value
        }

        axios.post(config.API_MAIN_URL + 'api/update_event/', payload, config.AXIOS_CONFIG).then(response => {
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
                        <div className="col-12 title">VIEW EVENTS</div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <div>Event Name:  { eventRecord.name }</div>
                            <div>Status: { eventRecord.status }</div>
                            <div>Vendor: { eventRecord.user_name }</div>
                            <div>Created: { eventRecord.createdAt }</div>

                            { eventRecord.status === 'Pending' ?
                                <>
                                    <div>Propose Date:</div>
                                    <div>{ eventRecord.proposed_date_1_display }</div>
                                    <div>{ eventRecord.proposed_date_2_display }</div>
                                    <div>{ eventRecord.proposed_date_3_display }</div>
                                </>
                                :
                                <>
                                    <div>Confirmed Date: { eventRecord.confirmed_date_display }</div>
                                </>
                            }

                            <div className="mt-15">
                                <Link to="/">
                                    <button>Return</button>
                                </Link>
                            </div>
                        </div>
                        { customerType === 'Vendor'  && eventRecord.status === 'Pending' &&
                            <>
                                <div className="col-12 col-sm-6">
                                    <div>Do you approve this events?</div>
                                    <div className="mt-15">
                                        <button onClick={ () => changeEventStatus('Approved') }>Approve</button>
                                        <button onClick={ () => changeEventStatus('Rejected') }>Reject</button>
                                    </div>

                                    <div className="mt-15">
                                        { eventStatus === 'Approved' &&
                                            <>
                                                <div className="label">Select Proposed Date</div>
                                                <select { ...confirmedDate } name="" id="">
                                                    <option value="">Select Date</option>
                                                    <option value={ eventRecord.proposed_date_1 }>{ eventRecord.proposed_date_1_display }</option>
                                                    <option value={ eventRecord.proposed_date_2 }>{ eventRecord.proposed_date_2_display }</option>
                                                    <option value={ eventRecord.proposed_date_3 }>{ eventRecord.proposed_date_3_display }</option>
                                                </select>
                                            </>
                                        }

                                        { eventStatus === 'Rejected' &&
                                            <>
                                                <div className="label">Remarks</div>
                                                <textarea id="" cols="60" rows="4" { ...remarks }></textarea>
                                            </>
                                        }
                                    </div>

                                    { eventStatus !== '' &&
                                        <>
                                            <div className="mt-15">
                                                <button onClick={ updateEvent }>Submit</button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                        }
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

export default ViewEvents;
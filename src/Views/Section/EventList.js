import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getCustomer } from '../../Libraries/Common.js'

const EventList = () => {
    const config = require('../../config.json')
    const customer = getCustomer()
    const [arrEvent, setArrEvent] = useState([])
    const [customerType, setCustomerType] = useState('HR')

    useEffect(() => {
        // check if customer is null
        if (customer !== null) {
            setCustomerType(customer.value.customer.type)

            let payload = {
                user_id: ((customer.value.customer.type === 'Vendor')) ? customer.value.customer.id : 0
            }
            console.log(payload)

            axios.get(config.API_MAIN_URL + 'api/get_event/', payload, config.AXIOS_CONFIG).then(response => {
                if (response.data.status === 'success') {
                    response.data.data.forEach((item) => {
                        item.confirmed_date_display = convertDate(item.confirmed_date)
                        item.proposed_date_1_display = convertDate(item.proposed_date_1)
                        item.proposed_date_2_display = convertDate(item.proposed_date_2)
                        item.proposed_date_3_display = convertDate(item.proposed_date_3)
                    })

                    setArrEvent(response.data.data)
                }
            })
        }
    }, [])

    const convertDate = (unixTimestamp) => {
        let date = new Date(unixTimestamp*1000);

        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }

    return (
        <section className="event-list">
            <div className="container-fluid">

                {/* Validate Account Type.. If account type === 'HR' -> show create events button  */}
                { customerType === 'HR' &&
                    <Link to="/create-events">
                        <button>Create Events</button>
                    </Link>
                }
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">EVENT NAME</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">CREATED</th>
                                    <th scope="col">VENDOR</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { arrEvent.length > 0 ?
                                    ( arrEvent.map((item, index) => {
                                        return (
                                            <tr key={ index }>
                                                <th scope="row">{ item.id }</th>
                                                <td>{ item.name }</td>
                                                <td>
                                                    { item.status === 'Pending' ?
                                                    <>
                                                        <div>Proposed Date: </div>
                                                        <div>{ item.proposed_date_1_display }</div>
                                                        <div>{ item.proposed_date_2_display }</div>
                                                        <div>{ item.proposed_date_3_display }</div>
                                                    </>
                                                    :
                                                    <>
                                                        <div>{ item.confirmed_date_display }</div>
                                                    </>
                                                    }
                                                </td>
                                                <td>{ item.status }</td>
                                                <td>{ item.createdAt }</td>
                                                <td>{ item.user_name }</td>
                                                <td>
                                                    <Link to={'/view-events/'+ item.id }>
                                                        <button>View</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    }) )
                                    :
                                    <tr>
                                        <td colSpan="99">No Data</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EventList;
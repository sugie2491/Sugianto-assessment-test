import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCustomer, setCustomerSession } from '../Libraries/Common.js'

const Login = () => {
    const config = require('../config.json')

    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    const username = useFormInput('admin')
    const password = useFormInput('admin')

    useEffect(() => {
         // check session data.. if session data is not null, redirect back to dashboard page
        const customerData = getCustomer()

        if (customerData !== null) {
            navigate('/')
        }
    }, [])

    const doLogin = () => {
        setError(false)
        setErrorText('')

        // check username and password value
        if (username.value === '' || password.value === '') {
            setError(true)
            setErrorText('Please fill all data above')
            return
        }

        setIsLoading(true)

        const payload = {
            username: username.value,
            password: password.value
        }

        axios.post(config.API_MAIN_URL + 'api/login/', payload, config.AXIOS_CONFIG).then(response => {
            if (response.data.status === 'success') {
                const userRecord = response.data.data[0]
                setCustomerSession(userRecord.id, userRecord)
                navigate('/')
            }
            else {
                setError(true)
                setErrorText(response.data.message)

                setIsLoading(false)
            }
        })
    }

    return (
        <section className="login-container">
            <div className="login-box">
                { isLoading && <><div className="loading">Loading</div></> }

                <div className="title">LOGIN</div>

                <div className="login-input-group">
                    <div className="label">Username</div>
                    <input type="text" { ...username } />
                </div>

                <div className="login-input-group">
                    <div className="label">Password</div>
                    <input type="password" { ...password } />
                </div>

                { error && <><div className="error">{ errorText }</div></> }

                <button className="w-100" onClick={ doLogin }>LOGIN</button>
            </div>
        </section>
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

export default Login;
import { useNavigate  } from 'react-router-dom'
import { removeCustomerSession } from '../../Libraries/Common.js'

const Navigation = () => {
    let navigate = useNavigate()

    const doLogout = () => {
        removeCustomerSession()
        navigate('/login')
    }

    return (
        <nav>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="logo">EMBREO</div>
                    </div>
                    <div className="col-6 text-right">
                        <button onClick={ doLogout }>logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
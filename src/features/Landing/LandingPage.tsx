import { Navigate } from 'react-router-dom';
import useUser from '../../store/userStore';

const LandingPage = () => {
    const { name, token } = useUser();
    console.log(name);
    if (token) {
        return <Navigate to='/dashboard' replace />
    }
    return (
        <div>
            <h1>Hello from Landing Page</h1>
        </div>
    )
}

export default LandingPage;
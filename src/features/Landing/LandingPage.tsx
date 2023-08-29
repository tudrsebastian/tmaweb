import useUser from '../../store/userStore';

const LandingPage = () => {
    const { name } = useUser();
    console.log(name);
    return (
        <div>
            <h1>Hello from Landing Page</h1>
        </div>
    )
}

export default LandingPage;
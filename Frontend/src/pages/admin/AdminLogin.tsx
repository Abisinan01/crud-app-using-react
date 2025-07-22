import { Spinner } from "flowbite-react"
import LoginForm from "../../components/Form/AdminLogin"
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const AdminLogin = () => {
    const { status } = useSelector((state: RootState) => state.auth);
    return (
        <>
            {status === 'loading' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Spinner
                        aria-label="Loading user data"
                        color="info"
                        size="xl"
                        className='slow-spin'
                    />
                </div>
            )}
            <div className="bg-black w-screen h-screen flex items-center justify-center">
                <LoginForm />
            </div>
        </>

    )
}

export default AdminLogin

import AuthLayout from "../layouts/AuthLayout.jsx";
import LoginForm from "../components/LoginForm.jsx"

const LoginPage = ()=>{
    return(
        <AuthLayout>
           <LoginForm />
        </AuthLayout>
    );
}

export default LoginPage;
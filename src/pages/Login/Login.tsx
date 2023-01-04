import { useRef, useState, useEffect } from 'react';
import useAuth from '../../other/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axiosAll from '../../other/axiosAll';
import './login.css'
import { AnyARecord } from 'dns';

const Login = () => {
    const { setAuth }: any = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef: any = useRef();
    const errRef: any = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axiosAll.post('auth/login',
                JSON.stringify({ username, password }),
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.access_token;
            const roles = response?.data?.roles;
            const id = response?.data?.id;

            localStorage.setItem("user", JSON.stringify(response?.data));
            setAuth({ username, roles, accessToken, id });
            setUsername('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err: any) {
            if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('this user does not exist');
            }
            errRef.current.focus();
        }
    }

    return (

        <section className='login-container'>
            <div className='login'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
                <p>
                    Forgot password?<br />
                    <span className="line">
                        <Link to="/forgotpw">click here</Link>
                    </span>
                </p>
            </div>
        </section>

    )
}

export default Login

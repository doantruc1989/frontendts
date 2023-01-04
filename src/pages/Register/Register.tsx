import React, { useRef, useState, useEffect } from 'react'
import axiosAll from '../../other/axiosAll';
import { Link } from "react-router-dom";
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa'
import './register.css'
const USER_REGEX = /^[A-z]{3,23}$/;
const PWD_REGEX = /^(?=.*[0-9]).{3,24}$/;

const Register = () => {
    const userRef: any = useRef();
    const errRef: any = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axiosAll.post('auth/register',
                JSON.stringify({ username, password }),
            );

            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            setUsername('');
            setPassword('');
            setMatchPwd('');
        } catch (err: any) {
            if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section className='register-container'>
                    <h1>Success!</h1>
                    <p>
                        <Link to='/login'>to Login page</Link>
                    </p>
                </section>
            ) : (
                <section className='register-container'>
                    <div className='login'>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">
                                Username:
                                <FaCheck className={validName ? "valid" : "hide"} />
                                <FaTimes className={validName || !username ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                                <FaInfoCircle />
                                3 to 24 characters.<br />
                            </p>


                            <label htmlFor="password">
                                Password:
                                <FaCheck className={validPwd ? "valid" : "hide"} />
                                <FaTimes className={validPwd || !password ? "hide" : "invalid"} />

                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FaInfoCircle />
                                3 to 24 characters.<br />
                            </p>


                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <FaCheck className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FaTimes className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FaInfoCircle />
                                Must match the first password input field.
                            </p>

                            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className="line">
                                <Link to="/login">Sign In</Link>
                            </span>
                        </p>
                    </div>
                </section>
            )}
        </>
    )
}

export default Register
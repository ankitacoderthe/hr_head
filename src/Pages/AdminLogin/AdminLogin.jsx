import React, { useEffect, useState } from 'react'
import classes from './AdminLogin.module.css'
import Logo from '../../assets/logo.png'
import eye_img from '../../assets/eye.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../../util'

const AdminLogin = () => {

    const [viewPassword, setViewPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // UserName validation
    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredUsernameTouched, setEnteredUsernameTocuhed] = useState(false)
    const changeUsernameHandler = (e) => {
        setEnteredUsername(e.target.value)
    }
    const usernameBlurHandler = (e) => {
        setEnteredUsernameTocuhed(true)
    }
    const enteredUsernameIsValid = enteredUsername.trim() !== '';
    const UserNameInputIsInValid = !enteredUsernameIsValid && enteredUsernameTouched;

    // Password Validation

    const [enteredPassoword, setEnteredPassword] = useState('');
    const [passowordTouched, setPasswordTouched] = useState(false);
    const changePasswordHandler = (e) => {
        setEnteredPassword(e.target.value)
    }
    const passwordBlurHandler = (e) => {
        setPasswordTouched(true)
    }
    const enteredPasswordIsValid = enteredPassoword.trim() !== '';
    const PasswordInputIsInValid = !enteredPasswordIsValid && passowordTouched;


    // On Form Submission

    const cookies = new Cookies();

    const isformValid = !UserNameInputIsInValid && !PasswordInputIsInValid

    const formSubmissionHandler = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await fetch(baseURL+'api/auth/login', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    username: enteredUsername,
                    password: enteredPassoword
                })
            })

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const result = await response.json()
            if (result.token) {

                const decode = jwtDecode(result.token)

                console.log(decode);

                cookies.set('hr_head_token',result.token,{
                    expires: new Date(decode.exp * 1000)
                })

                // 4000.setItem("token", result.token)
                // alert('Welcome Sir')
                toast.success('Welcome Sir')
                

                setTimeout(() => {
                    navigate('/')
                }, 500);
            }
            else{
                toast.error('Enter Correct Details!')
            }
            //  Reset All States
            setLoading(false)
            setEnteredUsername('')
            setEnteredPassword('')
            setEnteredUsernameTocuhed(false)
            setPasswordTouched(false)
        } catch (error) {
            setLoading(false)

            console.log(error)
            setEnteredUsername('')
            setEnteredPassword('')
            setEnteredUsernameTocuhed(true)
            setPasswordTouched(true)
        }
    }


    useEffect(()=>{
        if (cookies.get('token')) {
            navigate('/')
        }
    },[])

    return (
        <div className={classes.container}>
            <ToastContainer></ToastContainer>
            <div className={classes.first_div}>
                <img src={Logo} alt="" />
            </div>
            <form className={classes.form} onSubmit={formSubmissionHandler}>
                <div className={classes.input_div}>
                    <label htmlFor="username">Username</label>
                    <input className={UserNameInputIsInValid === true ? classes.invalid : ''} id='username' type="text" value={enteredUsername} onChange={changeUsernameHandler} onBlur={usernameBlurHandler} />
                    {<p className={`${classes.alert} ${UserNameInputIsInValid === true ? classes.invalid_p : ''}`}>Enter correct details!</p>}
                </div>
                <div className={classes.input_div}>
                    <label htmlFor="password">Password</label>
                    <input id='password' type={viewPassword === true ? "text" : "password"} className={PasswordInputIsInValid === true ? classes.invalid : ''} value={enteredPassoword} onChange={changePasswordHandler} onBlur={passwordBlurHandler} />
                    {<p className={`${classes.alert} ${PasswordInputIsInValid === true ? classes.invalid_p : ''}`}>Enter correct details!</p>}
                    <img className={classes.eye} src={eye_img} onClick={() => setViewPassword(!viewPassword)} alt="" />
                </div>
                <button type='submit' disabled={!isformValid || loading === true} className={classes.login_btn}>{loading === true ? 'Loading...' : "Login"}</button>
            </form>
        </div>
    )
}

export default AdminLogin
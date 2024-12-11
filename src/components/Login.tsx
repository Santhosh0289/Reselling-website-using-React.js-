import React, { useState } from 'react';
import guitar from '../assets/guitar.png';
import google from '../assets/google.png';
import phone from '../assets/phone.png';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/setup';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'; // Firebase imports

type popupProp = {
    setLoginPop: any;
}

const Login = (props: popupProp) => {
    const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number
    const [verificationCode, setVerificationCode] = useState(''); // State for verification code
    const [confirmResult, setConfirmResult] = useState(null); // State to hold confirmation result for verification

    const [isEmailLogin, setIsEmailLogin] = useState(false); // State to toggle email login overlay
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle sign-up popup
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input

    // Google Sign-in Logic
    const googleSignin = async () => {
        try {
            await signInWithPopup(auth, googleProvider); // Google sign-in logic
            props.setLoginPop(false); // Close the login popup on successful login
        } catch (err) {
            console.error('Google Sign-in Error:', err); // Handle error
        }
    }

    // Handle Phone Number Login
    const handlePhoneLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmResult(confirmationResult); // Store confirmation result to verify the code
            alert('Verification code sent to your phone.'); // Notify user
        } catch (error) {
            console.error('Error during phone sign-in:', error);
        }
    }

    // Verify the code entered by the user
    const verifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (confirmResult) {
            try {
                await confirmResult.confirm(verificationCode); // Verify the code
                props.setLoginPop(false); // Close the login popup after successful login
            } catch (error) {
                console.error('Error verifying code:', error);
                alert('Invalid verification code, please try again.');
            }
        }
    }

    // Handle Email Login
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password); // Firebase email/password login
            props.setLoginPop(false); // Close the login popup after successful login
        } catch (error) {
            console.error('Email Login Error:', error);
            alert('Invalid email or password, please try again.');
        }
    }

    // Handle Email Sign-Up
    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password); // Firebase email/password sign-up
            props.setLoginPop(false); // Close the popup on successful sign-up
            alert('Sign-up successful! You are now logged in.'); // Notify user
        } catch (error) {
            console.error('Sign-up Error:', error);
            alert('Error during sign-up. Please try again.');
        }
    }

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-96 sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <h1 onClick={() => props.setLoginPop(false)} className='font-semibold text-3xl text-right cursor-pointer'>X</h1>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <div className="mt-2">
                                        <img src={guitar} className='w-20 h-20 ml-28' />
                                        <p className="text-base font-medium mt-5 text-center">Help us become one of the safest places <br /> to buy and sell</p>
                                        <div className='flex border-2 border-black p-2 rounded-md mt-12 cursor-pointer' onClick={handlePhoneLogin}>
                                            <img src={phone} className='w-6 h-6' />
                                            <h1 className='font-semibold ml-3'>Continue with Phone</h1>
                                        </div>
                                        <div onClick={googleSignin} className='flex border border-gray-300 p-2 rounded-md mt-12 cursor-pointer'>
                                            <img src={google} className='w-6 h-6' />
                                            <h1 className='font-semibold ml-12'>Continue with Google</h1>
                                        </div>
                                        <h1 className='text-center mt-4'>OR</h1>
                                        <h1 className='text-center mt-4 underline hover:no-underline cursor-pointer' onClick={() => setIsEmailLogin(true)}>Login with Email</h1>
                                        <h1 className='text-center mt-28 text-xs'>All your personal details are safe with us.</h1>
                                        <h1 className='text-center mt-4 text-xs'>If you continue, you are accepting <span className='text-blue-600 cursor-pointer'>OLX Terms and <br />Conditions and Privacy Policy</span></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Email Login Overlay */}
            {isEmailLogin && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-zinc-950 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">Login with Email</h2>
                        <form onSubmit={handleEmailLogin}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
                                Login
                            </button>
                        </form>
                        
                        {/* Sign Up Link */}
                        <div className="text-center mt-4">
                            <span>Don't have an account? </span>
                            <button onClick={() => { setIsSignUp(true); setIsEmailLogin(false); }} className="text-blue-600 hover:underline">Sign up</button>
                        </div>

                        <button onClick={() => setIsEmailLogin(false)} className="mt-4 text-sm text-blue-600 hover:underline">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Email Sign-up Overlay */}
            {isSignUp && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-zinc-950 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">Sign Up with Email</h2>
                        <form onSubmit={handleEmailSignUp}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md">
                                Sign Up
                            </button>
                        </form>
                        <button onClick={() => setIsSignUp(false)} className="mt-4 text-sm text-blue-600 hover:underline">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Include reCAPTCHA widget here */}
            <div id="recaptcha-container"></div>
        </div>
    );
}

export default Login;


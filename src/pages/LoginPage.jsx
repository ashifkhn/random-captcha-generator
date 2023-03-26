import React, { useState, useEffect } from 'react'
import './LoginPage.css'
import { Audio } from 'react-loader-spinner'

function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loader, setLoader] = useState(true)
	const [captcha, setCaptcha] = useState('****')
	const [captchaInput, setCaptchaInput] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	const handleEmailChange = (event) => {
		setErrorMsg('')
		setEmail(event.target.value)
	}

	const handlePasswordChange = (event) => {
		setErrorMsg('')
		setPassword(event.target.value)
	}

	const handleCaptchaChange = (event) => {
		setErrorMsg('')
		setCaptchaInput(event.target.value)
	}

	const captchaGenerator = () => {
		let characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
		let result = ''
		let chaactersLength = characters.length

		for (let i = 0; i < 5; i++) {
			result += characters.charAt(Math.floor(Math.random() * chaactersLength))
		}
		setCaptcha(result)
		setLoader(false)
	}

	const handleLogin = () => {
		if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(email) === false) {
			setErrorMsg('Please enter a valid email')
			return
		}
		if (password.length < 5) {
			setErrorMsg('Password must be at least 5 characters')
			return
		}
		if (captcha !== captchaInput) {
			captchaGenerator()
			setErrorMsg('Wrong captcha try again')
			return
		}
		setErrorMsg('')
		alert('Sign Up Success')
	}

	useEffect(() => {
		captchaGenerator()
	}, [])

	return (
		<>
			{loader ? (
				<Audio
					height='80'
					width='80'
					radius='9'
					color='green'
					ariaLabel='three-dots-loading'
					wrapperStyle
					wrapperClass
				/>
			) : (
				<div className='login-container'>
					<h2>Sign Up</h2>
					<div className='form-container'>
						<div className='form-field'>
							<label>Email:</label>
							<input
								type='email'
								value={email}
								onChange={handleEmailChange}
								placeholder='user@test.com'
							/>
						</div>
						<div className='form-field'>
							<label>Password:</label>
							<input
								type='password'
								value={password}
								onChange={handlePasswordChange}
								placeholder='******'
							/>
						</div>
						<div className='form-field'>
							<div className='captcha-container'>{captcha}</div>
							<input
								value={captchaInput}
								onChange={handleCaptchaChange}
								placeholder='Enter the character you see above'
							/>
						</div>
						<div style={{ color: 'red' }}>{errorMsg}</div>
						<button className='login-button' onClick={handleLogin}>
							Sign Up
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default LoginPage

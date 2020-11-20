import React, { useState, useEffect } from 'react';
import './css/Header.css';
import './css/authModals.css';
import { writtenLogo } from '../globalData';
import {
	Button,
	FormControl,
	FormGroup,
	Input,
	Modal,
} from '@material-ui/core';
import { auth, googleAuth } from '../firebase';
import { useStateValue } from '../StateProvider';

const Header = () => {
	const [open, setOpen] = useState(false);
	const [signUpOpen, setSignUpOpen] = useState(false);
	const [{ user }, dispatch] = useStateValue();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSignUpOpen = () => {
		setSignUpOpen(true);
	};

	const handleSignUpClose = () => {
		setSignUpOpen(false);
	};

	const signUpPopupShift = () => {
		handleClose();
		handleSignUpOpen();
	};

	const loginPopupShift = () => {
		handleOpen();
		handleSignUpClose();
	};

	const closePopups = () => {
		handleClose();
		handleSignUpClose();
	};

	const handleSignUp = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					setEmail('');
					setPassword('');
					setUsername('');
					closePopups();
				}
			})
			.catch((err) => alert(err.message));
	};

	const handleGoogleAuth = (e) => {
		e.preventDefault();
		auth
			.signInWithPopup(googleAuth)
			.then((auth) => {
				if (auth) {
					closePopups();
				}
			})
			.catch((err) => alert(err.message));
	};

	const handleLogin = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					setEmail('');
					setPassword('');
					setUsername('');
					closePopups();
				}
			})
			.catch((err) => alert(err.message));
	};

	const handleLogout = (e) => {
		e.preventDefault();
		auth.signOut();
	};
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				if (authUser.displayName) {
					dispatch({
						type: 'SET_USER',
						user: authUser,
						isLoggedIn: true,
					});
				} else {
					return authUser.updateProfile({
						displayName: username,
					});
				}
			} else {
				dispatch({
					type: 'SET_USER',
					user: null,
					isLoggedIn: false,
				});
			}
		});
	}, [dispatch, username]);

	return (
		<>
			<div className='header'>
				<img src={writtenLogo} alt='Instagram Logo' className='logo my-auto' />
				{user ? (
					<>
						<Button
							size='medium'
							variant='outlined'
							className='authBtns my-auto'
							style={{ maxHeight: 39, marginTop: 2.5 }}
							onClick={handleLogout}
						>
							<span className='d-none-sm'>Hi, {user.displayName} | </span>
							Sign Out
						</Button>
					</>
				) : (
					<Button
						size='medium'
						variant='outlined'
						className='authBtns my-auto'
						style={{ maxHeight: 39, marginTop: 2.5 }}
						onClick={handleOpen}
					>
						Sign In
					</Button>
				)}
			</div>
			<Modal
				className='signInModal mx-auto'
				open={open}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
			>
				<div className='signInModalBody mx-auto'>
					<h1 style={{ fontWeight: 500 }} className='d-flex mx-auto'>
						Login
					</h1>
					<form>
						<FormGroup>
							<FormControl>
								<Input
									required='true'
									className='input mx-auto'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder='Email'
								/>
							</FormControl>
							<FormControl>
								<Input
									required='true'
									className='input mx-auto'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder='Password'
								/>
							</FormControl>
							<Button
								variant='outlined'
								className='input mx-auto'
								onClick={handleLogin}
								type='submit'
								style={{
									marginTop: 8,
									maxWidth: 340,
									display: 'flex',
									marginRight: 5,
									marginLeft: 5,
								}}
							>
								Login
							</Button>
						</FormGroup>
					</form>
					<h2 className='d-flex mx-auto'>-OR-</h2>
					<Button
						variant='outlined'
						className='input mx-auto'
						onClick={handleGoogleAuth}
						style={{
							marginTop: 4,
							maxWidth: 340,
							display: 'flex',
							marginRight: 5,
							marginLeft: 5,
						}}
					>
						Login with Google
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
							alt='Google Logo'
							style={{ maxHeight: 24, marginLeft: 7 }}
						/>
					</Button>
					<Button
						variant='outlined'
						className='input mx-auto'
						onClick={signUpPopupShift}
						style={{
							marginTop: 4,
							maxWidth: 340,
							display: 'flex',
							marginRight: 5,
							marginLeft: 5,
						}}
					>
						Create your account now
					</Button>
				</div>
			</Modal>
			<Modal
				className='signUpModal mx-auto'
				open={signUpOpen}
				onClose={handleSignUpClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
			>
				<div className='signUpModalBody mx-auto'>
					<h1 style={{ fontWeight: 500 }} className='d-flex mx-auto'>
						Sign Up
					</h1>
					<FormGroup>
						<FormControl variant='outlined'>
							<Input
								required='true'
								className='input mx-auto'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder='Username'
							/>
						</FormControl>
						<FormControl variant='outlined'>
							<Input
								required='true'
								className='input mx-auto'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControl variant='outlined'>
							<Input
								required='true'
								className='input mx-auto'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
						<Button
							variant='outlined'
							className='input mx-auto'
							onClick={handleSignUp}
							style={{
								marginTop: 8,
								maxWidth: 340,
								display: 'flex',
								marginRight: 5,
								marginLeft: 5,
							}}
						>
							Signup
						</Button>
					</FormGroup>
					<h2 className='d-flex mx-auto'>-OR-</h2>
					<Button
						variant='outlined'
						className='input mx-auto'
						onClick={handleGoogleAuth}
						style={{
							marginTop: 4,
							maxWidth: 340,
							display: 'flex',
							marginRight: 5,
							marginLeft: 5,
						}}
					>
						Sign Up with Google
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
							alt='Google Logo'
							style={{ maxHeight: 24, marginLeft: 7 }}
						/>
					</Button>
					<Button
						variant='outlined'
						className='input mx-auto'
						onClick={loginPopupShift}
						style={{
							marginTop: 4,
							maxWidth: 340,
							display: 'flex',
							marginRight: 5,
							marginLeft: 5,
						}}
					>
						Login Now
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default Header;

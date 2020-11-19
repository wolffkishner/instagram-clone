import React from 'react';
import './css/Header.css';
import { writtenLogo } from '../globalData';

const Header = () => {
	return (
		<div className='header'>
			<img src={writtenLogo} alt='Instagram Logo' className='logo my-auto' />
			<button className='authBtns my-auto'>Sign In</button>
		</div>
	);
};

export default Header;

import React from 'react';
import './css/Post.css';

const Post = ({ title, user, imageURL }) => {
	return (
		<div className='post mx-auto'>
			<div className='postInfo'>
				<div className='postAvatar my-auto'>
					<img
						src='https://ssl.gstatic.com/images/branding/product/1x/avatar_square_grey_512dp.png'
						alt='user'
						className='postAvatar my-auto'
					/>
				</div>
				<div className='postText my-auto'>
					<h3 className='title'>{title}</h3>
					<h4 className='displayUser'>By {user}</h4>
				</div>
			</div>
			<img src={imageURL} alt={title} className='displayImage' />
			<div className='comments'>
				<p className='comment'>
					<strong>mehar </strong> This is an awesome comment
				</p>
				<p className='comment'>
					<strong>mehar </strong> This is an awesome comment
				</p>
			</div>
		</div>
	);
};

export default Post;

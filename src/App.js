import React from 'react';
import Header from './components/Header';
import Post from './components/Post';

const App = () => {
	return (
		<div>
			<Header />
			<Post
				title='This is a post'
				user='yashrajjj'
				imageURL='https://www.cyberark.com/wp-content/uploads/2019/11/Developer.jpg'
			/>
			<Post
				title="Man's post"
				user='manpreettt'
				imageURL='https://www.cyberark.com/wp-content/uploads/2019/11/Developer.jpg'
			/>
			<Post
				title='This is the best'
				user='meharrr'
				imageURL='https://www.cyberark.com/wp-content/uploads/2019/11/Developer.jpg'
			/>
		</div>
	);
};

export default App;

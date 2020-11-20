import React, { useEffect } from 'react';
import CreateNewPost from './components/CreateNewPost';
import Header from './components/Header';
import Post from './components/Post';
import { db } from './firebase';
import { useStateValue } from './StateProvider';

const App = () => {
	const [{ posts, user }, dispatch] = useStateValue();
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);
	useEffect(() => {
		db.collection('posts').onSnapshot((snapshot) => {
			dispatch({
				type: 'SET_POSTS',
				posts: snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })),
			});
		});
	}, [dispatch]);

	return (
		<div>
			<h2>Hello</h2>
			<Header />
			{posts.map((post) => (
				<Post
					key={post.id}
					title={post.post.title}
					user={post.post.user}
					imageURL={post.post.imageURL}
				/>
			))}
			{user && <CreateNewPost />}
		</div>
	);
};

export default App;

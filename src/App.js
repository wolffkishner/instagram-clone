import React, { useEffect } from 'react';
import Header from './components/Header';
import Post from './components/Post';
import { auth, db, googleAuth } from './firebase';
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
			<Header />
			{posts.map((post) => (
				<Post
					key={post.id}
					title={post.post.title}
					user={post.post.user}
					imageURL={post.post.imageURL}
				/>
			))}
		</div>
	);
};

export default App;

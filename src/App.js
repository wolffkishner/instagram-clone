import React, { useEffect, useState } from 'react';
import CreateNewPost from './components/CreateNewPost';
import Header from './components/Header';
import Loading from './components/Loading';
import Post from './components/Post';
import { db } from './firebase';
import { useStateValue } from './StateProvider';

const App = () => {
	const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	setTimeout(() => setLoading(false), 4000);
	// }, []);
	const [{ posts, user }, dispatch] = useStateValue();
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);
	useEffect(() => {
		const getPosts = async () => {
			await db.collection('posts').onSnapshot((snapshot) => {
				dispatch({
					type: 'SET_POSTS',
					posts: snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })),
				});
				setLoading(false);
			});
		};
		getPosts();
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<>
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
				</>
			)}
		</div>
	);
};

export default App;

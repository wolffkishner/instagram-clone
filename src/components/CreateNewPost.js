import {
	Button,
	FormControl,
	FormGroup,
	LinearProgress,
	TextField,
} from '@material-ui/core';
import { ArrowForwardRounded, CloseRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import firebase from 'firebase';
import './css/CreateNewPost.css';
import imageCompression from 'browser-image-compression';
import { useStateValue } from '../StateProvider';

const CreateNewPost = () => {
	const [{ user }] = useStateValue();
	const [crnpOpen, setCrnpOpen] = useState(false);
	const [postTitle, setPostTitle] = useState('');
	const [image, setImage] = useState(null);
	const [imageCompressing, setImageCompressing] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const handleCrnp = () => {
		if (crnpOpen === true) {
			setCrnpOpen(false);
		} else {
			setCrnpOpen(true);
		}
	};

	const handleImageChange = async (event) => {
		setImageCompressing(true);
		const imageFile = event.target.files[0];

		const options = {
			maxSizeMB: 0.5,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		try {
			const compressedFile = await imageCompression(imageFile, options);
			await setImage(compressedFile);
			setImageCompressing(false);
		} catch (error) {
			console.log(error);
		}
	};

	const createPost = (e) => {
		e.preventDefault();
		if (postTitle === '') {
			alert('Please specify the post title');
		}

		if (image === null) {
			alert('Please select an image');
		}
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setUploadProgress(progress);
			},
			(error) => {
				console.log(error);
			},

			() => {
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						db.collection('posts').add({
							timestamps: firebase.firestore.FieldValue.serverTimestamp(),
							title: postTitle,
							imageURL: url,
							user: user?.displayName,
							userEmail: user?.email,
						});
						setTimeout(() => {
							setCrnpOpen(false);
							setUploadProgress(0);
							setImage();
							setPostTitle('');
						}, 400);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		);
	};

	return (
		<>
			<div className='toggleCrnp' id='crnpBtn' onClick={handleCrnp}>
				<CloseRounded className={`icon ${!crnpOpen && `hide`}`} />
				<ArrowForwardRounded className={`icon ${crnpOpen && `hide`}`} />
			</div>
			<div className={`crnp ${crnpOpen && `showCrnp`}`}>
				<h1>Create a New Post</h1>
				<form className='crnpForm' noValidate>
					<FormGroup>
						<FormControl>
							<LinearProgress
								value={uploadProgress}
								className='imageUploadProgress'
								variant='determinate'
								max='100'
								style={{ margin: '7px 0px' }}
							/>
							<TextField
								variant='outlined'
								type='text'
								label='Give a title to your post'
								className='input textInput'
								value={postTitle}
								onChange={(e) => setPostTitle(e.target.value)}
								required={true}
								size='small'
								id='textInput'
							/>
						</FormControl>
						<FormControl>
							<input
								variant='outlined'
								type='file'
								accept='image/*'
								placeholder='Upload an Image'
								className='input fileInput'
								required={true}
								onChange={handleImageChange}
							/>
						</FormControl>
						{imageCompressing ? (
							<>
								<LinearProgress style={{ margin: '5px 0px' }} />
								<Button variant='outlined' className='input'>
									Please wait, your image is Processing...
								</Button>
							</>
						) : (
							<>
								<Button
									variant='outlined'
									type='submit'
									className='input'
									onClick={createPost}
								>
									Submit
								</Button>
							</>
						)}
					</FormGroup>
				</form>
			</div>
		</>
	);
};

export default CreateNewPost;

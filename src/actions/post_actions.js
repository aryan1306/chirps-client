import axios from "axios";
import {
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST,
	GET_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
} from "./types";
import { setAlert } from "./alert_actions";
import { API_URL } from "../constants";

const config = {
	headers: {
		"x-auth-token": localStorage.getItem("token"),
	},
};

//get all posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get(`${API_URL}/api/posts`, config);
		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
//get post by id
export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`${API_URL}/api/posts/${id}`, config);
		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
//add likes
export const addLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`${API_URL}/api/posts/like/${id}`, config);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
//remove like
export const removeLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`${API_URL}/api/posts/unlike/${id}`, config);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
//add post
export const addPost = (formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": localStorage.getItem("token"),
		},
	};
	try {
		const res = await axios.post(`${API_URL}/api/posts`, formData, config);
		dispatch({
			type: ADD_POST,
			payload: res.data,
		});
		dispatch(setAlert("Posted Successfully", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
//delete post
export const deletePost = (id) => async (dispatch) => {
	try {
		await axios.delete(`${API_URL}/api/posts/${id}`, config);
		dispatch({
			type: DELETE_POST,
			payload: id,
		});
		dispatch(setAlert("Post deleted successfully", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
//add comment
export const addComment = (postId, formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": localStorage.getItem("token"),
		},
	};
	try {
		const res = await axios.post(
			`${API_URL}/api/posts/comment/${postId}`,
			formData,
			config
		);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});
		dispatch(setAlert("Comment Added Successfully", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
//delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.post(
			`${API_URL}/api/posts/comment/${postId}/${commentId}`,
			config
		);
		dispatch({
			type: DELETE_COMMENT,
			payload: commentId,
		});
		dispatch(setAlert("Deleted Comment Successfully", "danger"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

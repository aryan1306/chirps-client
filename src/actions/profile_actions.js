import axios from "axios";
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	ACCOUNT_DELETED,
	CLEAR_PROFILE,
	GET_PROFILES,
	GET_REPOS,
} from "./types";
import { setAlert } from "./alert_actions";
import { API_URL } from "../constants";

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get(`${API_URL}/api/profile/me`, {
			headers: { "x-auth-token": localStorage.getItem("token") },
		});
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const getProfiles = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	try {
		const res = await axios.get(`${API_URL}/api/profile`, {
			headers: { "x-auth-token": localStorage.getItem("token") },
		});
		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const getProfileById = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`${API_URL}/api/profile/user/${userId}`, {
			headers: { "x-auth-token": localStorage.getItem("token") },
		});
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const getGithubRepos = (username) => async (dispatch) => {
	try {
		const headers = {
			"Content-Type": "application/json",
			"x-auth-token": localStorage.getItem("token"),
		};
		const res = await axios.get(
			`${API_URL}/api/profile/github/${username}`,
			headers
		);
		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const createProfile =
	(formData, history, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": localStorage.getItem("token"),
				},
			};
			const res = await axios.post(`${API_URL}/api/profile`, formData, config);
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
			dispatch(
				setAlert(edit ? "Profile Updated!" : "Profile Created!", "success")
			);

			if (!edit) {
				history.push("/dashboard");
			}
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	};

export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": localStorage.getItem("token"),
			},
		};
		const res = await axios.put(
			`${API_URL}/api/profile/experience`,
			formData,
			config
		);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Experience added", "success"));

		history.push("/dashboard");
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": localStorage.getItem("token"),
			},
		};
		const res = await axios.put(
			`${API_URL}/api/profile/education`,
			formData,
			config
		);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Education added", "success"));

		history.push("/dashboard");
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`${API_URL}/api/profile/experience/${id}`, {
			headers: { "x-auth-token": localStorage.getItem("token") },
		});
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Experience Deleted", "danger"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`${API_URL}/api/profile/education/${id}`, {
			headers: { "x-auth-token": localStorage.getItem("token") },
		});
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Education Deleted", "danger"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deleteAccount = () => async (dispatch) => {
	try {
		if (
			window.confirm(
				"Are you sure you want delete your account? This action CANNOT be undone"
			)
		) {
			await axios.delete(`${API_URL}/api/profile`, {
				headers: { "x-auth-token": localStorage.getItem("token") },
			});
			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });
			dispatch(setAlert("Your account has been permanently deleted"));
		}
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

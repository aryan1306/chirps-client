export const __prod__ = process.env.NODE_ENV === "production";
export const API_URL = __prod__
	? "https://aryansinghal.xyz"
	: "http://localhost:8080";

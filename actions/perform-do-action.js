const axios = require("axios");

const BASE = "https://api.digitalocean.com";
const API = "/v2/droplets";
const DO_TOKEN = process.env.DO_TOKEN;

module.exports = async function action({ ID, data }) {
	const result = await axios({
		url: `${API}/${ID}/actions`,
		method: "POST",
		baseURL: BASE,
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + DO_TOKEN
		},
		data
	});
	return result.data;
}
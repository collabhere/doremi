const axios = require("axios");

const BASE = "https://api.digitalocean.com";
const API = "/v2/droplets";
const DO_TOKEN = process.env.DO_TOKEN;

module.exports = async function getDroplet(ID) {
	try {
		const result = await axios({
			url: `${API}/${ID}`,
			method: "GET",
			baseURL: BASE,
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + DO_TOKEN
			}
		});
		return result.data;
	} catch (err) {
		console.error("Unable to fetch droplet details - ", ID);
		console.error(err.message);
		process.exit(1);
	}
}
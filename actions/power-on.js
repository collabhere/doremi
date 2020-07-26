const action = require("./perform-do-action");

module.exports = async function powerOn(ID) {
	try {
		console.log("Turning droplet on.")
		const result = await action({
			ID,
			data: {
				type: "power_on"
			}
		});
		return result.data;
	} catch (err) {
		console.error("Unable to poweron droplet - ", ID);
		console.error(err.message);
		process.exit(1);
	}
}
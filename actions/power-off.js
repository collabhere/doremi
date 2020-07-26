
const action = require("./perform-do-action");

module.exports = async function powerOff(ID) {
	try {
		console.log("Could not gracefully shutdown, powering off.")
		const result = await action({
			ID,
			data: {
				type: "power_off"
			}
		});
		return result.data;
	} catch (err) {
		console.error("Unable to poweroff droplet - ", ID);
		console.error(err.message);
		process.exit(1);
	}
}
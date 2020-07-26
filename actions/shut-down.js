const action = require("./perform-do-action");

module.exports = async function shutdown(ID) {
	try {
		const result = await action({
			ID,
			data: {
				type: "shutdown"
			}
		});
		return result.data;
	} catch (err) {
		console.error("Unable to shutdown droplet - ", ID);
		console.error(err.message);
		process.exit(1);
	}
}
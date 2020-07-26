const action = require("./perform-do-action");

module.exports = async function resize(ID, size) {
	try {
		console.log(`Resizing to ${size}`);
		const result = await action({
			ID,
			data: {
				type: "resize",
				disk: false,
				size
			}
		});
		return result.data;
	} catch (err) {
		console.error("Unable to resize droplet - ", ID);
		console.error(err.message);
		process.exit(1);
	}
}
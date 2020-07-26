const getActions = require("../actions");

const sleep = ms => (
	console.log("Sleeping for " + ms + " ms."),
	new Promise(resolve => setTimeout(resolve, ms))
);

module.exports = async function resize(args) {
	try {

		const RESIZE_WAIT = args.wait || (60 * 1000);

		const actions = getActions({
			dropletID: args.id,
			resizeTo: args.sizeSlug
		});

		const pollStatusWithLimit = (ms, limit) => {
			let attempts = 0;
			async function poll(status) {
				console.log("Polling for droplet status - ", status);
				const { droplet } = await actions.get();
				++attempts;
				if (droplet.status === status) {
					console.log("Droplet status is - ", status);
					return true;
				} else {
					if (attempts >= limit) return false;
					await sleep(ms);
					return poll(status);
				}
			}
			poll.reset = () => (attempts = 0);;
			return poll;
		}

		const pollStatus = pollStatusWithLimit(5000, 5); /* poll with intervals of 5 seconds, no more than 5 times before resulting in status false */

		const shutdownOrPoweroff = async (poweroff = false) => {
			if (poweroff) {
				await actions.poweroff();
			} else {
				await actions.shutdown();
			}

			pollStatus.reset();
			const result = await pollStatus("off");

			if (!result && !poweroff) {
				return shutdownOrPoweroff(true);
			} else if (!result && poweroff) {
				console.error("Power off did not change droplet status. Something is wrong. Contact developers.");
				process.exit(1);
			}
			return;
		}

		const { droplet } = await actions.get();

		if (droplet.status !== "off") {
			console.log(`Attempting to gracefully shutdown droplet ${droplet.name}...`);

			await shutdownOrPoweroff(false);
		} else {
			console.log(`Droplet is already shutdown. Proceeding with resize.`);
		}

		await actions.resize();

		/* DO does not provide any droplet status for resizing. 
		But we can set this wait using the optional wait cli argument. 
		This duration should be about 1 minute for every GB of used data on your droplet. */
		await sleep(RESIZE_WAIT);

		await actions.poweron();

		pollStatus.reset();

		const active = await pollStatus("active");

		if (active) {
			console.log("Resize and power on completed. Bye!")
		} else {
			console.log("Status of droplet did not change to active. Please check for any problems in your DO droplet dashboard.")
		}
		process.exit();
	} catch (err) {
		console.error("An unexpected error occured.");
		console.error(err);
		process.exit(1);
	}
}
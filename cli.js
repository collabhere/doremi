module.exports = function cli() {
	const { argv } = require("yargs")
		.command('resize <id> <size-slug> [wait]'
			, 'resize droplet with id to provided size-slug'
			, yargs => {
				yargs
					.positional('id', {
						type: "string",
						describe: "Droplet ID"
					})
					.positional('size-slug', {
						type: "string",
						describe: "DigitalOcean Droplet Size Slug"
					})
					.positional('wait', {
						type: "string",
						describe: "MS to wait after starting resize of droplet."
					});
			})
		.help();
	return argv;
}
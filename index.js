#! /usr/bin/env node

(async function main() {
	const args = require("./cli")();

	if (args._[0] === "resize") { // Could not figure a better way to check
		require("./commands/resize")(args);
	} else {
		console.error("Unknown command. See `doremi --help`.");
		process.exit(1);
	}
})();

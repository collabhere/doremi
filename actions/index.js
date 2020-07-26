const getDroplet = require("./get-droplet");
const shutdown = require("./shut-down");
const powerOff = require("./power-off");
const powerOn = require("./power-on");
const resize = require("./resize");

module.exports = function getActions({ dropletID, resizeTo }) {
	return {
		get: () => getDroplet(dropletID),
		shutdown: () => shutdown(dropletID),
		poweroff: () => powerOff(dropletID),
		poweron: () => powerOn(dropletID),
		resize: () => resize(dropletID, resizeTo)
	};
}
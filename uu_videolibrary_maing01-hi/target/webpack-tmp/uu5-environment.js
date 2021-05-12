
var devConfig = require("/Users/patriks/uu_videolibrary_maing01/uu_videolibrary_maing01-hi/env/development.json").uu5Environment;
var config = require("/Users/patriks/uu_videolibrary_maing01/uu_videolibrary_maing01-hi/env/production.json").uu5Environment || {};
if (devConfig) for (var k in devConfig) config[k] = devConfig[k];
window.UU5 = { Environment: config };

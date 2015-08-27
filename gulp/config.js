'use strict';
const nodePath = require('path')


module.exports = {
	libPath: nodePath.join(process.cwd(),'lib'),
	distPath: nodePath.join(process.cwd(),'dist'),
	libName: 'jform'
}
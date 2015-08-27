/* global describe:true, it:true,before:true,beforeEach:true,after:true,afterEach:true */
'use strict';

describe('form', function () {
	
	it('should instantiate', function () {
		let form = new jform.Form();
		form.should.not.be.null
		form.should.be.instanceOf(jform.Form)
	})
	
});
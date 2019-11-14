/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      let result = convertHandler.getNum(input);
      assert.equal(result ,32, `Expected ${32} got ${result}`);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '3.2L';
      let result = convertHandler.getNum(input);
      assert.equal(result ,3.2, `Expected ${3.2} got ${result}`);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '32/2L';
      let result = convertHandler.getNum(input);
      assert.equal(result ,16, `Expected ${16} got ${result}`);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '5/2.5L';
      let result = convertHandler.getNum(input);
      assert.equal(result ,2, `Expected ${2} got ${result}`);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '3/2/3L';
      let result = convertHandler.getNum(input);
      assert.isNotOk(result, `Expected null or undefined got ${result}`);
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'L';
      let result = convertHandler.getNum(input);
      assert.equal(result ,1, `Expected ${1} got ${result}`);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        let result = convertHandler.getUnit(5+ele);
        assert.equal(result, ele, `expected getUnit('${5+ele}') to return '${ele}'`);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      let input = '55.3g';
      let result = convertHandler.getUnit(input);
      assert.notOk(result, `expected getUnit('${input}') to return null`);
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i], `expected getReturnUnit('${ele}') to return '${expect[i]}'`);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i], `expected spellOutUnit('${ele}') to return '${expect[i]}'`);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1, `expected convert(${input[0]}, '${input[1]}') to return ${expected}`); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [18.9271, 'l'];
      var expected = 5;
      let result = convertHandler.convert(input[0],input[1]);
      assert.approximately(result ,expected,0.1, `expected convert(${input[0]}, '${input[1]}') to return ${expected} got ${result}`); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi'];
      var expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1, `expected convert(${input[0]}, '${input[1]}') to return ${expected}`); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [8.0467, 'km'];
      var expected = 5;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1, `expected convert(${input[0]}, '${input[1]}') to return ${expected}`); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [5, 'lbs'];
      var expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1, `expected convert(${input[0]}, '${input[1]}') to return ${expected}`); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [2.26796, 'kg'];
      var expected = 5;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1, `expected convert(${input[0]}, '${input[1]}') to return ${expected}`); //0.1 tolerance
      done();
    });
    
  });

});
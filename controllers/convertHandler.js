/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  const patternUnit = "([0-9.\/]*)(gal|lbs|mi|l|kg|km)$";
  const patternNumber = "^([0-9.\/]*)([a-zA-Z]+)";

  const units = ['gal', 'lbs', 'mi', 'l', 'kg', 'km'];
  const spellOutUnits = ['gallons', 'pounds', 'miles', 'liters', 'kilograms', 'kilometers'];
  const conversions = [
    {
      to: 'l',
      ratio: 3.78541
    },
    {
      to: 'kg',
      ratio: 0.453592
    },
    {
      to: 'km',
      ratio: 1.60934
    },
    {
      to: 'gal',
      ratio: 1/3.78541
    },
    {
      to: 'lbs',
      ratio: 1/0.453592
    },
    {
      to: 'mi',
      ratio: 1/1.60934
    }
  ]
  
  this.getNum = function(input) {
    var result = null;

    let regex = new RegExp(patternNumber, 'gi');
    let res = regex.exec(input);

    try {
      let terms = res[1].split('/');
      if(terms.length === 1){
        if(terms[0] === ''){
          result = 1;
        }
        else {
          result = parseFloat(terms[0]);
        }
      }
      else if(terms.length === 2){
        result = parseFloat(terms[0]) / parseFloat(terms[1]);
      }
    }
    catch(ex){
      result = null;
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result = null;

    let regex = new RegExp(patternUnit, 'gi');
    let res = regex.exec(input);

    if(res){
      let unit = res[2];

      if(units.indexOf(unit.toLowerCase()) >= 0){
        result = unit;
      }
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;

    result = conversions[units.indexOf(initUnit.toLowerCase())].to;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;

    result = spellOutUnits[units.indexOf(unit.toLowerCase())];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    result = conversions[units.indexOf(initUnit.toLowerCase())].ratio*initNum;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

    return result;
  };
  
}

module.exports = ConvertHandler;

var expect = require('chai').expect;
var sinon = require('sinon');

var noSSNValidator          = require("../lib/no_ssn_validator"),
    isValid                 = noSSNValidator.isValid,
    getGender               = noSSNValidator.getGender,
    Gender                  = noSSNValidator.Gender,
    calculateFirstChecksum  = noSSNValidator.calculateFirstChecksum,
    calculateSecondChecksum = noSSNValidator.calculateSecondChecksum;

describe("noSSNValidator", function () {
  var sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe("isValid", function () {

    it("should return false for undefined", function () {
      expect(isValid(undefined)).to.equal(false);
    });

    it("should return false for null", function () {
      expect(isValid(null)).to.equal(false);
    });

    it("should return false for an object", function () {
      expect(isValid({})).to.equal(false);
    });

    it("should return false for a number", function () {
      expect(isValid(0)).to.equal(false);
    });

    it("should return false for strings less than 11 characters", function () {
      expect(isValid("1107794101")).to.equal(false);
    });

    it("should return false for strings more than 11 characters", function () {
      expect(isValid("110779410120")).to.equal(false);
    });

    it("should return false for strings containing more than just digits", function () {
      expect(isValid("11a21599915")).to.equal(false);
    });

    it("should return false for a number with invalid date, but is otherwise correct", function () {
      sandbox.stub(noSSNValidator, "isDateValid").returns(false);
      sandbox.stub(noSSNValidator, "calculateFirstChecksum").returns("1");
      sandbox.stub(noSSNValidator, "calculateSecondChecksum").returns("5");

      expect(isValid("11021599915")).to.equal(false);
    });

    it("should return false for a number where the 1st checksum is wrong, but is otherwise correct", function () {
      sandbox.stub(noSSNValidator, "isDateValid").returns(true);
      sandbox.stub(noSSNValidator, "calculateFirstChecksum").returns(false);
      sandbox.stub(noSSNValidator, "calculateSecondChecksum").returns("5");

      expect(isValid("11021599915")).to.equal(false);
    });

    it("should return false for a number where the 2nd checksum is wrong, but is otherwise correct", function () {
      sandbox.stub(noSSNValidator, "isDateValid").returns(true);
      sandbox.stub(noSSNValidator, "calculateFirstChecksum").returns("1");
      sandbox.stub(noSSNValidator, "calculateSecondChecksum").returns(false);

      expect(isValid("11021599915")).to.equal(false);
    });

    it("should return true for a correct number", function () {
      sandbox.stub(noSSNValidator, "isDateValid").returns(true);
      sandbox.stub(noSSNValidator, "calculateFirstChecksum").returns("1");
      sandbox.stub(noSSNValidator, "calculateSecondChecksum").returns("5");

      expect(isValid("11021599915")).to.equal(true);
    });
  });

  describe("getGender", function () {
    it("should return 'MALE' for 11021599915", function () {
      sandbox.stub(noSSNValidator, "isValid").returns(true);
      expect(getGender("11021599915")).to.equal(Gender.MALE);
    });

    it("should return 'FEMALE' for 88010148833", function () {
      sandbox.stub(noSSNValidator, "isValid").returns(true);
      expect(getGender("88010148833")).to.equal(Gender.FEMALE);
    });

    it("should return false for invalid number", function () {
      sandbox.stub(noSSNValidator, "isValid").returns(false);
      expect(getGender("01234567890")).to.equal(false);
    });
  });

  describe("isDateValid", function () {
    it("should return false for a January date higher than 31", function () {
      expect(isValid("320100")).to.equal(false);
    });

    it("should return false for a February date higher than 29", function () {
      expect(isValid("300200")).to.equal(false);
    });

    it("should return false for a March date higher than 31", function () {
      expect(isValid("320300")).to.equal(false);
    });

    it("should return false for a April date higher than 30", function () {
      expect(isValid("310400")).to.equal(false);
    });

    it("should return false for a May date higher than 31", function () {
      expect(isValid("320500")).to.equal(false);
    });

    it("should return false for a June date higher than 30", function () {
      expect(isValid("310600")).to.equal(false);
    });

    it("should return false for a July date higher than 31", function () {
      expect(isValid("320700")).to.equal(false);
    });

    it("should return false for a August date higher than 31", function () {
      expect(isValid("320800")).to.equal(false);
    });

    it("should return false for a September date higher than 30", function () {
      expect(isValid("310900")).to.equal(false);
    });

    it("should return false for a Octo.equalr date higher than 31", function () {
      expect(isValid("321000")).to.equal(false);
    });

    it("should return false for a November date higher than 30", function () {
      expect(isValid("311100")).to.equal(false);
    });

    it("should return false for a Desember date higher than 31", function () {
      expect(isValid("321200")).to.equal(false);
    });
  });

  describe("calculateFirstChecksum", function () {
    it("should return false for undefined", function () {
      expect(calculateFirstChecksum(undefined)).to.equal(false);
    });

    it("should return false for null", function () {
      expect(calculateFirstChecksum(null)).to.equal(false);
    });

    it("should return false for an object", function () {
      expect(calculateFirstChecksum({})).to.equal(false);
    });

    it("should return false for a number", function () {
      expect(calculateFirstChecksum(0)).to.equal(false);
    });

    it("should return false for strings less than 9 characters", function () {
      expect(calculateFirstChecksum("11021599")).to.equal(false);
    });

    it("should return false for strings more than 9 characters", function () {
      expect(calculateFirstChecksum("1102159991")).to.equal(false);
    });

    it("should return 0 for 110215981", function () {
      expect(calculateFirstChecksum("110215981")).to.equal(0);
    });

    it("should return 1 for 110215999", function () {
      expect(calculateFirstChecksum("110215999")).to.equal(1);
    });

    it("should return 2 for 110215965", function () {
      expect(calculateFirstChecksum("110215965")).to.equal(2);
    });

    it("should return 3 for 110215985", function () {
      expect(calculateFirstChecksum("110215985")).to.equal(3);
    });

    it("should return 4 for 110215977", function () {
      expect(calculateFirstChecksum("110215977")).to.equal(4);
    });

    it("should return 5 for 110215997", function () {
      expect(calculateFirstChecksum("110215997")).to.equal(5);
    });

    it("should return 6 for 110215991", function () {
      expect(calculateFirstChecksum("110215991")).to.equal(6);
    });

    it("should return 7 for 110215983", function () {
      expect(calculateFirstChecksum("110215983")).to.equal(7);
    });

    it("should return 8 for 110215975", function () {
      expect(calculateFirstChecksum("110215975")).to.equal(8);
    });

    it("should return 9 for 110215995", function () {
      expect(calculateFirstChecksum("110215995")).to.equal(9);
    });

    // Using the formula would yield 10, but 10 is not allowed as a checksum.
    it("should return false for 010100100", function () {
      expect(calculateFirstChecksum("010100100")).to.equal(false);
    });
  });

  describe("calculateSecondChecksum", function () {
    it("should return false for undefined", function () {
      expect(calculateSecondChecksum(undefined)).to.equal(false);
    });

    it("should return false for null", function () {
      expect(calculateSecondChecksum(null)).to.equal(false);
    });

    it("should return false for an object", function () {
      expect(calculateSecondChecksum({})).to.equal(false);
    });

    it("should return false for a number", function () {
      expect(calculateSecondChecksum(0)).to.equal(false);
    });

    it("should return false for strings less than 10 characters", function () {
      expect(calculateSecondChecksum("110215999")).to.equal(false);
    });

    it("should return false for strings more than 10 characters", function () {
      expect(calculateSecondChecksum("11021599915")).to.equal(false);
    });

    it("should return 0 for 1102159758", function () {
      expect(calculateSecondChecksum("1102159758")).to.equal(0);
    });

    it("should return 1 for 1102159959", function () {
      expect(calculateSecondChecksum("1102159959")).to.equal(1);
    });

    it("should return 2 for 1102159810", function () {
      expect(calculateSecondChecksum("1102159810")).to.equal(2);
    });

    it("should return 3 for 1102159975", function () {
      expect(calculateSecondChecksum("1102159975")).to.equal(3);
    });

    it("should return 4 for 1102159837", function () {
      expect(calculateSecondChecksum("1102159837")).to.equal(4);
    });

    it("should return 5 for 1102159991", function () {
      expect(calculateSecondChecksum("1102159991")).to.equal(5);
    });

    it("should return 6 for 1102159853", function () {
      expect(calculateSecondChecksum("1102159853")).to.equal(6);
    });

    it("should return 7 for 1102159715", function () {
      expect(calculateSecondChecksum("1102159715")).to.equal(7);
    });

    it("should return 8 for 1102159916", function () {
      expect(calculateSecondChecksum("1102159916")).to.equal(8);
    });

    it("should return 9 for 1102159731", function () {
      expect(calculateSecondChecksum("1102159731")).to.equal(9);
    });

    // Using the formula would yield 10, but 10 is not allowed as a checksum.
    it("should return false for 0101010000", function () {
      expect(calculateSecondChecksum("0101010000")).to.equal(false);
    });
  });
});

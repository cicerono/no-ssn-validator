import {expect} from 'chai';
import sinon from 'sinon'

var noSSNValidator = require("../lib/no_ssn_validator"),
{
  isDateValid,
  isDNumber,
  isValid,
  getGender,
  Gender,
  calculateFirstChecksum,
  calculateSecondChecksum,
  getCentury,
  getBirthDate
} = noSSNValidator

describe("noSSNValidator", () => {
  var sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("isValid", () => {

    it("should return false for undefined", () => {
      expect(isValid(undefined)).to.equal(false);
    });

    it("should return false for null", () => {
      expect(isValid(null)).to.equal(false);
    });

    it("should return false for an object", () => {
      expect(isValid({})).to.equal(false);
    });

    it("should return false for a number", () => {
      expect(isValid(0)).to.equal(false);
    });

    it("should return false for strings less than 11 characters", () => {
      expect(isValid("1107794101")).to.equal(false);
    });

    it("should return false for strings more than 11 characters", () => {
      expect(isValid("110779410120")).to.equal(false);
    });

    it("should return false for strings containing more than just digits", () => {
      expect(isValid("11a21599915")).to.equal(false);
    });

    it("should return false for a number with invalid date, but is otherwise correct", () => {
      sandbox.stub(noSSNValidator, "isDateValid").returns(false);
      sandbox.stub(noSSNValidator, "calculateFirstChecksum").returns("1");
      sandbox.stub(noSSNValidator, "calculateSecondChecksum").returns("5");

      expect(isValid("11021599915")).to.equal(false);
    });

    it("should return false for a number where the 1st checksum is wrong, but is otherwise correct", () => {
      sandbox.stub(noSSNValidator, "isDateValid").returns(true);
      sandbox.stub(noSSNValidator, "calculateFirstChecksum").returns(false);
      sandbox.stub(noSSNValidator, "calculateSecondChecksum").returns("5");

      expect(isValid("11021599915")).to.equal(false);
    });

    it("should return false for a number where the 2nd checksum is wrong, but is otherwise correct", () => {
      sandbox.stub(noSSNValidator, "isDateValid").returns(true);
      sandbox.stub(noSSNValidator, "calculateFirstChecksum").returns("1");
      sandbox.stub(noSSNValidator, "calculateSecondChecksum").returns(false);

      expect(isValid("11021599915")).to.equal(false);
    });

    it("should return true for a correct number", () => {
      sandbox.stub(noSSNValidator, "isDateValid").returns(true);
      sandbox.stub(noSSNValidator, "calculateFirstChecksum").returns("1");
      sandbox.stub(noSSNValidator, "calculateSecondChecksum").returns("5");

      expect(isValid("11021599915")).to.equal(true);
    });

    it("should return true for a correct d-number", () => {
      sandbox.stub(noSSNValidator, "isDateValid").returns(true);
      sandbox.stub(noSSNValidator, "calculateFirstChecksum").returns("5");
      sandbox.stub(noSSNValidator, "calculateSecondChecksum").returns("9");

      expect(isValid("45118036559")).to.equal(true);
    });
  });

  describe("getGender", () => {
    it("should return 'MALE' for 11021599915", () => {
      sandbox.stub(noSSNValidator, "isValid").returns(true);
      expect(getGender("11021599915")).to.equal(Gender.MALE);
    });

    it("should return 'FEMALE' for 88010148833", () => {
      sandbox.stub(noSSNValidator, "isValid").returns(true);
      expect(getGender("88010148833")).to.equal(Gender.FEMALE);
    });

    it("should return false for invalid number", () => {
      sandbox.stub(noSSNValidator, "isValid").returns(false);
      expect(getGender("01234567890")).to.equal(false);
    });
  });

  describe("isDNumber", () => {
    it("should return false if the offset is below 41", () => {
      expect(isDNumber("201185")).to.equal(false);
    });

    it("should return false if the offset it higher than 71", () => {
      expect(isDNumber("721185")).to.equal(false);
    });

    it("should return true for a valid day with 40 in offset", () => {
      expect(isDNumber("411185")).to.equal(true);
    });
  });

  describe("isDateValid", () => {
    it("should return false for a day lower than 01", () => {
      expect(isDateValid("000100")).to.equal(false);
    });

    it("should return false for a month lower than 01", () => {
      expect(isDateValid("010000")).to.equal(false);
    });

    it("should return false for a January date higher than 31", () => {
      expect(isDateValid("320100")).to.equal(false);
    });

    it("should return false for a February date higher than 29", () => {
      expect(isDateValid("300200")).to.equal(false);
    });

    it("should return false for a March date higher than 31", () => {
      expect(isDateValid("320300")).to.equal(false);
    });

    it("should return false for a April date higher than 30", () => {
      expect(isDateValid("310400")).to.equal(false);
    });

    it("should return false for a May date higher than 31", () => {
      expect(isDateValid("320500")).to.equal(false);
    });

    it("should return false for a June date higher than 30", () => {
      expect(isDateValid("310600")).to.equal(false);
    });

    it("should return false for a July date higher than 31", () => {
      expect(isDateValid("320700")).to.equal(false);
    });

    it("should return false for a August date higher than 31", () => {
      expect(isDateValid("320800")).to.equal(false);
    });

    it("should return false for a September date higher than 30", () => {
      expect(isDateValid("310900")).to.equal(false);
    });

    it("should return false for a Octo.equalr date higher than 31", () => {
      expect(isDateValid("321000")).to.equal(false);
    });

    it("should return false for a November date higher than 30", () => {
      expect(isDateValid("311100")).to.equal(false);
    });

    it("should return false for a Desember date higher than 31", () => {
      expect(isDateValid("321200")).to.equal(false);
    });

    it("should return true for a valid date", () => {
      expect(isDateValid("010101")).to.equal(true);
    });
  });

  describe("calculateFirstChecksum", () => {
    it("should return false for undefined", () => {
      expect(calculateFirstChecksum(undefined)).to.equal(false);
    });

    it("should return false for null", () => {
      expect(calculateFirstChecksum(null)).to.equal(false);
    });

    it("should return false for an object", () => {
      expect(calculateFirstChecksum({})).to.equal(false);
    });

    it("should return false for a number", () => {
      expect(calculateFirstChecksum(0)).to.equal(false);
    });

    it("should return false for strings less than 9 characters", () => {
      expect(calculateFirstChecksum("11021599")).to.equal(false);
    });

    it("should return false for strings more than 9 characters", () => {
      expect(calculateFirstChecksum("1102159991")).to.equal(false);
    });

    it("should return 0 for 110215981", () => {
      expect(calculateFirstChecksum("110215981")).to.equal(0);
    });

    it("should return 1 for 110215999", () => {
      expect(calculateFirstChecksum("110215999")).to.equal(1);
    });

    it("should return 2 for 110215965", () => {
      expect(calculateFirstChecksum("110215965")).to.equal(2);
    });

    it("should return 3 for 110215985", () => {
      expect(calculateFirstChecksum("110215985")).to.equal(3);
    });

    it("should return 4 for 110215977", () => {
      expect(calculateFirstChecksum("110215977")).to.equal(4);
    });

    it("should return 5 for 110215997", () => {
      expect(calculateFirstChecksum("110215997")).to.equal(5);
    });

    it("should return 6 for 110215991", () => {
      expect(calculateFirstChecksum("110215991")).to.equal(6);
    });

    it("should return 7 for 110215983", () => {
      expect(calculateFirstChecksum("110215983")).to.equal(7);
    });

    it("should return 8 for 110215975", () => {
      expect(calculateFirstChecksum("110215975")).to.equal(8);
    });

    it("should return 9 for 110215995", () => {
      expect(calculateFirstChecksum("110215995")).to.equal(9);
    });

    // Using the formula would yield 10, but 10 is not allowed as a checksum.
    it("should return false for 010100100", () => {
      expect(calculateFirstChecksum("010100100")).to.equal(false);
    });
  });

  describe("calculateSecondChecksum", () => {
    it("should return false for undefined", () => {
      expect(calculateSecondChecksum(undefined)).to.equal(false);
    });

    it("should return false for null", () => {
      expect(calculateSecondChecksum(null)).to.equal(false);
    });

    it("should return false for an object", () => {
      expect(calculateSecondChecksum({})).to.equal(false);
    });

    it("should return false for a number", () => {
      expect(calculateSecondChecksum(0)).to.equal(false);
    });

    it("should return false for strings less than 10 characters", () => {
      expect(calculateSecondChecksum("110215999")).to.equal(false);
    });

    it("should return false for strings more than 10 characters", () => {
      expect(calculateSecondChecksum("11021599915")).to.equal(false);
    });

    it("should return 0 for 1102159758", () => {
      expect(calculateSecondChecksum("1102159758")).to.equal(0);
    });

    it("should return 1 for 1102159959", () => {
      expect(calculateSecondChecksum("1102159959")).to.equal(1);
    });

    it("should return 2 for 1102159810", () => {
      expect(calculateSecondChecksum("1102159810")).to.equal(2);
    });

    it("should return 3 for 1102159975", () => {
      expect(calculateSecondChecksum("1102159975")).to.equal(3);
    });

    it("should return 4 for 1102159837", () => {
      expect(calculateSecondChecksum("1102159837")).to.equal(4);
    });

    it("should return 5 for 1102159991", () => {
      expect(calculateSecondChecksum("1102159991")).to.equal(5);
    });

    it("should return 6 for 1102159853", () => {
      expect(calculateSecondChecksum("1102159853")).to.equal(6);
    });

    it("should return 7 for 1102159715", () => {
      expect(calculateSecondChecksum("1102159715")).to.equal(7);
    });

    it("should return 8 for 1102159916", () => {
      expect(calculateSecondChecksum("1102159916")).to.equal(8);
    });

    it("should return 9 for 1102159731", () => {
      expect(calculateSecondChecksum("1102159731")).to.equal(9);
    });

    // Using the formula would yield 10, but 10 is not allowed as a checksum.
    it("should return false for 0101010000", () => {
      expect(calculateSecondChecksum("0101010000")).to.equal(false);
    });
  });

  describe("getCentury", () => {
    it("should return 19th century when individualNumber is less than 500", () => {
      expect(getCentury("499", "00")).to.equal(19);
    });

    it("should return 18th century when individualNumber is 500 and year is more than 54", () => {
      expect(getCentury("500", "55")).to.equal(18);
      expect(getCentury("500", "99")).to.equal(18);
    });

    it("should return 18th century when individualNumber is 749 and year is more than 54", () => {
      expect(getCentury("749", "55")).to.equal(18);
      expect(getCentury("749", "99")).to.equal(18);
    });

    it("should return 20th century when individualNumber is 500 and year is less than 40", () => {
      expect(getCentury("500", "39")).to.equal(20);
      expect(getCentury("500", "00")).to.equal(20);
    });

    it("should return 20th century when individualNumber is 999 and year is less than 40", () => {
      expect(getCentury("999", "39")).to.equal(20);
      expect(getCentury("999", "00")).to.equal(20);
    });

    it("should return 19th century when individualNumber is 900 and year is more than 39", () => {
      expect(getCentury("900", "40")).to.equal(19);
      expect(getCentury("900", "99")).to.equal(19);
    });

    it("should return 19th century when individualNumber is 900 and year is more than 39", () => {
      expect(getCentury("999", "40")).to.equal(19);
      expect(getCentury("999", "99")).to.equal(19);
    });
  });

  describe("getBirthDate", () => {
    it("should return 27-10-1964 for 27106443861", () => {
      expect(getBirthDate("27106443861")).to.deep.equal(new Date(1964, 9, 27));
    });

    it("should return 01-09-2010 for 01091096257", () => {
      expect(getBirthDate("01091096257")).to.deep.equal(new Date(2010, 8, 1));
    });

    it("should return false for invalid ssn 01234567890", () => {
      expect(getBirthDate("01234567890")).to.equal(false);
    });
  });
});

var noSSNValidator          = require("../lib/no_ssn_validator"),
    isValid                 = noSSNValidator.isValid,
    getGender               = noSSNValidator.getGender,
    calculateFirstChecksum  = noSSNValidator.calculateFirstChecksum,
    calculateSecondChecksum = noSSNValidator.calculateSecondChecksum;

describe("isValid", function () {
  it("should return false for undefined", function () {
    expect(isValid(undefined)).toBe(false);
  });

  it("should return false for null", function () {
    expect(isValid(null)).toBe(false);
  });

  it("should return false for an object", function () {
    expect(isValid({})).toBe(false);
  });

  it("should return false for a number", function () {
    expect(isValid(0)).toBe(false);
  });

  it("should return false for strings less than 11 characters", function () {
    expect(isValid("1107794101")).toBe(false);
  });

  it("should return false for strings more than 11 characters", function () {
    expect(isValid("110779410120")).toBe(false);
  });

  it("should return false for strings containing more than just digits", function () {
    expect(isValid("11a21599915")).toBe(false);
  });

  it("should return false for a number with invalid date, but is otherwise correct", function () {
    spyOn(noSSNValidator, "isDateValid").and.returnValue(false);
    spyOn(noSSNValidator, "calculateFirstChecksum").and.returnValue("1");
    spyOn(noSSNValidator, "calculateSecondChecksum").and.returnValue("5");

    expect(isValid("11021599915")).toBe(false);
  });

  it("should return false for a number where the 1st checksum is wrong, but is otherwise correct", function () {
    spyOn(noSSNValidator, "isDateValid").and.returnValue(true);
    spyOn(noSSNValidator, "calculateFirstChecksum").and.returnValue(false);
    spyOn(noSSNValidator, "calculateSecondChecksum").and.returnValue("5");

    expect(isValid("11021599915")).toBe(false);
  });

  it("should return false for a number where the 2nd checksum is wrong, but is otherwise correct", function () {
    spyOn(noSSNValidator, "isDateValid").and.returnValue(true);
    spyOn(noSSNValidator, "calculateFirstChecksum").and.returnValue("1");
    spyOn(noSSNValidator, "calculateSecondChecksum").and.returnValue(false);

    expect(isValid("11021599915")).toBe(false);
  });

  it("should return true for a correct number", function () {
    spyOn(noSSNValidator, "isDateValid").and.returnValue(true);
    spyOn(noSSNValidator, "calculateFirstChecksum").and.returnValue("1");
    spyOn(noSSNValidator, "calculateSecondChecksum").and.returnValue("5");

    expect(isValid("11021599915")).toBe(true);
  });
});

describe("getGender", function () {
  it("should return 'MALE' for 11021599915", function () {
    spyOn(noSSNValidator, "isValid").and.returnValue(true);
    expect(getGender("11021599915")).toBe("MALE");
  });

  it("should return 'FEMALE' for 88010148833", function () {
    spyOn(noSSNValidator, "isValid").and.returnValue(true);
    expect(getGender("88010148833")).toBe("FEMALE");
  });

  it("should return false for invalid number", function () {
    spyOn(noSSNValidator, "isValid").and.returnValue(false);
    expect(getGender("01234567890")).toBe(false);
  });
});

describe("isDateValid", function () {
  it("should return false for a January date higher than 31", function () {
    expect(isValid("320100")).toBe(false);
  });

  it("should return false for a February date higher than 29", function () {
    expect(isValid("300200")).toBe(false);
  });

  it("should return false for a March date higher than 31", function () {
    expect(isValid("320300")).toBe(false);
  });

  it("should return false for a April date higher than 30", function () {
    expect(isValid("310400")).toBe(false);
  });

  it("should return false for a May date higher than 31", function () {
    expect(isValid("320500")).toBe(false);
  });

  it("should return false for a June date higher than 30", function () {
    expect(isValid("310600")).toBe(false);
  });

  it("should return false for a July date higher than 31", function () {
    expect(isValid("320700")).toBe(false);
  });

  it("should return false for a August date higher than 31", function () {
    expect(isValid("320800")).toBe(false);
  });

  it("should return false for a September date higher than 30", function () {
    expect(isValid("310900")).toBe(false);
  });

  it("should return false for a October date higher than 31", function () {
    expect(isValid("321000")).toBe(false);
  });

  it("should return false for a November date higher than 30", function () {
    expect(isValid("311100")).toBe(false);
  });

  it("should return false for a Desember date higher than 31", function () {
    expect(isValid("321200")).toBe(false);
  });
});

describe("calculateFirstChecksum", function () {
  it("should return false for undefined", function () {
    expect(calculateFirstChecksum(undefined)).toBe(false);
  });

  it("should return false for null", function () {
    expect(calculateFirstChecksum(null)).toBe(false);
  });

  it("should return false for an object", function () {
    expect(calculateFirstChecksum({})).toBe(false);
  });

  it("should return false for a number", function () {
    expect(calculateFirstChecksum(0)).toBe(false);
  });

  it("should return false for strings less than 9 characters", function () {
    expect(calculateFirstChecksum("11021599")).toBe(false);
  });

  it("should return false for strings more than 9 characters", function () {
    expect(calculateFirstChecksum("1102159991")).toBe(false);
  });

  it("should return 0 for 110215981", function () {
    expect(calculateFirstChecksum("110215981")).toBe(0);
  });

  it("should return 1 for 110215999", function () {
    expect(calculateFirstChecksum("110215999")).toBe(1);
  });

  it("should return 2 for 110215965", function () {
    expect(calculateFirstChecksum("110215965")).toBe(2);
  });

  it("should return 3 for 110215985", function () {
    expect(calculateFirstChecksum("110215985")).toBe(3);
  });

  it("should return 4 for 110215977", function () {
    expect(calculateFirstChecksum("110215977")).toBe(4);
  });

  it("should return 5 for 110215997", function () {
    expect(calculateFirstChecksum("110215997")).toBe(5);
  });

  it("should return 6 for 110215991", function () {
    expect(calculateFirstChecksum("110215991")).toBe(6);
  });

  it("should return 7 for 110215983", function () {
    expect(calculateFirstChecksum("110215983")).toBe(7);
  });

  it("should return 8 for 110215975", function () {
    expect(calculateFirstChecksum("110215975")).toBe(8);
  });

  it("should return 9 for 110215995", function () {
    expect(calculateFirstChecksum("110215995")).toBe(9);
  });

  // Using the formula would yield 10, but 10 is not allowed as a checksum.
  it("should return false for 010100100", function () {
    expect(calculateFirstChecksum("010100100")).toBe(false);
  });
});

describe("calculateSecondChecksum", function () {
  it("should return false for undefined", function () {
    expect(calculateSecondChecksum(undefined)).toBe(false);
  });

  it("should return false for null", function () {
    expect(calculateSecondChecksum(null)).toBe(false);
  });

  it("should return false for an object", function () {
    expect(calculateSecondChecksum({})).toBe(false);
  });

  it("should return false for a number", function () {
    expect(calculateSecondChecksum(0)).toBe(false);
  });

  it("should return false for strings less than 10 characters", function () {
    expect(calculateSecondChecksum("110215999")).toBe(false);
  });

  it("should return false for strings more than 10 characters", function () {
    expect(calculateSecondChecksum("11021599915")).toBe(false);
  });

  it("should return 0 for 1102159758", function () {
    expect(calculateSecondChecksum("1102159758")).toBe(0);
  });

  it("should return 1 for 1102159959", function () {
    expect(calculateSecondChecksum("1102159959")).toBe(1);
  });

  it("should return 2 for 1102159810", function () {
    expect(calculateSecondChecksum("1102159810")).toBe(2);
  });

  it("should return 3 for 1102159975", function () {
    expect(calculateSecondChecksum("1102159975")).toBe(3);
  });

  it("should return 4 for 1102159837", function () {
    expect(calculateSecondChecksum("1102159837")).toBe(4);
  });

  it("should return 5 for 1102159991", function () {
    expect(calculateSecondChecksum("1102159991")).toBe(5);
  });

  it("should return 6 for 1102159853", function () {
    expect(calculateSecondChecksum("1102159853")).toBe(6);
  });

  it("should return 7 for 1102159715", function () {
    expect(calculateSecondChecksum("1102159715")).toBe(7);
  });

  it("should return 8 for 1102159916", function () {
    expect(calculateSecondChecksum("1102159916")).toBe(8);
  });

  it("should return 9 for 1102159731", function () {
    expect(calculateSecondChecksum("1102159731")).toBe(9);
  });

  // Using the formula would yield 10, but 10 is not allowed as a checksum.
  it("should return false for 0101010000", function () {
    expect(calculateSecondChecksum("0101010000")).toBe(false);
  });
});

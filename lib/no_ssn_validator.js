(function (define) {
  define("noSSNValidator", function (require, exports) {
    exports.isValid = function (number) {
      if (typeof number !== "string") {
        return false;
      }

      if (number.length !== 11) {
        return false;
      }

      if (!/^\d+$/.test(number)) {
        return false;
      }

      if (!exports.isDateValid(number.substring(0, 6))) {
        return false;
      }

      if (exports.calculateFirstChecksum(number.substring(0, 9)).toString() !== number[9]) {
        return false;
      }

      if (exports.calculateSecondChecksum(number.substring(0, 10)).toString() !== number[10]) {
        return false;
      }

      return true;
    };

    exports.getBirthDate = function (number) {
      if(exports.isValid(number)) {
        var birthDay = number.substring(0, 2);
        var birthMonth = number.substring(2, 4);
        var birthYear = number.substring(4, 6);
        var individualNumber = number.substring(6, 9);

        birthYear = exports.getCentury(individualNumber, birthYear) + birthYear;

        return birthYear + "/" + birthMonth + "/" + birthDay;
      } else {
        return false;
      }
    };

    exports.getAge = function (number) {
      if(exports.isValid(number)) {
        var birthDate = exports.getBirthDate(number);

        return exports.getAgeFromBirthDate(birthDate);
      } else {
        return false;
      }
    };

    exports.getCentury = function (individualNumber, birthYear) {
      var century;
      if (individualNumber >= 0 && individualNumber <= 499) {
        century = 19;
      } else if (individualNumber >= 500 && individualNumber <= 749 && birthYear >= 55) {
        century = 18;
      } else if (individualNumber >= 500 && individualNumber <= 999 && birthYear <= 39) {
        century = 20;
      } else if (individualNumber >= 900 && individualNumber <= 999 && birthYear >= 40) {
        century = 19;
      }
      return century;
    };

    exports.getAgeFromBirthDate = function (birthdate) {
      var differenceMs = Date.now() - new Date(birthdate).getTime();
      var ageDate = new Date(differenceMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    exports.isDateValid = function (date) {
      var day = parseInt(date.substring(0, 2)),
          month = parseInt(date.substring(2, 4)),
          monthLengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (day > monthLengths[month - 1]) {
        return false;
      }

      return true;
    };

    exports.calculateFirstChecksum = function (number) {
      if (typeof number !== "string") {
        return false;
      }

      if (number.length !== 9) {
        return false;
      }

      number = number.split("").map(function (number) {
        return parseInt(number);
      });

      var checksum =
          11
        - ( (   3 * number[0]
              + 7 * number[1]
              + 6 * number[2]
              + 1 * number[3]
              + 8 * number[4]
              + 9 * number[5]
              + 4 * number[6]
              + 5 * number[7]
              + 2 * number[8]
            )
            % 11
          );

      if (checksum === 10) {
        return false;
      }

      if (checksum === 11) {
        checksum = 0;
      }

      return checksum;
    };

    exports.calculateSecondChecksum = function (number) {
      if (typeof number !== "string") {
        return false;
      }

      if (number.length !== 10) {
        return false;
      }

      number = number.split("").map(function (number) {
        return parseInt(number);
      });

      var checksum =
          11
        - ( (   5 * number[0]
              + 4 * number[1]
              + 3 * number[2]
              + 2 * number[3]
              + 7 * number[4]
              + 6 * number[5]
              + 5 * number[6]
              + 4 * number[7]
              + 3 * number[8]
              + 2 * number[9]
            )
            % 11
          );

      if (checksum === 10) {
        return false;
      }

      if (checksum === 11) {
        checksum = 0;
      }

      return checksum;
    };
  });
}(typeof define === 'function' && define.amd ? define : function (id, factory) {
  if (typeof exports !== 'undefined') {
    factory(require, exports);
  } else {
    factory(function(value) {
      return window[value];
    }, (window[id] = {}));
  }
}));

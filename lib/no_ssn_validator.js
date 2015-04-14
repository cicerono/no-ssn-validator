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

    exports.isDateValid = function (date) {
      var day = parseInt(date.substring(0, 2)),
          month = parseInt(date.substring(2, 4)),
          monthLengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (day > monthLengths[month - 1]) {
        return false;
      }

      return true;
    };

    exports.getGender = function (number) {
      if(exports.isValid(number)) {
        var individualGenderNumber = number.substring(8, 9);
        if (individualGenderNumber % 2 === 0) {
          return "FEMALE";
        } else {
          return "MALE";
        }
      } else {
        return false;
      }
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

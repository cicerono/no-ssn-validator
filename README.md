# no-ssn-validator

no-ssn-validator is a library for validating norwegian social security numbers.
It is tested and it is AMD (Asynchronous Module Definition) compatible. It is
released by CICERO CONSULTING AS, http://www.cicero.no/, and under the MIT licence.

*Usage example*

noSSNValidator.isValid(54010199924) // true

noSSNValidator.getAge(11021599915) // 2

noSSNValidator.getBirthDate(54010199924) // "2054/01/01"
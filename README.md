# no-ssn-validator

no-ssn-validator is a library for validating Norwegian social security numbers.
It is tested and it is AMD (Asynchronous Module Definition) compatible. 

## Installation
```
$ npm install git@github.com:cicerono/no-ssn-validator-js.git
```

## Usage

### `isValid(ssn)`
```javascript
import {isValid} from 'no-ssn-validator';

isValid("01129955131") // => true
```

### `getGender(ssn)`
```javascript
import {getGender} from 'no-ssn-validator';

getGender("12037649668") // => Gender.FEMALE
getGender("01129955131") // => Gender.MALE
getGender("01234567890") // => false
```

----------------------
MIT © Cicero Consulting AS

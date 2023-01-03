# generate-rfc

Library to generate Mexican RFCs according to the specification.

## Install

```sh
npm install --save generate-rfc
```

## Usage

This library supports both ESM and CommonJS thanks to `gen-esm-wrapper`.

```js
import { generateRfc } from "generate-rfc";

const rfc = generateRfc({
  firstName: "Andres",
  secondName: "Manuel",
  lastName: "Lopez",
  secondLastName: "Obrador",
  dayOfBirth: 13,
  monthOfBirth: 11,
  yearOfBirth: 1953,
});
```

## License

MIT

Built with <3 by [bekind.software](https://bekind.software)

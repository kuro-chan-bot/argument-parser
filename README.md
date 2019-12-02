# @kuro-chan/argument-parser
[![codecov](https://codecov.io/gh/kuro-chan-bot/argument-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/kuro-chan-bot/argument-parser)

## Installation

```bash
yarn add @kuro-chan/argument-parser
# or
npm install @kuro-chan/argument-parser
```

## Usage

```typescript
import { ArgumentParser } from '@kuro-chan/argument-parser'

const parser = new ArgumentParser({
  stringChars: [`'`, `"`],
  escapeChars: [`\\`],
  separatorChars: [' '],
  trueStrings: [`true`],
  falseStrings: [`false`]
})
const args = parser.parse(`text 'text' "text" text\\ text \\'text\\' \\"text\\" 0 10 0xff true false`)

console.log(args) //[ 'text', 'text', 'text', 'text text', '\'text\'', '"text"', 0, 10, 255, true, false ]
```

import { ArgumentParserInterface } from '../../interfaces/ArgumentParser'
import { ValueType } from '../../types/ValueType'
import { ArgumentParserOptions } from '../../interfaces/ArgumentParserOptions'

/*
 * Argument parser.
 */
export class ArgumentParser implements ArgumentParserInterface {
  /**
   * Default options.
   */
  static readonly defaultOptions: ArgumentParserOptions = {
    stringChars: [`'`, `"`],
    escapeChars: [`\\`],
    separatorChars: [' '],
    trueStrings: [`true`],
    falseStrings: [`false`]
  }

  mOptions: ArgumentParserOptions = ArgumentParser.defaultOptions

  /**
   * Options.
   */
  get options() {
    return this.mOptions
  }

  /**
   * Argument parser constructor.
   *
   * @param options
   */
  constructor(
    options: Partial<ArgumentParserOptions> = ArgumentParser.defaultOptions
  ) {
    const computedOptions = {
      ...this.mOptions,
      ...options
    }
    this.mOptions = computedOptions
  }

  /**
   * Parse arg string.
   */
  parse(string: string) {
    let values: ValueType[] = []
    let isString = false
    let stringChar = ''
    let isEscape = false
    let content = ''
    const length = string.length

    for (let index = 0; index < length; ++index) {
      const char = () => string[index]
      let escapeStart = false

      if (this.isStringChar(char()) && !isEscape) {
        if (isString && char() === stringChar) {
          values.push(content)
          content = ''
          isString = false
        } else {
          stringChar = char()
          isString = true
        }
      } else if (isString) {
        content += char()
      } else {
        if (this.isEscapeChar(char()) && !isEscape) {
          isEscape = true
          escapeStart = true
        } else if (
          !this.isSeparatorChar(char()) ||
          (this.isSeparatorChar(char()) && isEscape)
        ) {
          content += char()
        }

        if (
          (this.isSeparatorChar(char()) && !isEscape) ||
          index === length - 1
        ) {
          if (content !== '') {
            if (!isNaN(Number(content))) {
              values.push(Number(content))
            } else if (this.isTrueString(content)) {
              values.push(true)
            } else if (this.isFalseString(content)) {
              values.push(false)
            } else {
              values.push(content)
            }

            content = ''
          }
        }
      }

      if (!escapeStart) {
        isEscape = false
      }
    }

    return values
  }

  /**
   * Check contain.
   */
  private checkContain(chars: string[], char: string) {
    return chars.findIndex(v => v === char) !== -1
  }

  /**
   * Check is string char.
   */
  private isStringChar(char: string) {
    return this.checkContain(this.options.stringChars, char)
  }

  /**
   * Check is espace char.
   */
  private isEscapeChar(char: string) {
    return this.checkContain(this.options.escapeChars, char)
  }

  /**
   * Check is separator char.
   */
  private isSeparatorChar(char: string) {
    return this.checkContain(this.options.separatorChars, char)
  }

  /**
   * Check is true string.
   */
  private isTrueString(char: string) {
    return this.checkContain(this.options.trueStrings, char)
  }

  /**
   * Check is false string.
   */
  private isFalseString(char: string) {
    return this.checkContain(this.options.falseStrings, char)
  }
}

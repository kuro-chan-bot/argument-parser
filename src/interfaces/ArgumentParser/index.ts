import { ValueType } from '../../types/ValueType'
import { ArgumentParserOptions } from '../ArgumentParserOptions'

/*
 * Argument parser interface.
 */
export interface ArgumentParserInterface {
  /**
   * Options.
   */
  readonly options: ArgumentParserOptions

  /**
   * Parse.
   */
  parse(string: string): ValueType[]
}

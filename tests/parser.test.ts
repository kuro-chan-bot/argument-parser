import { ArgumentParser } from '../src/classes/ArgumentParser'

describe('Parser test', () => {
  it('Parse arg string.', () => {
    const parser = new ArgumentParser()
    const args = parser.parse(
      `text 'text' "text" text\\ text \\'text\\' \\"text\\" 0 10 0xff true false`
    )

    expect(args[0]).toBe('text')
    expect(args[1]).toBe('text')
    expect(args[2]).toBe('text')
    expect(args[3]).toBe('text text')
    expect(args[4]).toBe(`'text'`)
    expect(args[5]).toBe(`"text"`)
    expect(args[6]).toBe(0)
    expect(args[7]).toBe(10)
    expect(args[8]).toBe(0xff)
    expect(args[9]).toBe(true)
    expect(args[10]).toBe(false)
  })

  it('Custom parser.', () => {
    const parser = new ArgumentParser({
      stringChars: ['`'],
      escapeChars: ['¥'],
      separatorChars: [','],
      trueStrings: ['true', 'on'],
      falseStrings: ['false', 'off']
    })
    const args = parser.parse('`text`,¥`,true,on,false,off')

    expect(args[0]).toBe('text')
    expect(args[1]).toBe('`')
    expect(args[2]).toBe(true)
    expect(args[3]).toBe(true)
    expect(args[4]).toBe(false)
    expect(args[5]).toBe(false)
  })
})

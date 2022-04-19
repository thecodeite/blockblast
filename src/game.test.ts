import {
  CellColumn,
  convertColumnToChunks,
  CreateCellFunc,
  pivotArray,
} from './game'

test('pivotArray to give columns in reverse', () => {
  const input = ['ghi', 'def', 'abc']

  expect(pivotArray(input, 3)).toStrictEqual([
    ['g', 'd', 'a'],
    ['h', 'e', 'b'],
    ['i', 'f', 'c'],
  ])
})

const createCell: CreateCellFunc = () => null

// __aa_bbb_cc__
describe('convertColumnToChunks', () => {
  test('simple', () => {
    const input = 'aaaa'.split('')

    const coll1: CellColumn = {
      length: 4,
      start: 0,
      bottom: true,
    }

    const chunks = convertColumnToChunks(0, input, createCell)
    expect(chunks).toStrictEqual([coll1])
  })

  test('missing top', () => {
    const input = '____aa'.split('')

    const coll1: CellColumn = {
      length: 2,
      start: 4,
      bottom: true,
    }

    const chunks = convertColumnToChunks(0, input, createCell)
    expect(chunks).toStrictEqual([coll1])
  })
  test('missing bottom', () => {
    const input = 'aa____'.split('')

    const coll1: CellColumn = {
      length: 2,
      start: 0,
      bottom: true,
    }

    const chunks = convertColumnToChunks(0, input, createCell)
    expect(chunks).toStrictEqual([coll1])
  })

  test('middle', () => {
    const input = '___aa___'.split('')

    const coll1: CellColumn = {
      length: 2,
      start: 3,
      bottom: true,
    }

    const chunks = convertColumnToChunks(0, input, createCell)
    expect(chunks).toStrictEqual([coll1])
  })

  test('missing middle', () => {
    const input = 'aa___aa'.split('')

    const coll1: CellColumn = {
      length: 2,
      start: 0,
      bottom: false,
    }

    const coll2: CellColumn = {
      length: 2,
      start: 5,
      bottom: true,
    }

    const chunks = convertColumnToChunks(0, input, createCell)
    expect(chunks).toStrictEqual([coll1, coll2])
  })
  test('Complet', () => {
    const input = '__rr_ggg_bb__'.split('')

    const coll1: CellColumn = {
      length: 2,
      start: 2,
      bottom: false,
    }

    const coll2: CellColumn = {
      length: 3,
      start: 5,
      bottom: false,
    }

    const coll3: CellColumn = {
      length: 2,
      start: 9,
      bottom: true,
    }

    const chunks = convertColumnToChunks(0, input, createCell)
    expect(chunks).toStrictEqual([coll1, coll2, coll3])
  })
})

describe('createCell', () => {})

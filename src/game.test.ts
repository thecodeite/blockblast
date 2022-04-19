import {
  CellColumn,
  convertColumnToChunks,
  CreateCellFunc,
  createOffsets,
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

describe('createHoles', () => {
  test('no holes', () => {
    expect(createOffsets('rrrrr')).toStrictEqual([
      ...[0, 1, 2, 3, 4], // board
      ...[5, 6, 7, 8, 9], // head
    ])
  })

  test('bottom hole', () => {
    expect(createOffsets('rrrr_')).toStrictEqual([
      ...[1, 2, 3, 4], // board
      ...[5, 6, 7, 8], // head
    ])
  })

  test('bottom double hole', () => {
    expect(createOffsets('rrr__')).toStrictEqual([
      ...[2, 3, 4], // boardd
      ...[5, 6, 7], // head
    ])
  })

  test('top hole', () => {
    expect(createOffsets('_rrrr')).toStrictEqual([
      ...[0, 1, 2, 3], // board
      ...[5, 6, 7, 8], // head
    ])
  })

  test('top double hole', () => {
    expect(createOffsets('__rrr')).toStrictEqual([
      ...[0, 1, 2], // boardd
      ...[5, 6, 7], // head
    ])
  })

  test('top & bottom hole', () => {
    expect(createOffsets('_rrr_')).toStrictEqual([
      ...[1, 2, 3], // board
      ...[5, 6, 7], // head
    ])
  })

  test('double top & bottom hole', () => {
    expect(createOffsets('__r__')).toStrictEqual([
      ...[2], // board
      ...[5], // head
    ])
  })

  test('hole in middle', () => {
    expect(createOffsets('rr_rr')).toStrictEqual([
      ...[0, 1, 3, 4], // board
      ...[5, 6, 7, 8], // head
    ])
  })
  test('triple hole in middle', () => {
    expect(createOffsets('r___r')).toStrictEqual([
      ...[0, 4], // board
      ...[5, 6], // head
    ])
  })

  test('three holes', () => {
    expect(createOffsets('_r_r_')).toStrictEqual([
      ...[1, 3], // board
      ...[5, 6], // head
    ])
  })
})

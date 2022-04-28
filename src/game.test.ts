import { createOffsets } from './game'

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

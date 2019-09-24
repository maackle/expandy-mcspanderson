const test = require('tape')
const sinon = require('sinon')

import { expand } from '../src'

test('simple', t => {
  const seed = {
    a: 1,
    b: x => ({
      c: x,
      d: x,
    })
  }
  t.deepEqual(expand(seed, 2), {
    a: 1,
    b: {
      c: 2,
      d: 2,
    }
  })
  t.end()
})

test('withArrays', t => {
  const seed = {
    a: 0,
    b: [
      {
        c: 11,
        d: [x => x * 2, { e: [] }, x => x * 3]
      },
      x => x * 4
    ]
  }

  t.deepEqual(expand(seed, 11), {
    a: 0,
    b: [
      {
        c: 11,
        d: [22, { e: [] }, 33]
      },
      44
    ]
  })
  t.end()
})

test('nestedFunctions', t => {
  const seed = {
    cx: 11,
    vx: a => ({
      cy: a,
      vy: b => ({
        cz: a + b,
      })
    })
  }

  t.deepEqual(expand(seed, 11), {
    cx: 11,
    vx: {
      cy: 11,
      vy: {
        cz: 22,
      }
    }
  })
  t.end()
})

test('array base', t => {
  const seed = [x => [x]]

  t.deepEqual(expand(seed, 11), [[11]])
  t.end()
})

test('infinitude', t => {
  const r = x => r

  const seed = r

  t.throws(() => expand(seed, 11), /Max iterations.*/)
  t.end()
})
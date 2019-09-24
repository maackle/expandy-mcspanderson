import * as R from 'ramda'

const MAX_ITERATIONS = 1000

export const expand = (o, a) => {

  let iters = 0

  const go = o => {
    if (iters++ >= MAX_ITERATIONS) {
      throw new Error(`Max iterations of ${MAX_ITERATIONS} reached`)
    }
    return R.is(Function, o)
      ? go(o(a))
      : R.is(Array, o)
        ? R.map(go, o)
        : R.is(Object, o)
          ? R.pipe(
            R.toPairs,
            R.map(([key, val]) => {
              return [key, go(val)]
            }),
            R.fromPairs
          )(o)
          : o
  }

  return go(o)
}

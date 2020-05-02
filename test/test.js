/* globals describe, it */

const assert = require('assert')

const deep = require('..')

const data = {
  operator: {
    id: '1234'
  },
  basket: [
    {
      id: '9876'
    }
  ],
  country: 'dk',
  foo: [
    [
      {
        bar: {
          baz: [
            'hello world'
          ]
        }
      }
    ]
  ]
}

describe('get', function () {
  it('should be able to run', function () {
    assert.doesNotThrow(function () {
      deep.getDeep(data, 'operator.id')
    })
  })

  it('should return correct value', function () {
    assert.strictEqual(deep.getDeep(data, 'operator.id'), '1234')
  })

  it('should not throw on undefined', function () {
    assert.doesNotThrow(function () {
      deep.getDeep(data, 'operator.fieldDoesNotExist.property')
    })
  })

  it('should return undefined when field does not exist', function () {
    assert.strictEqual(deep.getDeep(data, 'operator.fieldDoesNotExist.property'), undefined)
  })
})

describe('set', function () {
  it('should be able to run', function () {
    assert.doesNotThrow(function () {
      deep.setDeep(data, 'operator.id', '9876')
    })
  })

  it('should set the correct value', function () {
    const result = deep.setDeep(data, 'operator.id', '7913')
    assert.strictEqual(result.operator.id, '7913')
  })

  it('should set the correct value advanced', function () {
    const result = deep.setDeep(data, 'foo[0][0].bar.baz[0]', 'goodbye world')
    assert.strictEqual(result.foo[0][0].bar.baz[0], 'goodbye world')
  })

  it.skip('should set the correct value even when value does not exist', function () {
    const result = deep.setDeep(data, 'that[0][1].value.doesNotExist[0]', 'but now it does')
    console.log(result)
    assert.strictEqual(result.that[0][1].value.doesNotExist[0], 'but now it does')
  })
})

describe('flatten', function () {
  it('should be able to run', function () {
    assert.doesNotThrow(function () {
      deep.flatten(data)
    })
  })

  it('should return correct value', function () {
    assert.deepStrictEqual(deep.flatten(data), {
      'operator.id': '1234',
      'basket[0].id': '9876',
      country: 'dk',
      'foo[0][0].bar.baz[0]': 'hello world'
    })
    assert.doesNotThrow(function () {
      deep.flatten(data)
    })
  })
})

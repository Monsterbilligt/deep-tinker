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
})

describe('set', function () {
  it('should be able to run', function () {
    assert.doesNotThrow(function () {
      deep.setDeep(data, 'operator.id', '9876')
    })
  })
})

describe('flatten', function () {
  it('should be able to run', function () {
    assert.doesNotThrow(function () {
      deep.flatten(data)
    })
  })
})

function replaceRecursive (obj, path, value) {
  const hasChildren = path.length > 0

  if (hasChildren) {
    if (Array.isArray(obj)) {
      return obj.map(function (item, index) {
        if (index === parseInt(path[0], 10)) {
          replaceRecursive(
            item,
            path.slice(1),
            value
          )
        } else {
          return item
        }
      })
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.assign({}, obj, {
        [path[0]]: replaceRecursive(
          obj[path[0]],
          path.slice(1),
          value
        )
      })
    }
  } else {
    return value
  }
}

exports.setDeep = function setDeep (obj, field, value) {
  const path = field.replace(/\[/g, '.').replace(/]/g, '').split('.')

  return replaceRecursive(obj, path, value)
}

exports.getDeep = function getDeep (obj, path) {
  const parts = path.replace(/\[/g, '.').replace(/]/g, '').split('.')

  const item = parts.reduce((acc, val) => {
    const next = acc[val]

    return next
  }, obj)

  return item
}

exports.flatten = function flatten (obj, suffix = '') {
  /*
    Inspired by https://stackoverflow.com/a/53739792
    but modified to better support arrays
  */

  const toReturn = {}
  const objKeys = Object.keys(obj)

  objKeys.forEach(i => {
    if (!obj.hasOwnProperty(i)) return

    if (Array.isArray(obj[i])) {
      const flatObject = flatten(obj[i], ']')
      const flatObjKeys = Object.keys(flatObject)
      flatObjKeys.forEach(x => {
        if (!flatObject.hasOwnProperty(x)) return

        toReturn[i + suffix + '[' + x] = flatObject[x]
      })
    } else if ((typeof obj[i]) === 'object' && obj[i] !== null) {
      var flatObject = flatten(obj[i])
      const flatObjKeys = Object.keys(flatObject)
      flatObjKeys.forEach(x => {
        if (!flatObject.hasOwnProperty(x)) return

        toReturn[i + suffix + '.' + x] = flatObject[x]
      })
    } else {
      toReturn[i + suffix] = obj[i]
    }
  })

  return toReturn
}

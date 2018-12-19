function sortObjectBy (obj, param) {
  var arr = []
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      arr.push({
        'id': prop,
        'value': obj[prop]
      })
    }
  }
  arr.sort(function (a, b) { return b.value[param] - a.value[param] })
  return arr
}

export default sortObjectBy

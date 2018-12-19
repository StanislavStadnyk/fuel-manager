function odometerDifference (arrRecords) {
  // adding of a difference property for each record
  for (let i = 0; i < arrRecords.length; i++) {
    let current = arrRecords[i]
    let prev
    let difference = 0

    if (i < arrRecords.length - 1) {
      prev = arrRecords[i + 1]
      difference = current.value.odometer - prev.value.odometer
    }

    arrRecords[i]['value']['difference'] = difference
  }

  return arrRecords
}

export default odometerDifference

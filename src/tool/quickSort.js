export default function (dataArray) {

  function partition(begin, end) {

    // 把起点作为判断点
    let left = begin, right = end + 1

    let compareData = dataArray[begin]
    while (true) {

      // left左边的值比判断点小
      do {
        left += 1
      } while (dataArray[left] < compareData && left < end)

      // right右边的值比判断点小
      do {
        right -= 1
      } while (dataArray[right] > compareData)

      // 如果交叉了，判断完毕
      if (left >= right) break

      // 停止意味着需要交换left和right坐标对应的值
      let temp = dataArray[left]
      dataArray[left] = dataArray[right]
      dataArray[right] = temp

    }

    // 由于起点作为划分标准，和分界线的值进行交换
    dataArray[begin] = dataArray[right]
    dataArray[right] = compareData

    // 返回划分点的坐标
    return right
  }

  function quickSort(begin, end) {
    if (begin < end) {
      let splitIndex = partition(begin, end)
      quickSort(begin, splitIndex - 1)
      quickSort(splitIndex + 1, end)
    }
  }

  quickSort(0, dataArray.length - 1)

  return dataArray;
}
export default function (file) {
  return new Promise(resolve => {

    // 创建audio结点
    let audioElement = new Audio(URL.createObjectURL(file))

    // 数据加载完毕后获取时长
    audioElement.addEventListener("loadedmetadata", function (_event) {
      resolve(audioElement.duration)
    })

  })
}
import formatTime from "../../tool/formatTime"

export default [function () {
  return {
    region: {
      default(render) {
        let dist = (this._width - 60) / this.time
        for (let index in this.splits) {
          let split = this.splits[index]
          render(index).beginPath()
            .moveTo(25 + split * dist, this._height - 30)
            .lineTo(35 + split * dist, this._height - 30)
            .lineTo(35 + split * dist, this._height - 20)
            .lineTo(25 + split * dist, this._height - 20)
            .fill()
        }
      }
    },
    link: function (painter) {

      painter.config({
        'textAlign': 'center',
        'font-size': 14
      })

      // 每一秒的间距
      // (上下左右留白30)
      let dist = (this._width - 60) / this.time

      for (let index = 0; index < this.time; index += 10) {

        if (index % 60 == 0) {
          painter
            .fillRect(index * dist + 29.5, this._height - 30, 1, -25)
            .fillText(index / 60 + ":00", index * dist + 29, 30)
        } else {
          painter.fillRect(index * dist + 29.5, this._height - 30, 1, -10)
        }

      }

      // 绘制底下线条
      painter.beginPath()
        .moveTo(30, this._height - 30)
        .lineTo(this._width - 30, this._height - 30)
        .stroke()

      // 绘制切割标志
      painter.config({
        'fillStyle': 'red'
      })

      for (let split of this.splits) {

        // 绘制底部的箭头
        painter.beginPath()
          .moveTo(30 + split * dist, this._height - 30)
          .lineTo(35 + split * dist, this._height - 20)
          .lineTo(25 + split * dist, this._height - 20)
          .fill()

        // 绘制底部的时间
        painter.fillText(formatTime(split), 30 + split * dist, this._height - 10)
      }

    }
  }
}]
export default {
  data: {
    big_title: {},
    small_title: []
  },
  onReady() {
    var showId = '__showId__'
    var result = '__result__'
    var msg = '__result.msg__'
    var msg = '__cubeName + "|" + result.msg__'
    var id = '__getId()__'
    this.request({
      api: "detail",
      complete: (defaultData, res) => {
        if (!res || res.errno != 0 || !res.data) {
          this.failback(defaultData)
          return;
        }
        this.dataHandle(res.data)
        this.setStorage({
          key: 'data',
          data: res.data
        })
      },
      fail: (res) => {
        this.failback(res)
      }
    });
  },
  failback(defaultData) {
    this.getStorage({
      key: 'data',
      success: (res) =>{
        res = res || defaultData
        this.dataHandle(res)
      }
    })
  },
  dataHandle({big_title, small_title}) {
    this.setData({
      big_title,
      small_title
    })
  }
};
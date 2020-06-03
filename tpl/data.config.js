module.exports = function (options) {

  var offlineData = {
    "big_title": {
      "article_id": "KtjZPhS3MHv3Pw",
      "title": "2020助理执业中医师资格考试报考条件",
      "url": "https://news.edu.360.cn/article/detail/KtjZPhS3MHv3Pw"
    },
    "small_title": [
      {
        "article_id": "MdTZPhS2NHS5Ow",
        "title": "执业药师重点药：黄芩的功效与性能特点！",
        "url": "https://news.edu.360.cn/article/detail/MdTZPhS2NHS5Ow"
      },
      {
        "article_id": "KAfaQBS1MHC6PD",
        "title": "2020儿科中级职称考试报名时间",
        "url": "https://news.edu.360.cn/article/detail/KAfaQBS1MHC6PD"
      },
      {
        "article_id": "KAHdPhS0L3z4Pj",
        "title": "复杂的中医病名该怎么理解？如何对应西医病名",
        "url": "https://news.edu.360.cn/article/detail/KAHdPhS0L3z4Pj"
      },
      {
        "article_id": "KtbUPxS0L3vBOw",
        "title": "2020执业药师报考科目+报考费用+报考入口！",
        "url": "https://news.edu.360.cn/article/detail/KtbUPxS0L3vBOw"
      },
      {
        "article_id": "MdPXRBSzNXW8Pj",
        "title": "中医药的战“疫”力量！高等中医药教育的前世今生",
        "url": "https://news.edu.360.cn/article/detail/MdPXRBSzNXW8Pj"
      }
    ]
  };

  const config = [
    {
      project: {
        dirName: 'game'
      },
      cube: {
        id: 'game-id',
        version: '1.0.1',
        name: 'game-name',
        idn: 'game-idn'
      },
      api: {
        host: 'https://groot.hao.360.cn/api/cube/articleList',
        offlineData
      },
      data: {
        cubeName: 'game-cube-name',
        showId: 'XXXXXX',
        result: {
          msg: "success"
        },
        offlineData
      }
    },
    {
      project: {
        dirName: 'edu'
      },
      cube: {
        id: 'edu-id',
        version: '1.1.0',
        name: 'edu-name',
        idn: 'edu-idn'
      },
      api: {
        host: 'https://groot.hao.360.cn/api/cube/articleList',
        offlineData
      },
      data: {
        cubeName: 'edu-cube-name',
        showId: 'XXXXXX',
        result: {
          msg: "success"
        },
        offlineData
      }
    },
  ];

  return config;
}
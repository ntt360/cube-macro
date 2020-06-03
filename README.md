# cube-macro
cube-macro是一个实验性质的批量生成同类cube的工具

## 安装

npm安装

```
npm install --save-dev git+https://github.com/ntt360/cube-macro.git
```


## 使用

创建tpl目录（或自定义模板目录），并创建模板文件，可通过`__key__`形式定义需要替换的占位符。

在tpl下创建配置文件`data.config.js`。

通过npm script运行`cube-macro -t ./tpl -o ./dist`

注：可通过cubetool工具来创建模板：
```
cubetool init <cubeid> -t https://github.com/ntt360/cube-tpl-news-1headtext5text.git
```

## 配置文件说明

```
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
      // 项目相关配置
      project: {
        dirName: 'game' // 定义输出目录名称，
      },
      // 针对cube.json数据配置
      cube: {
        id: 'game-id',
        version: '1.0.1',
        name: 'game-name',
        idn: 'game-idn'
      },
      // 针对api.json数据配置
      api: {
        host: 'https://groot.hao.360.cn/api/cube/articleList',
        offlineData
      },
      // 对src下数据配置，数据替换已忽略二进制文件
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

  // 异步获取配置数据可返回promise
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(config)
  //   }, 1000);
  // });

}
```

## 模板定义

```
var showId = '__showId__'
var offlineData = '__offlineData__'
var result = '__result__'
var msg = '__result.msg__'
```

## 生成

```
var showId = 'XXXXXX'
var offlineData = {"big_title":{"article_id":"KtjZPhS3MHv3Pw","title":"2020助理执业中医师资格考试报考条件","url":"https://news.edu.360.cn/article/detail/KtjZPhS3MHv3Pw"},"small_title":[{"article_id":"MdTZPhS2NHS5Ow","title":"执业药师重点药：黄芩的功效与性能特点！","url":"https://news.edu.360.cn/article/detail/MdTZPhS2NHS5Ow"},{"article_id":"KAfaQBS1MHC6PD","title":"2020儿科中级职称考试报名时间","url":"https://news.edu.360.cn/article/detail/KAfaQBS1MHC6PD"},{"article_id":"KAHdPhS0L3z4Pj","title":"复杂的中医病名该怎么理解？如何对应西医病名","url":"https://news.edu.360.cn/article/detail/KAHdPhS0L3z4Pj"},{"article_id":"KtbUPxS0L3vBOw","title":"2020执业药师报考科目+报考费用+报考入口！","url":"https://news.edu.360.cn/article/detail/KtbUPxS0L3vBOw"},{"article_id":"MdPXRBSzNXW8Pj","title":"中医药的战“疫”力量！高等中医药教育的前世今生","url":"https://news.edu.360.cn/article/detail/MdPXRBSzNXW8Pj"}]}
var result = {"msg":"success"}
var msg = 'success'
```
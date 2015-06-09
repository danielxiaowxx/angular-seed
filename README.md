## 开发前的准备

```
npm install && bower install && gulp pre-dev
```

## 开始开发

gulp develop (如果用80端口，liunx, mac系统要用sudo)


## 新增第三方依赖库

1. 修改gulpfile.js中的jsLib变量相关内容

2. gulp gen-js-lib-dev

## 新增ICON

gulp sprites

然后增加相应的icon-**样式

## 新增图片

gulp move-assets

## 项目部署

```
npm run deploy
```

## 功能模块化

components为功能模块化，里面的模块可独立出来，运行在任何的基于bootstrap的angular项目

## 增加功能模块

在components中增加模块，对模块有以下要求

1. 模块主js文件的名称跟模块名必须一致，如bvo-home.js的模块名为bvo-home

2. 目录结构为

           -assets

             -less

             -images

             -partials

           -controllers

           [module name].js

## IE兼容

1. 不要用自定义tag，directive全部用属性的形式声明
2. 用ng-style，不要用style="{{}}"

## 性能提升

只读字段的显示用bindonce

## TODO

1. gm-boostrap-enhance独立出一个单独项目
2. app-modify-bootstrap可以独立出来，作为GM后台前端针对bootstrap和gm-bootstrap-enhance的一个样式覆盖
3. components中的功能模块独立化（暂时不需要，等模块有需要迁移或出现在不同项目中时才需要此动作）
4. directives中的组件要独立出来，然后发布到private-bower上


## 开发前的准备

1. npm install && bower install && gulp

2. 修改hosts文件：127.0.0.1 **.globalmarket.com

        如：127.0.0.1 local.bvo.globalmarket.com

## 开始开发

1. gulp develop (liunx, mac系统要用sudo，因为用了80端口)

2. 打开sit.like.globalmarket.com，然后用买家账号登录（测试账号：dylan.huang@corp.globalmarket.com 密码：abc123）

3. 打开local.bvo.globalmarket.com即可

## 新增第三方依赖库

1. 修改gulpfile.js中的jsLib变量相关内容

2. gulp gen-js-lib-dev

## 新增ICON

gulp sprites

然后增加相应的icon-**样式

## 新增图片

gulp move-assets

## 项目部署

1. npm run deploy

2. 服务器proxy规则

        # for talknow
        location ~ ^/ft/plugins{
            rewrite  /ft/(.*)$ /sns/$1 break;
            proxy_pass http://static.globalmarket.com;
        }
        location ~ ^/like{
            proxy_next_upstream http_502 http_504 error timeout;
            proxy_set_header  Host $host;
            proxy_headers_hash_max_size 1024;
            proxy_headers_hash_bucket_size 128;
            proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Accept-Encoding "";
            proxy_pass http://like.globalmarket.com;
        }

        location ~ ^/gmdms2{
            proxy_next_upstream http_502 http_504 error timeout;
            proxy_set_header  Host $host;
            proxy_headers_hash_max_size 1024;
            proxy_headers_hash_bucket_size 128;
            proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Accept-Encoding "";
            proxy_pass [gmdms2 server];
        }

        location ~ ^/user/{
            proxy_set_header  Host $host;
            proxy_pass [bvo_backend_server];
        }

        location ~ ^/(buyerRestService|commonRestService)/{
            rewrite /(buyerRestService|commonRestService)/(.*)$ /$2 break;
            proxy_next_upstream http_502 http_504 error timeout;
            proxy_set_header  Host $host;
            proxy_headers_hash_max_size 1024;
            proxy_headers_hash_bucket_size 128;
            proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Accept-Encoding "";
            proxy_pass [bvo_backend_server];
        }

        location ~ "/|version[0-9a-z]{6}/"{
            rewrite "/version[0-9a-z]{6}/(.*)$" /$1 break;
            proxy_set_header  Host $host;
            proxy_pass [bvo_frontend_server];
        }

## 功能模块化

components为功能模块化，里面的模块可独立出来，运行在任何的基于bootstrap的angular项目

## 增加功能模块

在components中增加模块，对模块有以下要求

1. 模块主js文件的名称跟模块名必须一致，如bvo-home.js的模块名为bvo-home

2. 目录结构为

           -assets

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
4. services中的buyer-rest-service和common-rest-service需要独立出单独的模块项目（目前由于该独立模块自动发布有些问题，由于项目时间原因，暂时放一放）
5. directives中的组件要独立出来，然后发布到private-bower上


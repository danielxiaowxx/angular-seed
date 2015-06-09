上线准备：

1. nginx配置，指向前端和后端服务 (ok)

2. 订单API服务（miles）(ok)

3. GMCpay API服务 (hyden) (ok)

4. 银行信息API服务 (hank) (ok)

5. 搭建用于GMCPay redis 服务器 (ok)

6. 检查生产环境的配置（config-prd.js, config-prd-US.js）(ok hank端口未确定)

7. bvo_front_end deploy: clone project, run: npm run deploy and start server (main.js) (ok)

8. bvo_back_end deploy: clone project, run : npm run deploy and start server (main.js) (ok)

9. 如果要上美国生产，需要美国服务也写memcache

10. order.globalmarket.com域名指向修改 (ok)

11. 检查talknow有没放开





=============================================

TODO

1. 用按钮转到某个URL时菜单未能正常显示其状态
2. restify输出JS文件还是有潜在的问题


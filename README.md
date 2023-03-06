# Hixtrip Online Quiz

## 准备

- fork 此仓库
- 根据如下要求实现相关代码
- 完成要求
  - 提交`pull request`
  - 提供页面截图

## 需求

1. 目前已经有`src/api/user.ts` 以及 `src/api/org.ts` 两个 API
2. 需要实现如下效果界面：

![](./docs/preview.jpg)

> 功能要求：
- 需要拆分 `OrgTree` 以及 `UserTable` 两个组件
  - 体现两个组件的互相通信
- 组织架构根据点上级节点进行查询子级节点实现异步加载。
- 用户 Table 数据跟据点击 组织架构树形节点 以及 输入搜索关键字 查询。
- 风格不限
  - 可以使用 ```UI Framework```, 如 ```ant-design```, ```element-ui```等
  - 如果不用```UI Framework```, 可以直接用原生的```<ul> <li>```, ```<table>``` 实现，不用实现相关的CSS样式, 可以加分。

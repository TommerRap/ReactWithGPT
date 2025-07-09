# ⚠️ 本文件为唯一记忆源， ChatGPT一旦想写入任何全局记忆，都应该先问我，来决定究竟是写入全局记忆还是更新在文档中。严禁！！在未询问我的情况下写入全局记忆。

## 📝 英文拼写风格约定（Tommer 专属）

- 所有笔记、注释、文档说明等**非代码关键字内容**，统一使用**新西兰（英式）拼写风格**。
- 示例包括：
  - `modularisation` ✅ / `modularization` ❌
  - `analyse` ✅ / `analyze` ❌
  - `centre` ✅ / `center` ❌
  - `initialise` ✅ / `initialize` ❌
- 若特定术语在技术生态中已广泛使用美式拼写（如 React 官方文档中的 `modularization`），可保留原文不替换。

[TOC]



# 🧠 React Bootcamp 课程总纲（Tommer 专属）

## 📚 教学总计划章节列表（含后端交互插入点）

| 章节编号 | 章节名称               | 学习目标描述                   | 后端交互点（与.NET结合）                                     |
| -------- | ---------------------- | ------------------------------ | ------------------------------------------------------------ |
| 1        | HTML & CSS 速通回顾    | 能写出静态页面布局             | 无                                                           |
| 2        | JavaScript 核心语法    | 掌握 ES6+ 基础语法             | 无                                                           |
| 3        | JavaScript DOM & 事件  | 操作网页元素与事件绑定         | 无                                                           |
| 4        | 模块化与开发环境       | 会配置项目和模块拆分           | 使用 Vite + Axios 配置跨域、封装 API 模块（对接 .NET Controller） |
| 5        | React 入门             | 理解组件、JSX、props、state    | 使用 mock API 模拟从后端获取数据填入组件                     |
| 6        | 条件渲染与列表渲染     | 会写动态组件渲染               | 使用 API 获取 programme 列表并渲染                           |
| 7        | 表单处理               | 掌握受控组件和事件处理         | 表单数据提交给 .NET 后端，创建记录                           |
| 8        | useEffect 与生命周期   | 异步加载数据、依赖项变化       | 使用 useEffect 调用后端接口加载数据（如 programme detail）   |
| 9        | 组件组织与状态提升     | 状态提升 + props 传递          | 拆分与组合真实模块组件，数据流整理                           |
| 10       | React Router           | 多页面跳转与嵌套路由           | 基于 programme ID 实现动态路由 + fetch detail                |
| 11       | Context 与全局状态管理 | 跨组件共享状态                 | 用 Context 存储 login token + 全局 header 管理               |
| 12       | 项目实战 Bootcamp      | 综合能力评估，开发真实项目模块 | 开发 GuestsProgramme / RegisteredProgramme 等模块，与 EF 后端真实打通 |

---

📌 **本记录为唯一 React Bootcamp 教学进度总览，所有未来更新集中 patch 于此。**

## ✅ Chapter 1：HTML & CSS 快速复习

- HTML 结构 & 语义标签
- 常见布局方式（Flex / Grid / Absolute / Relative）
- 常用居中方式总结
- 卡片布局结构与阴影、hover 效果实现
- ✅ *已跳级通过（含简要测试）*

---

## ✅ Chapter 2：JavaScript 核心语法

- 变量声明：`var` / `let` / `const`
- 作用域规则：块级作用域、函数作用域、全局作用域
- Hoisting 与 TDZ（Temporal Dead Zone）
- 函数类型：声明式 / 表达式 / 箭头函数
- 箭头函数无 `arguments` + 不可 new
- 回调函数本质、协议、自动传参规则
- Array 方法全面精讲：
  - `.map()` / `.filter()` / `.slice()` / `.splice()` / `.concat()` / `.indexOf()` / `.includes()`
- ✅ *正式结业（含结业测试）*

---

## ✅ Chapter 3：对象结构与解构赋值

- ✅ 对象访问方式（点语法 vs 中括号语法）

- ✅ 对象遍历机制（for...in / for...of / Object.entries）

- ✅ 可枚举 vs 可迭代的本质区别

- ✅  `Object.keys()` / `Object.values()` 快速组合（待讲）

- ✅  解构赋值语法（Destructuring）
  - ✅ 对象结构赋值
  - ✅ 数组结构赋值
  - ✅ 默认值、嵌套结构、重命名
  
- ✅ 解构结合遍历的实战题

  ✅ 拆老师评语：该章节系统掌握，逻辑通透，答题完整，无补考

---

## ✅ Chapter 4：模块化与开发环境

- 模块拆分 & import/export 基础
- 使用 Vite 创建 React 项目
- 本地开发环境搭建
- `.env` 配置
- API 模块封装（对接 .NET 后端）
- Axios 封装与跨域处理

---

## ⚙️ Chapter 5：React 入门

- React 背景、理念、与 JS 区别
- JSX 语法
- 函数组件 vs 类组件（只讲函数）
- props 的使用
- state 的使用
- 组件初步组织方式 

---

## ⏳ Chapter 6：条件渲染与列表渲染

- 三元表达式、短路渲染
- `.map()` 渲染列表
- 使用 key 的规范
- 后端数据渲染实战

---

## ⏳ Chapter 7：表单处理

- 受控组件 vs 非受控组件
- 表单事件绑定
- 数据提交至后端
- 基本验证机制

---

## ⏳ Chapter 8：useEffect 与生命周期

- useEffect 调用时机
- 依赖项数组与监听机制
- 异步数据加载
- 清理函数设计

---

## ⏳ Chapter 9：组件组织与状态提升

- 多组件拆分与组合
- props 数据流动
- 状态提升
- 子组件回调交互

---

## ⏳ Chapter 10：React Router

- 路由配置与页面切换
- 动态路由与参数获取
- 嵌套路由结构
- 与后端联动的数据展示

---

## ⏳ Chapter 11：Context 与全局状态管理

- Context 基础机制
- Provider 与 Consumer 配置
- 登录状态管理
- token 存储与请求 header 管理

---

## ⏳ Chapter 12：项目实战 Bootcamp

- 开发真实功能模块（GuestsProgramme / RegisteredProgramme）
- 页面组织结构设计
- 与 .NET EF 后端真实联调
- 全流程代码审查与能力验收

---

# React Bootcamp 全局学习进度记录（Tommer 专属）

---





## ✅ Chapter 1：HTML & CSS

- 状态：已通过（跳级测试）
- 掌握情况：
  - 能描述常见居中方式和卡片布局结构
  - 对 absolute/relative 定位原理掌握略弱，需在后续组件布局中反复练习
  - 实操能力 OK，有现实开发经验，能借助搜索工具迅速完成样式细节

---

## ✅ Chapter 2：JavaScript 核心语法（正式结业）

- 掌握情况：
  - 已彻底理解变量声明 (`var` / `let` / `const`)、作用域、Hoisting、TDZ
  - 熟练区分函数声明 vs 表达式 vs 箭头函数，并掌握箭头函数无 `arguments` 的特性
  - 回调函数的本质、调用协议、自动传参顺序已完全掌握
  - `.map()`、`.filter()`、`.slice()`、`.splice()`、`.concat()`、`.indexOf()`、`.includes()` 全部通关，理解其行为、返回值、是否破坏原数组、如何组合调用
  - 已完成高难度 splice 操作题、组合型回调题、正式章节结业测试（满分通过）

- 补充要求履行情况：
  - ✅ 所有有回调函数的地方均已强调“这是回调函数”身份
  - ✅ 回调函数协议的说明已在笔记中明确
  - ✅ Markdown 笔记结构完整，代码示例与行为解释一一对应

- 当前状态：正式毕业，已晋级下一章节

🎯 下一章将进入 Chapter 3：对象结构、访问方式与解构赋值

## ✅ Chapter 3 - 对象、数组与解构赋值（已通关）

本章学习了 JavaScript 中对象与数组的结构理解，以及访问、遍历、解构的关键语法。最终顺利通过章节考试，掌握如下内容：

### 🟦 对象属性访问

- `obj.key` vs `obj["key"]` 区别
- 对象的 key 实际上都被存储为字符串
- `obj[dynamicVar]` 可以使用变量来动态访问属性

### 🟦 Object.keys / values / entries

- `Object.keys(obj)` 返回所有可枚举 key（字符串数组）
- `Object.values(obj)` 返回所有可枚举 value（数组）
- `Object.entries(obj)` 返回二维数组：`[[key, value], ...]`

### 🟩 for...in vs for...of

- `for...in`：可枚举（enumerable）属性，适用于对象 / 数组索引 / 自定义属性
- `for...of`：可迭代（iterable）值，必须依赖 `Symbol.iterator`
- 数组是 iterable，for...of 可以直接遍历值
- 对象不是 iterable，不能直接用 for...of
- `for...of Object.entries(obj)` 成为标准组合，结构解构成 `[key, value]`
- `for...in Object.entries(obj)` 只会遍历索引 "0", "1"，不会进入第二维

### 🟧 数组本质与细节

- 数组本质是对象，key 是 "0", "1", ...
- `arr.customProp = "xx"` 可以动态加属性
- for...in 会遍历索引 + 自定义属性
- for...of 只遍历“真实的数组值”
- 数组的解构赋值只根据 **顺序** 赋值，而不是根据 key

### 🟨 解构赋值 Destructuring Assignment

- 对象解构：按 key 匹配，支持默认值 / 重命名 / 嵌套
- 数组解构：按位置顺序匹配，支持跳项 / 默认值
- 嵌套 + 重命名 + fallback 示例：
  ```js
  const {
    address: { city: town, postcode = "0000" }
  } = user;

---

## ✅ Chapter 4 - 模块化与开发环境（已结业）

### ✅ 小节 1：模块拆分与 import/export

- 掌握命名导出、默认导出、命名导入、默认导入的语法与语义差异
- 理解模块化的实际用途和组织价值

### ✅ 小节 2：使用 Vite 创建 React 项目

- 使用 `npm create vite@latest` 快速构建 React 模板
- 成功运行本地 dev server 并了解项目结构

### ✅ 小节 3：环境变量配置

- 理解 `.env` 文件的用途与作用
- 知道 Vite 中变量需以 `VITE_` 开头才能被前端访问
- 成功从 `.env.local` 中读取后端 baseURL

### ✅ 小节 4：Axios 模块封装

- 使用 `axios.create()` 创建封装实例
- 理解封装意义、可复用性与 baseURL 解耦作用
- 在组件中完成实际请求并处理响应/错误

### ✅ 小节 5：跨域处理（CORS）

- 理解 CORS 的本质为浏览器行为
- 区分浏览器限制 vs Postman 的差异
- 明确两种解决方案（后端设置 vs Vite proxy）
- 成功使用 `.AllowAnyOrigin()` 解锁本地多端访问

✅ 本章节考试成绩：95/100，因子域判断失误扣分  
🎓 状态：正式通关，已晋级 Chapter 5：React 入门



## ⏳Chapter 5 React

### ✅ 小节 1：React 与 JSX 语法入门

- 理解 React 的设计理念：声明式 + 组件化
- 理解 JSX 是 JavaScript 的语法糖，并非 HTML
- 学会 JSX 中插入变量、三元表达式、行内样式的基本写法
- 掌握 JSX 与 HTML 的关键差异（如 className、事件名、style 等）
- 实操练习通过 ✅
  - 能根据变量动态渲染内容
  - 能使用三元表达式控制渲染结构
  - 能写出合法 JSX 结构并修正语法误区

🎯 当前状态：准备进入小节 5.2 —— 编写你的第一个 React 函数组件

### ✅ 小节 2：函数组件入门

- 理解 React 函数组件的定义方式与命名规则
  - 函数组件必须以大写字母开头
  - 返回值必须是合法 JSX（单一根元素）
- 学会定义并渲染组件：
  - 使用 `function ComponentName() {}` 定义组件
  - 使用 `<ComponentName />` 调用并渲染
- 完成实操练习：
  - 编写第一个名为 `ScoreBoard` 的组件
  - 渲染标题 + 分数 + 插值字符串
  - 结构规范，语法无误，逻辑清晰
- 🎉 拆老师点评：首次组件定义规范，思路扎实，渲染调用逻辑准确，具备组件抽象思维基础

🎯 当前状态：准备进入小节 5.3 —— Props 参数传递机制

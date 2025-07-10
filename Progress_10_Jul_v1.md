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

## ✅ Chapter 5：React 入门

- React 背景、理念、与 JS 区别
- JSX 语法
- 函数组件 vs 类组件（只讲函数）
- props 的使用
- state 的使用
- 组件初步组织方式 

---

## ✅ Chapter 6：条件渲染与列表渲染

- 三元表达式、短路渲染
- `.map()` 渲染列表
- 使用 key 的规范
- 后端数据渲染实战

---

## ✅ Chapter 7：表单处理

- 受控组件 vs 非受控组件
- 表单事件绑定
- 数据提交至后端
- 基本验证机制

---

## ✅ Chapter 8：useEffect 与生命周期

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



## ✅Chapter 5 React（已完成）

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

### ✅ 小节 3：Props 参数传递机制

- 理解 props 是“父组件向子组件传递数据”的机制
- 明确 React 中“父子组件”是基于调用关系而非继承结构
- 掌握 props 的基本使用：
  - 父组件通过 JSX 属性语法传值（如 `<Component name="Tommer" />`）
  - 子组件使用参数或解构方式接收 props
- 实操练习：
  - 编写组件 `Greeting`，成功接收并渲染 `name` 参数
  - 验证了未传值不会报错，仅显示为空内容（JSX 容忍性强）
- ⚠️ 本小节综合练习（双参数传值）主动跳过，标记为略过题

🎯 当前状态：准备进入小节 5.4 —— state 响应式数据机制

### ✅ 小节 4：useState 状态机制

- 理解 React 状态的本质：函数组件默认是无状态的，useState 是其“记忆”机制
- 掌握 useState 基本用法：
  - 正确写法：`const [state, setState] = useState(initialValue)`
  - React 会在重新渲染时根据更新后的值替换原状态
- 理解状态更新是异步的：
  - `setState(xxx)` 不会立即更新变量值，而是调度下一次渲染
  - 每次更新后会“重新执行整个函数体”，并重新赋值状态
- 理解 setState 的函数式写法协议：
  - `setState(prev => prev + 1)` 是更稳定、避免闭包影响的方式
  - 练习了“连续 setState 无效”的常见坑题，并使用函数式成功解决
- 深入理解作用域与变量遮蔽问题：
  - `setCount(count => count + 1)` 中的 count 是新作用域参数，不是外层的状态变量
- 小节练习覆盖多个 useState 类型（数值型练习通过，其他略过）

🎯 当前状态：Chapter 5 - React 入门全部完成 ✅  
准备进入 Chapter 6 —— 条件渲染与列表渲染

## ✅Chapter 6 条件渲染与列表渲染

### ✅ 小节 6.1：条件渲染三种写法 (包含6.1， 6.2)

- 理解 JSX 中“插入表达式”与“结构渲染”的区别
- 掌握三种常见条件渲染方式：
  1. ✅ 三元表达式（A ? B : C）：用于有 if / else 的场景，可嵌套实现多分支判断
  2. ✅ 短路渲染（A && B）：用于“成立则渲染 B”，否则什么都不渲染（不会显示 false/null）
  3. ✅ return null：用于组件级提前中止，不渲染任何 DOM 节点
- 熟悉 null 在 React 中代表“完全不渲染”
- 练习多种渲染方式，并比较各自使用场景
- 理解嵌套三元会触发代码质量工具（如 SonarQube）的可读性警告

🎯 当前状态：小节 6.1 已完成 ✅，准备进入小节 6.2：数组映射渲染 `.map()`

### ✅ 小节 6.2：数组渲染与 `.map()` 的完整掌握 （包含6.3， 6.4）

- 理解 `items.map(...)` 是在 JSX 中动态生成元素数组
- 熟悉 `.map()` 的回调参数结构（item, index, array）
- 明确 key 的用途不是为了排序，而是为了“标识身份”，帮助 React 精确 diff 节点
- 对比 `item.id` 与 `index` 的使用风险与场景：
  - `item.id` 是“你是谁”，推荐使用（身份稳定）
  - `index` 是“你排第几个”，不推荐（顺序会变）
- 了解空数组、null/undefined、异步状态下如何防止 `.map()` 报错
- 使用条件渲染 + `.map()` 组合展示“加载中 / 无数据 / 正常数据”的三态逻辑
- 重点理解：`useState` 并非只更新变量，而是触发 **整个组件函数重新执行 + return 新的 JSX**
  - ✅ 原话总结为：“useState 不只是更新已经 return 出去的内容，而是会压根重新 return 一遍”

🎯 当前状态：第六章节通关



## ✅ Chapter 7：表单处理

### ✅ 小节 7.1：受控组件 vs 非受控组件

#### 🟩 受控组件（Controlled Component）

- 使用 `value={state}` 实现 input 与 React 状态的绑定
- `onChange={e => setState(...)}` 是更新机制核心，触发组件重新渲染
- `useState` 是 input 的“唯一数据源”，React 完全接管
- 若绑定 `value` 但无 `onChange`，input 将被冻结无法输入

#### 🟥 非受控组件（Uncontrolled Component）

- 不绑定 value，使用 `ref` 获取真实 DOM 节点的 `.value`
- 初始 `.current` 为 `null`，input 渲染后由 React 自动赋值
- 不触发 rerender，不参与 React 状态流，数据由 DOM 管理
- 常用于文件上传、遗留 DOM 插件、无需实时响应的输入场景

🎓 小节状态：通关 ✅

### ✅ 小节 7.2：多字段表单 + 表单验证机制

本节掌握了在 React 中构建含多个字段的表单，并实现基本验证逻辑的完整流程：

#### 🟩 表单状态组织

- 使用对象型 useState（如 `{ name, password }`）统一管理所有字段值
- 每个 `<input>` 使用 `name="xxx"` 区分字段身份
- `onChange` 中通过 `[e.target.name]` 动态更新字段值，实现通用表单 handler

#### 🟨 表单提交与验证

- 使用 `<form onSubmit={handleSubmit}>` 接管提交行为，统一阻止默认刷新
- 提交时验证字段是否为空，若未填则设置 error 状态
- 错误信息通过条件渲染 `<p>{error}</p>` 显示于表单上方
- 提交成功后使用 `alert(JSON.stringify(formData))` 进行模拟提交，并清空错误

#### 🟥 额外知识点

- `<button>` 在 `<form>` 中默认 `type="submit"`，会自动触发 `onSubmit`
- 若需阻止其提交行为，需手动指定 `type="button"`

🎓 小节状态：通关 ✅

### ✅ 小节 7.3：表单数据提交后端（联调 .NET）

本节实现了完整的表单请求提交流程，并成功与后端 .NET Controller 实现真实通信。

#### ✅ 联调目标

- 使用 `useState` 管理 formData，包含 `PhoneNumber`、`Email`、`NamePiece` 字段
- 自动识别用户输入内容，并匹配字段归类（输入为数字则归为手机号，含 @ 为邮箱，其余为名字模糊匹配）
- 使用封装后的 Axios 模块发送 `POST` 请求至 `/member/search` 接口
- 成功从后端获取匹配结果（Member 列表）

#### 🧠 技术要点突破

- Axios 请求默认使用异步 Promise，必须 `await` 获取结果，否则 `.data` 不可访问
- `setState` 为异步操作，更新后立即读取旧值会失败，需提前提取 `data` 后再发送请求
- React 请求体字段必须保持与后端 DTO 一致（区分大小写），如 `PhoneNumber`（非 `phoneNumber`）
- 请求头需带上 `Content-Type: application/json`，避免后端 400 BadRequest

#### ✅ 调试过程中的踩坑回顾

- ❌ 初始使用 `setFormData()` 后立即读取旧值发请求，导致 payload 空
- ❌ 直接拼接 `console.log("Submit:" + obj)` 输出为 `[object Object]`，无法调试数据
- ✅ 改为 `console.log("Submit:", obj)` 或使用 `JSON.stringify()` 正确打印
- ❌ 起初使用 `https://localhost` 发起请求，导致浏览器 `ERR_SSL_PROTOCOL_ERROR`
- ✅ 改为 `http://localhost` 并使用 Vite 跨域 proxy/或配置 .NET 允许本地请求解决

🎓 小节状态：通关 ✅  
📦 Chapter 7 正式结业 ✅

## ⏳ Chapter 8：useEffect 与生命周期

### ✅ 小节 8.1：副作用与 useEffect 的引入

本节理解了 React 中副作用的含义、常见类型及为何需要 `useEffect` 来管理副作用行为。

#### ✅ 什么是副作用（Side Effect）

- 副作用指非渲染行为的操作，例如：
  - 发起网络请求
  - 修改浏览器标题（`document.title`）
  - 设置定时器 / 事件监听
  - 操作 DOM / 控制台输出
- React 函数组件会在每次重新渲染时**重新执行整个函数体**
  - 若副作用写在组件体内，将在每次渲染时重复执行 → 易导致死循环或性能问题

#### ✅ useEffect 的作用

- 将副作用逻辑“交给 React 安排”，确保在**渲染完成后执行**
- 支持通过依赖数组（dependency array）精确控制执行时机：
  - `useEffect(() => {...}, [])`：仅首次加载后执行一次
  - `useEffect(() => {...}, [inputValue])`：仅在 inputValue 发生变化时执行
  - 不传第二个参数时：每次渲染都会执行

🎓 小节状态：通关 ✅

### ✅ 小节 8.2：useEffect + 异步数据加载 + 状态控制

本节掌握了如何在组件挂载后自动执行异步请求，以及通过 `useState` 管理 loading / error / data 三种状态，实现完整的副作用逻辑渲染流程。

#### ✅ 技术流程

- 使用 `useEffect(() => { ... }, [])` 代表组件首次加载后的副作用操作
- 副作用中封装 `async` 函数进行 Axios 请求
- 定义 3 个状态变量：
  - `loading`：是否正在加载
  - `error`：请求是否出错
  - `responseData`：最终返回的数据（用于 `.map()`）

#### ✅ 典型副作用判断：

- 页面加载后发起请求 → ✅ 属于副作用
- 用户输入触发本地状态更新 → ❌ 非副作用（是 UI 响应）
- 用户输入触发动态搜索请求 → ✅ 是副作用（需 `useEffect` 监控 input）

🎓 小节状态：通关 ✅

### ✅ 小节 8.3：副作用清理机制（Cleanup）

本节深入理解了副作用清理函数的执行机制与实际作用，明确了何时应清理、为何清理。

#### ✅ 清理的目的

- 避免组件卸载后仍执行异步逻辑（如 `setState`、console、数据覆盖）
- 防止重复注册定时器、事件监听器导致性能浪费与逻辑冲突
- 避免 React 报错：“Can't perform a state update on an unmounted component”

#### ✅ 执行时机

- 使用 `useEffect(() => { ... return () => {...} }, [])`
- React 在组件**卸载前**自动执行 `return` 函数，不等待异步副作用结束
- 可以通过布尔变量 `ignore = true` 或 `AbortController` 来中断未完成的异步流程

#### ✅ 场景实例：

- 页面加载发出 axios 请求 → 组件切页卸载 → 返回值不再触发 `setState`
- 注册 resize 监听 → 卸载时 removeListener
- 轮询定时器 → 卸载时 `clearInterval`

🎓 小节状态：通关 ✅

Chapter 8 正式结业

下一步：开始chapter 9

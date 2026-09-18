# ProUI

一个对 `@minecraft/server-ui` 表单 API 的增强封装库，提供更便捷的**回调式**表单构建体验。

**MIT License** © naitang_baka | 奶糖也不是很甜

---

## 依赖要求

| 模块 | 版本要求 |
|------|---------|
| `@minecraft/server` | ≥ 1.0.0 |
| `@minecraft/server-ui` | **≥ 2.0.0** |

> ⚠️ **注意**：本库依赖 `@minecraft/server-ui` 的 **2.0.0 及以上版本**。该版本引入了 `divider()`、`header()`、`label()` 等新 API，低版本会导致运行时错误。请在 `manifest.json` 中确认依赖版本：
>
> ```json
> {
>   "dependencies": [
>     {
>       "module_name": "@minecraft/server-ui",
>       "version": "2.0.0"
>     }
>   ]
> }
> ```

---

## 特性

- **链式调用**：所有方法支持链式调用，构建表单更加流畅
- **回调驱动**：按钮、表单项变化、提交、取消等操作均支持回调函数
- **类型安全**：完整的 TypeScript 类型支持（含 `.d.ts` 声明文件）
- **统一接口**：三种表单类型使用相似的设计模式，降低学习成本

---

## 快速开始

### 安装

将 `scripts/lib/Server-ProUI/` 目录复制到你的行为包脚本目录中，然后导入使用：

```typescript
import { ActionFormDataPro, MessageFormDataPro, ModalFormDataPro } from './lib/Server-ProUI/ProUI';
```

### 三种表单一览

| 类名 | 对应原生 API | 用途 | 典型场景 |
|------|-------------|------|---------|
| `ActionFormDataPro` | `ActionFormData` | 操作表单（按钮列表） | 主菜单、功能选择 |
| `MessageFormDataPro` | `MessageFormData` | 消息表单（双按钮弹窗） | 确认/取消对话框 |
| `ModalFormDataPro` | `ModalFormData` | 模态表单（复杂输入） | 设置面板、数据编辑 |

---

## ActionFormDataPro

操作表单，适用于展示一系列操作按钮。

### 基础用法

```typescript
import { ActionFormDataPro } from './lib/Server-ProUI/ProUI';

ActionFormDataPro.create('选择操作', player)
    .body('请选择一个功能')
    .button('传送至大厅', () => {
        player.sendMessage('正在传送...');
    })
    .button('查看信息', 'textures/ui/icon_info', () => {
        player.sendMessage('这是你的个人信息');
    })
    .onCancel((reason) => {
        player.sendMessage(`表单已取消: ${reason.cancelationReason}`);
    })
    .show();
```

### API 参考

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `static create(title, player)` | `title: RawMessage \| string`, `player: Player` | `ActionFormDataPro` | 创建表单实例 |
| `title(text)` | `text: RawMessage \| string` | `this` | 设置标题 |
| `body(text)` | `text: RawMessage \| string` | `this` | 设置正文 |
| `header(text)` | `text: RawMessage \| string` | `this` | 添加头部 |
| `label(text)` | `text: RawMessage \| string` | `this` | 添加标签 |
| `divider()` | - | `this` | 添加分隔线 |
| `button(text, onClick)` | `text: RawMessage \| string`, `onClick: () => void` | `this` | 添加按钮（无图标） |
| `button(text, iconPath, onClick)` | `text`, `iconPath: string`, `onClick: () => void` | `this` | 添加按钮（带图标） |
| `onCancel(callback)` | `callback: (FormResponse) => void` | `this` | 取消时回调 |
| `show()` | - | `Promise<void>` | 显示表单 |

---

## MessageFormDataPro

消息表单，适用于确认/取消类型的弹窗。

### 基础用法

```typescript
import { MessageFormDataPro } from './lib/Server-ProUI/ProUI';

MessageFormDataPro.create('确认删除', player)
    .body('确定要删除该数据吗？此操作不可撤销。')
    .confirm('确认删除', () => {
        player.sendMessage('已删除');
    })
    .cancel('取消', () => {
        player.sendMessage('操作已取消');
    })
    .onCancel((reason) => {
        player.sendMessage('表单已关闭');
    })
    .show();
```

### API 参考

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `static create(title, player)` | `title: RawMessage \| string`, `player: Player` | `MessageFormDataPro` | 创建表单实例 |
| `title(text)` | `text: RawMessage \| string` | `this` | 设置标题 |
| `body(text)` | `text: RawMessage \| string` | `this` | 设置正文 |
| `confirm(text, onClick?)` | `text: RawMessage \| string`, `onClick?: () => void` | `this` | 设置确认按钮（按钮1） |
| `cancel(text, onClick?)` | `text: RawMessage \| string`, `onClick?: () => void` | `this` | 设置取消按钮（按钮2） |
| `onCancel(callback)` | `callback: (FormResponse) => void` | `this` | 取消时回调 |
| `show()` | - | `Promise<void>` | 显示表单 |

---

## ModalFormDataPro

模态表单，适用于包含多种输入控件的复杂表单。

### 基础用法

```typescript
import { ModalFormDataPro } from './lib/Server-ProUI/ProUI';

ModalFormDataPro.create('玩家设置', player)
    .submitButton('保存')
    .textField('昵称', '请输入昵称...', (value) => {
        console.log(`昵称: ${value}`);
    })
    .dropdown('职业', ['战士', '法师', '射手'], (value) => {
        console.log(`选择职业索引: ${value}`);
    })
    .slider('等级', 1, 100, (value) => {
        console.log(`等级: ${value}`);
    })
    .toggle('启用特效', (value) => {
        console.log(`特效状态: ${value}`);
    })
    .onSubmit(() => {
        player.sendMessage('设置已保存！');
    })
    .onCancel((reason) => {
        player.sendMessage('已取消设置');
    })
    .show();
```

### 带默认值的表单项

```typescript
ModalFormDataPro.create('编辑资料', player)
    .textField(
        '用户名',
        '请输入用户名',
        { default: 'Player123' },
        (value) => { /* ... */ }
    )
    .dropdown(
        '服务器',
        ['生存', '创造', '冒险'],
        { defaultIndex: 1 },
        (value) => { /* ... */ }
    )
    .slider(
        '音量',
        0,
        100,
        { defaultValue: 50 },
        (value) => { /* ... */ }
    )
    .toggle(
        '自动保存',
        { default: true },
        (value) => { /* ... */ }
    )
    .show();
```

### API 参考

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `static create(title, player)` | `title: RawMessage \| string`, `player: Player` | `ModalFormDataPro` | 创建表单实例 |
| `title(text)` | `text: RawMessage \| string` | `this` | 设置标题 |
| `submitButton(text)` | `text: RawMessage \| string` | `this` | 设置提交按钮文本 |
| `divider()` | - | `this` | 添加分隔线 |
| `header(text)` | `text: RawMessage \| string` | `this` | 添加头部 |
| `label(text)` | `text: RawMessage \| string` | `this` | 添加标签 |
| `textField(label, placeholder, onChange)` | ... | `this` | 文本输入框 |
| `textField(label, placeholder, options, onChange)` | ... | `this` | 文本输入框（带选项） |
| `dropdown(label, items, onChange)` | ... | `this` | 下拉选择框 |
| `dropdown(label, items, options, onChange)` | ... | `this` | 下拉选择框（带选项） |
| `slider(label, min, max, onChange)` | ... | `this` | 滑动条 |
| `slider(label, min, max, options, onChange)` | ... | `this` | 滑动条（带选项） |
| `toggle(label, onChange)` | ... | `this` | 开关切换 |
| `toggle(label, options, onChange)` | ... | `this` | 开关切换（带选项） |
| `onCancel(callback)` | `callback: (FormResponse) => void` | `this` | 取消时回调 |
| `onSubmit(callback)` | `callback: () => void` | `this` | 提交时回调 |
| `show()` | - | `Promise<void>` | 显示表单 |

#### 表单项方法重载签名

```typescript
// textField
textField(label: string, placeholder: string, onChange: (value: string) => void)
textField(label: string, placeholder: string, options: ModalFormDataTextFieldOptions, onChange: (value: string) => void)

// dropdown
dropdown(label: string, items: string[], onChange: (value: number) => void)
dropdown(label: string, items: string[], options: ModalFormDataDropdownOptions, onChange: (value: number) => void)

// slider
slider(label: string, min: number, max: number, onChange: (value: number) => void)
slider(label: string, min: number, max: number, options: ModalFormDataSliderOptions, onChange: (value: number) => void)

// toggle
toggle(label: string, onChange: (value: boolean) => void)
toggle(label: string, options: ModalFormDataToggleOptions, onChange: (value: boolean) => void)
```

---

## 项目结构

```
ProUI/
├── scripts/lib/Server-ProUI/     # JS 运行时 + .d.ts 声明文件
│   ├── ProUI.js / .d.ts          # 入口导出
│   ├── ActionFormDataPro.js / .d.ts
│   ├── MessageFormDataPro.js / .d.ts
│   └── ModalFormDataPro.js / .d.ts
├── src/lib/Server-ProUI/         # TypeScript 源码
│   ├── ProUI.ts
│   ├── ActionFormDataPro.ts
│   ├── MessageFormDataPro.ts
│   └── ModalFormDataPro.ts
└── README.md
```

---

## 注意事项

1. **版本兼容**：请务必使用 `@minecraft/server-ui` **2.0.0 及以上版本**，否则 `divider()`、`header()`、`label()` 等方法将不可用。
2. 所有表单方法均支持 `RawMessage` 或 `string` 类型的文本参数，便于多语言场景。
3. `show()` 方法为异步操作，建议使用 `await` 或 `.then()` 处理。
4. 原生 API 的所有限制同样适用于本库。
5. 表单取消时（包括玩家按 ESC 或点击外部关闭），`onCancel` 回调会被触发。

---

## License

MIT License © naitang_baka | 奶糖也不是很甜
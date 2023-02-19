# 龙芯（Longarch64 架构）仿真器

本项目旨在构建一个可以在浏览器上运行的 [Loongarch64](https://www.loongson.cn/system/loongarch) 架构的龙芯模拟器。其项目灵感主要来自于 Bellard 先生的 [jslinux](https://bellard.org/jslinux/) 

本项目**不会采用**以性能优先的准则来进行编写，而是强调代码结构的清晰性和合理性。其主要原因有以下两点：
- 本项目在编译后最终会以 js 脚本的形式嵌入到浏览器中，而本身 js 效率较低，即使经过优化其性能也不会有非常大的提升。
- 本项目只是以教学为目的编写的，如果想在实际工程中模拟 Loongarch 架构，请使用 QEMU 模拟器。

## 项目结构

- build ： 构建脚本及工具
- doc : 项目文档
- img : 在模拟 Loongson 上运行的示例程序的镜像
- src : 项目源码
- tool : 一些项目相关的工具

## 开源协议

本项目的开源协议为 : [MIT License](LICENSE) 
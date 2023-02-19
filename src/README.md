# 项目结构说明

- cpu : 定义了龙芯 CPU 的核心接口与结构
  - arch : Loongarch 架构接口定义
- devices : 模拟设备
- loongarch64 : 对 cpu 目录下定义接口的具体实现
  - common : 通用包
  - instructions : Loongarch 指令集的具体实现
- type : 定义项目中使用的基础类型
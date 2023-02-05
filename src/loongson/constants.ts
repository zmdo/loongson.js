// +------------------------+
//   Longarch32 架构使用常量
// +------------------------+

/** 
 * 32位寄存器掩码 （基于Longarch32 架构） \
 * 该值主要确保仿真器虚拟出来的 32 位寄存器中的值是在 32 比特
 * 范围内的。
 */
export const LA32_REGISTER_MASK = 0xFFFFFFFF;

/** 
 * 低 12 位掩码 （基于Longarch32 架构） \
 * 该值根据 Longarch32 架构中使用的“12比特立即数”进行设计的。
 * 其中该常量命名中的 L12 表示 “Low 12” （低12位）
 */
export const LA32_L12_MASK = 0x00000FFF;

/** 
 * 高 20 位掩码 （基于Longarch32 架构） \
 * 该值根据 Longarch32 架构中使用的“20比特立即数”进行设计的。
 * 其中该常量命名中的 H20 表示 “High 20” （高20位）
 */
export const LA32_H20_MASK = 0xFFFFF000;
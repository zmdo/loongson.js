// +---------+
//   通用常量
// +---------+

export const LA_32BITS_MASK = 0xFFFFFFFF;

export const LA_64BITS_MASK = 0xFFFFFFFFFFFFFFFF;

export const L2_MASK = 0x3;

export const L12_MASK = 0xFFF;

export const L16_MASK = 0xFFFF;

export const L20_MASK = 0xFFFFF;

export const L32_MASK = 0xFFFFFFFF;

export const L52_MASK = 0xFFFFFFFFFFFFF;

// +--------------------+
//   Longarch32 架构常量
// +--------------------+

/** 
 * 32位通用寄存器掩码 （基于Longarch32 架构） \
 * 该值主要确保仿真器虚拟出来的 32 位寄存器中的值是在 32 比特
 * 范围内的。
 */
export const LA32_GR_MASK = LA_32BITS_MASK;

/** 
 * 高 20 位掩码 （基于Longarch32 架构） \
 * 该值根据 Longarch32 架构中使用的“20比特立即数”进行设计的。
 * 其中该常量命名中的 H20 表示 “High 20” （高20位）
 */
export const LA32_H20_MASK = 0xFFFFF000;

// +--------------------+
//   Longarch64 架构常量
// +--------------------+

/** 
 * 64位通用寄存器掩码 （基于Longarch64 架构） \
 * 该值主要确保仿真器虚拟出来的 64 位寄存器中的值是在 64 比特
 * 范围内的。
 */
export const LA64_GR_MASK = LA_64BITS_MASK;
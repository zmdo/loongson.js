import Float64 from "../type/float64";
import ReadonlyNumber64 from "../type/number64";

type R64 = ReadonlyNumber64;
type R32 = number;
const ZERO = ReadonlyNumber64.ZERO;

export default class LoongsonRegisterGroup {

    /**
     * **程序计数器（Program Counter，简称 PC）**
     * 
     * 程序计数器 PC 只有 1 个，记录着当前指令的地址。PC 寄存器不能
     * 被指令直接修改，它只能被转移指令、例外陷入和例外返回间接修改。
     * 不过，PC 寄存器可以作为一些非转移类指令的源操作数而被直接读取。
     * PC 的宽度总是与 {@link GR 通用寄存器} 的宽度一致
     */
    PC:[R64] = [ZERO];
    
    /**
     * **通用寄存器（General-purpose Register，简称 GR）**
     * 
     * 通用寄存器 GR 有 32 个，记为 r0 ~ r31 ，其中第 0 号寄存器
     * r0 的值恒为 0 。GR 位宽是 64 比特。
     */
    GR:R64[] = [
        ZERO,ZERO,ZERO,ZERO, // r0  ~ r3
        ZERO,ZERO,ZERO,ZERO, // r4  ~ r7
        ZERO,ZERO,ZERO,ZERO, // r8  ~ r11
        ZERO,ZERO,ZERO,ZERO, // r12 ~ r15
        ZERO,ZERO,ZERO,ZERO, // r16 ~ r19
        ZERO,ZERO,ZERO,ZERO, // r20 ~ r23
        ZERO,ZERO,ZERO,ZERO, // r24 ~ r27
        ZERO,ZERO,ZERO,ZERO, // r28 ~ r31
    ];

    /**
     * **浮点寄存器（Floating-point Register，简称 FR）**
     * 
     * 浮点寄存器 FR 有 32 个，记为 f0 ~ f31 。
     */
    FR:Float64[] = [
        
    ];

    /**
     * **条件标志寄存器（Condition Flag Register，简称 CFR）**
     * 
     * 浮点寄存器 CFR 有 1 个，记为 fcc0，每一个都可以读写 。CFR 
     * 的位宽为 1 比特。浮点比较结果将写入到条件标志寄存器中，当比
     * 较结果为真则置 1 ，否则置 0  。浮点分支指令的判断条件来自于
     * 条件标志寄存器。
     */
    public CFR : [R32] = [0];

    /**
     * **浮点控制状态寄存器（Floating-point Control Status Register，简称 FCSR）**
     * 
     * 浮点控制状态寄存器 FCSR 有 4 个，记为 fcsr0 ~ fcsr3 ，位宽均
     * 为 32 比特。
     */
    public FCSR : R32[] = [0,0,0,0];

    /**
     * 通用寄存器的位宽
     */
    readonly GRLEN : number;
    
    constructor ( GRLEN:number = 64 ) {
        this.GRLEN = GRLEN;
    }
    
}
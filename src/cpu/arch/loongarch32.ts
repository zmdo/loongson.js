/**
 * **Longarch32 精简指令集接口**
 * 
 * 下面接口定义了 Longarch32 指令集虚拟实现的方法，其中
 * 对方法的命名遵循以下规则：
 * 
 * - 方法名跟指令名一致，且均为大写
 * - 将指令中的 “.” (点号) 符号替换位 “_” （下划线）
 * 
 * @version 0.0.1
 */
export default interface Loongarch32 {

    /*
     * 1 基础整数指令
     */

    // +-------------------+
    //   1.1 算数运算类指令  
    // +-------------------+

    // 1.1.1 ADD.W,SUB.W

    /**
     * ADD.W 将通用寄存器 rj 中的数据加上通用寄存器 rk 中的数据，所
     * 得结果[31:0]位写入通用寄存器 rd 中。\
     * 该指令执行时不对溢出情况做任何特殊情况处理 
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    ADD_W ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * SUB.W 将通用寄存器 rj 中的数据减去通用寄存器 rk 中的数据，所
     * 得结果[31:0]位写入通用寄存器 rd 中。\
     * 该指令执行时不对溢出情况做任何特殊情况处理 
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    SUB_W ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    // 1.1.2 ADDI.W

    /**
     * ADDI.W 将通用寄存器 rj 中的数据加上 12 比特立即数 si12 符号
     * 扩展后 32 位的数据，所得结果写入通用寄存器 rd 中。\
     * 该指令执行时不对溢出情况做任何特殊情况处理
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param si12 12比特的立即数
     */
    ADDI_W ( rd_idx:number, rj_idx:number, si12:number ) : void;

    // 1.1.3 LU21I.W

    /**
     * LU21I.W 将 20 比特立即数 si20 最低位连上 12 比特 0 后写入通
     * 用寄存器 rb 中。\
     * 该指令与 {@link ORI ORI} 指令一起用于将超过 12 位的立即数装
     * 载到通用寄存器中。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param si20 20 比特的立即数
     */
    LU12I_W ( rd_idx:number, si20:number ) : void;

    // 1.1.4 SLT[U]

    /**
     * SLT  将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据视作有
     * 符号整数进行大小比较，如果前者小于后者，则将通用寄存器 rd 的
     * 值置 1，否则置 0 。\
     * 该指令比较的数据位宽与所执行机器的通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    SLT  ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * SLTU 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据视作无
     * 符号整数进行大小比较，如果前者小于后者，则将通用寄存器 rd 的
     * 值置 1，否则置 0 。\
     * 该指令比较的数据位宽与所执行机器的通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    SLTU ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    // 1.1.5 SLT(U)I

    /**
     * SLTI 将通用寄存器 rj 中的数据与 12 比特立即数 si12 符号扩展
     * 后所得的数据是做有符号整数进行大小比较，如果前者小于后者， 则
     * 将通用寄存器 rd 的值置 1，否则置 0 。\
     * 该指令比较的数据位宽与所执行机器的通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param si12 12 比特的立即数
     */
    SLTI  ( rd_idx:number, rj_idx:number, si12:number ) : void;

    /**
     * SLTI 将通用寄存器 rj 中的数据与 12 比特立即数 si12 符号扩展
     * 后所得的数据是做无符号整数进行大小比较，如果前者小于后者， 则
     * 将通用寄存器 rd 的值置 1，否则置 0 。\
     * 该指令比较的数据位宽与所执行机器的通用寄存器位宽一致。\
     * **注意：**对于 SLTUI 指令，立即数仍是有符号扩展。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param si12 12 比特的立即数
     */
    SLTUI ( rd_idx:number, rj_idx:number, si12:number ) : void;

    // 1.1.6 PCADDU12I

    /**
     * PCADDU12I 将 20 比特立即数 si20 最低位连接上 12 比特 0 之后
     * 符号扩展，所得数据加上该指令的 PC ，相加结果写入通用寄存器 rd
     * 中。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param si20 20 比特的立即数
     */
    PCADDU12I ( rd_idx:number, si20:number ) : void;

    // 1.1.7 AND,OR,NOR,XOR

    /**
     * AND 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据进行按位
     * 逻辑与运算，结果写入通用寄存器 rd 中。\
     * 该指令操作的数据位宽与所执行机器通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    AND  ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * OR  将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据进行按位
     * 逻辑或运算，结果写入通用寄存器 rd 中。\
     * 该指令操作的数据位宽与所执行机器通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    OR   ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * NOR 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据进行按位
     * 逻辑异或运算，结果写入通用寄存器 rd 中。\
     * 该指令操作的数据位宽与所执行机器通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    NOR  ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

     /**
     * XOR 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据进行按位
     * 逻辑与或运算，结果写入通用寄存器 rd 中。\
     * 该指令操作的数据位宽与所执行机器通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */   
    XOR  ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    // 1.1.8 ANDI,ORI,XORI

    /**
     * ANDI 将通用寄存器 rj 中的数据与 12 比特立即数零扩展之后数据进
     * 行按位逻辑与运算，结果存储在通用寄存器 rd 中。\
     * 该指令操作的数据位宽与所执行机器通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param ui12 12比特的立即数
     */
    ANDI ( rd_idx:number, rj_idx:number, ui12:number ) : void;

    /**
     * ORI 将通用寄存器 rj 中的数据与 12 比特立即数零扩展之后数据进
     * 行按位逻辑或运算，结果存储在通用寄存器 rd 中。\
     * 该指令操作的数据位宽与所执行机器通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param ui12 12比特的立即数
     */
    ORI  ( rd_idx:number, rj_idx:number, ui12:number ) : void;
    
    /**
     * XORI 将通用寄存器 rj 中的数据与 12 比特立即数零扩展之后数据进
     * 行按位逻辑异或运算，结果存储在通用寄存器 rd 中。\
     * 该指令操作的数据位宽与所执行机器通用寄存器位宽一致。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param ui12 12比特的立即数
     */
    XORI ( rd_idx:number, rj_idx:number, ui12:number ) : void;

    // 1.1.9 NOP

    /**
     * NOP  指令时指令 “ANDI r0,r0,0” 的别名。其功能仅为占据 4 字节
     * 指令码位置并将 PC 加 4，除此之外不会改变其它任何软件可见的处理
     * 器状态。
     */
    NOP () : void;

    // 1.1.10 MUL.W,MULH.W[U]

    /**
     * MUL.W  将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据进行相
     * 乘，乘积结果的[31:0]位写入通用寄存器 rd 中。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    MUL_W   ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * MULH.W 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据视作有
     * 符号数进行相乘，乘积结果的[63:32]位数据写入通用寄存器 rd 中。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    MULH_W  ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;
    
    /**
     * MULH.W 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据视作无
     * 符号数进行相乘，乘积结果的[63:32]位数据写入通用寄存器 rd 中。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    MULH_WU ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    // 1.1.11 DIV.W[U],MOD.W[U]

    /**
     * DIV.W 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据视作有符
     * 号数，用通用寄存器 rj 中的数据除以通用寄存器 rk 中的数据，所得商
     * 写入 rd 中。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    DIV_W  ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * DIV.WU 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据视作有无
     * 号数，用通用寄存器 rj 中的数据除以通用寄存器 rk 中的数据，所得商
     * 写入 rd 中。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    DIV_WU ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * DIV.W 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据视作有符
     * 号数，用通用寄存器 rj 中的数据除以通用寄存器 rk 中的数据，所得余
     * 数写入 rd 中。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    MOD_W  ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * DIV.W 将通用寄存器 rj 中的数据与通用寄存器 rk 中的数据视作无符
     * 号数，用通用寄存器 rj 中的数据除以通用寄存器 rk 中的数据，所得余
     * 数写入 rd 中。
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */
    MOD_WU ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    // +-------------------+
    //   1.2 移位运算类指令  
    // +-------------------+

    // 1.2.1 SLL.W,SRL.W,SRA,W

    /**
     * SLL.W 将通用寄存器 rj 中的数据逻辑左移，移位结果写入通用寄存器 rd
     * 中。
     * ```
     *   tmp = SLL(GR[rj],GR[rk][4:0])
     *   GR[rd] = tmp[31:0]
     * ```
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */    
    SLL_W ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * 
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */    
    SRL_W ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    /**
     * 
     * @param rd_idx 通用寄存器 rd 的索引
     * @param rj_idx 通用寄存器 rj 的索引
     * @param rk_idx 通用寄存器 rk 的索引
     */    
    SRA_W ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    // 1.2.2 SLLI.W,SRLI.W,SRAI.W

    SLLI_W ( rd_idx:number, rj_idx:number, ui5:number ) : void;

    SRLI_W ( rd_idx:number, rj_idx:number, ui5:number ) : void;

    SRAI_W ( rd_idx:number, rj_idx:number, ui5:number ) : void;

    // +-------------+
    //   1.3 转移指令  
    // +-------------+

    // 1.3.1 BEQ,BNE,BLT[U],BGE[U]

    BEQ  ( rj_idx:number, rd_idx:number, offs16:number ) : void;
 
    BNE  ( rj_idx:number, rd_idx:number, offs16:number ) : void;
 
    BLT  ( rj_idx:number, rd_idx:number, offs16:number ) : void;
 
    BGE  ( rj_idx:number, rd_idx:number, offs16:number ) : void;

    BLTU ( rj_idx:number, rd_idx:number, offs16:number ) : void;

    BGEU ( rj_idx:number, rd_idx:number, offs16:number ) : void;

    // 3.2 B

    B ( offs26:number ) : void;

    // 3.3 BL

    BL ( offs26:number ) : void;

    // 3.4 JIRL

    JIRL ( rd_idx:number, rj_idx:number, offs16:number ) : void;

    // +-----------------+
    //   1.4 普通访存指令  
    // +-----------------+

    // 1.4.1 LD.{B[U]/H[U]/W},ST.{B/H/W}

    LD_B  ( rd_idx:number, rj_idx:number, si12:number ) : void;

    LD_H  ( rd_idx:number, rj_idx:number, si12:number ) : void;

    LD_W  ( rd_idx:number, rj_idx:number, si12:number ) : void;

    LD_BU ( rd_idx:number, rj_idx:number, si12:number ) : void;

    LD_HU ( rd_idx:number, rj_idx:number, si12:number ) : void;

    ST_B  ( rd_idx:number, rj_idx:number, si12:number ) : void;
    
    ST_H  ( rd_idx:number, rj_idx:number, si12:number ) : void;

    ST_W  ( rd_idx:number, rj_idx:number, si12:number ) : void;

    // 1.4.2 PRELD

    PRELD ( hint:number, rj_idx:number, si12:number ) : void;

    // +-----------------+
    //   1.5 原子访存指令  
    // +-----------------+

    // 1.5.1 LL.W,SC.W

    LL_W ( rd_idx:number, rj_idx:number, si14:number ) : void;

    SC_W ( rd_idx:number, rj_idx:number, si14:number ) : void;

    // +-------------+
    //   1.6 栅障指令  
    // +-------------+

    // 1.6.1 DBAR

    DBAR ( hint:number ) : void;

    // 1.6.2 IBAR

    IBAR ( hint:number ) : void;

    // +-----------------+
    //   1.7 其他杂项指令  
    // +-----------------+

    // 1.7.1 SYSCALL

    SYSCALL ( code:number ) : void;

    // 1.7.2 BREAK

    BREAK ( code:number ) : void;

    // 1.7.3 RDCNTV{L/H}.W,RDCNTID

    RDCNTVL_W ( rd_idx:number ) : void;

    RDCNTVH_W ( rd_idx:number ) : void;

    RDCNTID   ( rj_idx:number ) : void;

    /*
     * 2 基础浮点数指令
     */

    // +-------------------+
    //   2.1 浮点运算类指令  
    // +-------------------+

    // 2.1.1 F{ADD/SUB/MUL/DIV}.{S/D}

    FADD_S ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FADD_D ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FSUB_S ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FSUB_D ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FMUL_S ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FMUL_D ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FDIV_S ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FDIV_D ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    // 2.1.2 F{MADD/MSUB/NMADD/NMSUB}.{S/D}

    FMADD_S  ( fd_idx:number, fj_idx:number, fk_idx:number, fa_idx:number ) : void; 

    FMADD_D  ( fd_idx:number, fj_idx:number, fk_idx:number, fa_idx:number ) : void; 

    FMSUB_S  ( fd_idx:number, fj_idx:number, fk_idx:number, fa_idx:number ) : void; 

    FMSUB_D  ( fd_idx:number, fj_idx:number, fk_idx:number, fa_idx:number ) : void; 

    FNMADD_S ( fd_idx:number, fj_idx:number, fk_idx:number, fa_idx:number ) : void; 

    FNMADD_D ( fd_idx:number, fj_idx:number, fk_idx:number, fa_idx:number ) : void; 

    FNMSUB_S ( fd_idx:number, fj_idx:number, fk_idx:number, fa_idx:number ) : void; 

    FNMSUB_D ( fd_idx:number, fj_idx:number, fk_idx:number, fa_idx:number ) : void; 

    // 2.1.3 F{MAX/MIN}.{S/D}

    FMAX_S ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FMAX_D ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FMIN_S ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FMIN_D ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    // 2.1.4 F{MAXA/MINA}.{S/D}

    FMAXA_S ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FMAXA_D ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FMINA_S ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FMINA_D ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    // 2.1.5 F{ABS/NEG}.{S/D}

    FABS_S ( fd_idx:number, fj_idx:number ) : void;

    FABS_D ( fd_idx:number, fj_idx:number ) : void;

    FNEG_S ( fd_idx:number, fj_idx:number ) : void;

    FNEG_D ( fd_idx:number, fj_idx:number ) : void;

    // 2.1.6 F{SQRT/RECIP/RSQRT}.{S/D}

    FSQRT_S  ( fd_idx:number, fj_idx:number ) : void;

    FSQRT_D  ( fd_idx:number, fj_idx:number ) : void;

    FRECIP_S ( fd_idx:number, fj_idx:number ) : void;

    FRECIP_D ( fd_idx:number, fj_idx:number ) : void;

    FRSQRT_S ( fd_idx:number, fj_idx:number ) : void;

    FRSQRT_D ( fd_idx:number, fj_idx:number ) : void;

    // 2.1.7 FCOPYSIGN.{S/D}

    FCOPYSIGN_S ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    FCOPYSIGN_D ( fd_idx:number, fj_idx:number, fk_idx:number ) : void;

    // 2.1.8 FCLASS.{S/D}

    FCLASS_S ( fd_idx:number, fj_idx:number ) : void;

    FCLASS_D ( fd_idx:number, fj_idx:number ) : void;

    // +-----------------+
    //   2.2 浮点比较指令  
    // +-----------------+

    // 2.2.1 FCMP.cond.{S/D}

    // FCMP_COND_S ( cond:number ,cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_CAF_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CAF_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_CUN_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_CUN_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_CEQ_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_CEQ_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_CUEQ_S ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CUEQ_D ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_CLT_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_CLT_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_CULT_S ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CULT_D ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CLE_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CLE_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CULE_S ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CULE_D ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CNE_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CNE_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_COR_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_COR_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CUNE_S ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_CUNE_D ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SAF_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SAF_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SUN_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SUN_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_SEQ_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SEQ_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_SUEQ_S ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SUEQ_D ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_SLT_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SLT_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_SULT_S ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SULT_D ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SLE_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SLE_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_SULE_S ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SULE_D ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SNE_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SNE_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SOR_S  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SOR_D  ( cc:number, fj_idx:number, fk_idx:number ) : void;
    
    FCMP_SUNE_S ( cc:number, fj_idx:number, fk_idx:number ) : void;

    FCMP_SUNE_D ( cc:number, fj_idx:number, fk_idx:number ) : void;

    // +-----------------+
    //   2.3 浮点转换指令  
    // +-----------------+

    // 2.3.1 FCVT.S.D,FCVT.D.S

    FCVT_S_D ( fd_idx:number, fj_idx:number ) : void;

    FCVT_D_S ( fd_idx:number, fj_idx:number ) : void;

    // 2.3.2 FFINT.{S/D}.W,FTINT.W.{S/D}

    FFINT_S_W ( fd_idx:number, fj_idx:number ) : void;

    FFINT_W_S ( fd_idx:number, fj_idx:number ) : void;

    FFINT_D_W ( fd_idx:number, fj_idx:number ) : void;

    FFINT_W_D ( fd_idx:number, fj_idx:number ) : void;

    // 2.3.3 FTINT.{RM/RP/RZ/RNE}.W.{S/D}

    FTINTRM_W_S  ( fd_idx:number, fj_idx:number ) : void;

    FTINTRM_W_D  ( fd_idx:number, fj_idx:number ) : void;

    FTINTRP_W_S  ( fd_idx:number, fj_idx:number ) : void;
    
    FTINTRP_W_D  ( fd_idx:number, fj_idx:number ) : void;
    
    FTINTRZ_W_S  ( fd_idx:number, fj_idx:number ) : void;
    
    FTINTRZ_W_D  ( fd_idx:number, fj_idx:number ) : void;
    
    FTINTRNE_W_S  ( fd_idx:number, fj_idx:number ) : void;
    
    FTINTRNE_W_D  ( fd_idx:number, fj_idx:number ) : void;

    // +-----------------+
    //   2.4 浮点搬运指令  
    // +-----------------+

    // 2.4.1 FMOV.{S/D}
    
    FMOV_S ( fd_idx:number, fj_idx:number ) : void;

    FMOV_D ( fd_idx:number, fj_idx:number ) : void;

    // 2.4.2 FSEL

    FSEL ( fd_idx:number, fj_idx:number, fk_idx:number, ca:number ) : void;

    // 2.4.3 MOVGR2FR.W,MOVGR2FRH.W

    MOVGR2FR_W  ( fd_idx:number, rj_idx:number ) : void;

    MOVGR2FRH_W ( fd_idx:number, rj_idx:number ) : void;

    // 2.4.4 MOVFR2GR.S,MOVFRH2GR.S

    MOVFR2GR_S  ( rd_idx:number, fj_idx:number ) : void;

    MOVFRH2GR_S ( rd_idx:number, fj_idx:number ) : void;

    // 2.4.5 MOVGR2FCSR,MOVFCSR2GR

    MOVGR2FCSR  ( fcsr:number, rj_idx:number ) : void;

    MOVFCSR2GR  ( rd_idx:number, fcsr:number ) : void;

    // 2.4.6 MOVFR2CF,MOVCF2FR

    MOVFR2CF ( cd_idx:number, fj_idx:number ) : void;

    MOVCF2FR ( fj_idx:number, cj_idx:number ) : void;

    // 2.4.7 MOVGR2CF,MOVCF2GR

    MOVGR2CF ( cd_idx:number, rj_idx:number ) : void;

    MOVCF2GR ( rj_idx:number, cj_idx:number ) : void;

    // +-----------------+
    //   2.5 浮点分支指令  
    // +-----------------+

    // 2.5.1 BCEQZ,BCNEZ

    BCEQZ ( cj_idx:number, offs21:number ) : void;

    BCNEZ ( cj_idx:number, offs21:number ) : void;

    // +---------------------+
    //   2.6 浮点普通访存指令  
    // +---------------------+

    // 2.6.1 FLD.{S/D},FST.{S/D}

    FLD_S ( fd_idx:number, rj_idx:number, si12:number ) : void;

    FLD_D ( fd_idx:number, rj_idx:number, si12:number ) : void;

    FST_S ( fd_idx:number, rj_idx:number, si12:number ) : void;

    FST_D ( fd_idx:number, rj_idx:number, si12:number ) : void;

    /*
     * 3 特权指令
     */

    // +------------------+
    //   3.1 CSR 访问指令 
    // +------------------+

    // 3.1.1 CSRRD,CSRWR,CSRXCHG

    CSRRD   ( rd_idx:number, csr_num:number ) : void;

    CSRWR   ( rd_idx:number, csr_num:number ) : void;

    CSRXCHG ( rd_idx:number, rj_idx:number, csr_num:number ) : void;

    // +--------------------+
    //   3.2 Cache 维护指令 
    // +--------------------+
    
    // 3.2.1 CACOP

    CACOP ( code:number, rj_idx:number, si12:number ) : void;

    // +------------------+
    //   3.3 TLB 维护指令 
    // +------------------+

    // 3.3.1 TLBSRCH

    TLBSRCH () : void;

    // 3.3.2 TLBRD

    TLBRD () : void;

    // 3.3.3 TLBWR

    TLBWR () : void;

    // 3.3.4 TLBFILL
    
    TLBFILL () : void;

    // 3.3.5 INVTLB

    INVTLB ( op:number, rj_idx:number, rk_idx:number ) : void;

    // +--------------------+
    //   3.4 其他杂项维护指令 
    // +--------------------+

    // 3.4.1 ERTN

    ERTN () : void;

    // 3.4.2 IDLE

    IDLE ( level:number ) : void;


}
import Loongarch32 from './loongarch32';

/**
 * Longarch64 指令集接口
 * 
 * 下面接口定义了 Longarch64 指令集虚拟实现的方法，其中
 * 对方法的命名遵循以下规则：
 * 
 * - 方法名跟指令名一致，且均为大写
 * - 将指令中的 “.” (点号) 符号替换位 “_” （下划线）
 * 
 * @version 0.0.1
 */
export default interface Loongarch64 extends Loongarch32 {

    /*
     * 1 基础整数指令
     */

    // +-------------------+
    //   1.1 算数运算类指令  
    // +-------------------+

    // 1.1.1 ADD.{W/D},SUB.{W/D}
    // 其中 Loongarch32 接口中已经包含了 ADD.W,SUB.W 

    ADD_D ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    SUB_D ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    // 1.1.2 ADDI.{W/D},ADDU16I.D
    // 其中 Loongarch32 接口中已经包含了 ADDI.W

    ADDI_D    ( rd_idx:number, rj_idx:number, si12:number ) : void;

    ADDU16I_D ( rd_idx:number, rj_idx:number, si16:number ) : void;

    // 1.1.3 ALSL.{W[U]/D}

    ALSL_W  ( rd_idx:number, rj_idx:number, rk_idx:number, sa2:number ) : void;

    ALSL_WD ( rd_idx:number, rj_idx:number, rk_idx:number, sa2:number ) : void;

    ALSL_D  ( rd_idx:number, rj_idx:number, rk_idx:number, sa2:number ) : void;

    // 1.1.4 LU12I.W,LU31I.D,LU52I.D
    // 其中 Loongarch32 接口中已经包含了 LU12I.W

    LU31I_D ( rd_idx:number, si20:number ) : void;

    LU52I_D ( rd_idx:number, rj_idx:number, si12:number ) : void;

    // 1.1.5 SLT[U]
    // 其中 Loongarch32 接口中已经包含了 SLT,SLTU

    // 1.1.6 SLT[U]I
    // 其中 Loongarch32 接口中已经包含了 SLTI,SLTUI

    // 1.1.7 PCADDI,PCADDU12I,PCADDU18I,PCALAU12I
    // 其中 Loongarch32 接口中已经包含了 PCADDU12I

    PCADDI    ( rd_idx:number, si20:number )  : void;

    PCADDU18I ( rd_idx:number, si20:number )  : void;

    PCALAU12I ( rd_idx:number, si20:number )  : void;

    // 1.1.8 AND,OR,NOR,XOR,ANDN,ORN
    // 其中 Loongarch32 接口中已经包含了 AND,OR,NOR,XOR

    ANDN ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    ORN  ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    // 1.1.9 ANDI,ORI,XORI
    // 其中 Loongarch32 接口中已经包含了 ANDI,ORI,XORI

    // 1.1.10 NOP
    // 其中 Loongarch32 接口中已经包含了 NOP

    // 1.1.11 MUL.{W/D},MULH.{W[U]/D[U]}
    // 其中 Loongarch32 接口中已经包含了 MUL.W,MULH.W,MULH.WU

    MUL_D   ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    MULH_D  ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

    MULH_DU ( rd_idx:number, rj_idx:number, rk_idx:number ) : void;

}
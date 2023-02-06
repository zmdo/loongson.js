import Loongarch32 from './loongarch32';

/**
 * Longarch64 指令集接口
 * 
 * 下面接口定义了 Longarch64 指令集虚拟实现的方法，其中
 * 对方法的命名遵循以下规则：
 * 
 * - 方法名跟指令名一致，且均为大写
 * - 将指令中的 “.” (点号) 符号替换为 “_” （下划线）
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
    // 其中 Loongarch32 接口中已经包含了：
    // ADD.W,SUB.W 

    ADD_D ( rd:number, rj:number, rk:number ) : void;

    SUB_D ( rd:number, rj:number, rk:number ) : void;

    // 1.1.2 ADDI.{W/D},ADDU16I.D
    // 其中 Loongarch32 接口中已经包含了：
    // ADDI.W

    ADDI_D    ( rd:number, rj:number, si12:number ) : void;

    ADDU16I_D ( rd:number, rj:number, si16:number ) : void;

    // 1.1.3 ALSL.{W[U]/D}

    ALSL_W  ( rd:number, rj:number, rk:number, sa2:number ) : void;

    ALSL_WD ( rd:number, rj:number, rk:number, sa2:number ) : void;

    ALSL_D  ( rd:number, rj:number, rk:number, sa2:number ) : void;

    // 1.1.4 LU12I.W,LU31I.D,LU52I.D
    // 其中 Loongarch32 接口中已经包含了：
    // LU12I.W

    LU31I_D ( rd:number, si20:number ) : void;

    LU52I_D ( rd:number, rj:number, si12:number ) : void;

    // 1.1.5 SLT[U]
    // 其中 Loongarch32 接口中已经包含了：
    // SLT,SLTU

    // 1.1.6 SLT[U]I
    // 其中 Loongarch32 接口中已经包含了：
    // SLTI,SLTUI

    // 1.1.7 PCADDI,PCADDU12I,PCADDU18I,PCALAU12I
    // 其中 Loongarch32 接口中已经包含了：
    // PCADDU12I

    PCADDI    ( rd:number, si20:number )  : void;

    PCADDU18I ( rd:number, si20:number )  : void;

    PCALAU12I ( rd:number, si20:number )  : void;

    // 1.1.8 AND,OR,NOR,XOR,ANDN,ORN
    // 其中 Loongarch32 接口中已经包含了：
    // AND,OR,NOR,XOR

    ANDN ( rd:number, rj:number, rk:number ) : void;

    ORN  ( rd:number, rj:number, rk:number ) : void;

    // 1.1.9 ANDI,ORI,XORI
    // 其中 Loongarch32 接口中已经包含了：
    // ANDI,ORI,XORI

    // 1.1.10 NOP
    // 其中 Loongarch32 接口中已经包含了 NOP

    // 1.1.11 MUL.{W/D},MULH.{W[U]/D[U]}
    // 其中 Loongarch32 接口中已经包含了：
    // MUL.W,MULH.W,MULH.WU

    MUL_D   ( rd:number, rj:number, rk:number ) : void;

    MULH_D  ( rd:number, rj:number, rk:number ) : void;

    MULH_DU ( rd:number, rj:number, rk:number ) : void;

    // 1.1.12 MULU.D.W[U]

    MULW_D_W  ( rd:number, rj:number, rk:number ) : void;

    MULW_D_WU ( rd:number, rj:number, rk:number ) : void;

    // 1.1.13 DIV.{W[U]/D[U]},MOD.{W[U]/D[U]}
    // 其中 Loongarch32 接口中已经包含了：
    // DIV.W,DIV.WU,MOD.W,MOD.WU

    DIV_D  ( rd:number, rj:number, rk:number ) : void;

    DIV_DU ( rd:number, rj:number, rk:number ) : void;

    MOD_D  ( rd:number, rj:number, rk:number ) : void;

    MOD_DU ( rd:number, rj:number, rk:number ) : void;

    // +-------------------+
    //   1.2 移位运算类指令  
    // +-------------------+

    // 1.2.1 SLL.W,SRL.W,SRA.W,ROTR.W
    // 其中 Loongarch32 接口中已经包含了：
    // SLL.W,SRL.W,SRA,W

    ROTR_W ( rd:number, rj:number, rk:number ) : void;

    // 1.2.2 SLLI.W,SRLI.W,SRAI.W,ROTRI.W
    // 其中 Loongarch32 接口中已经包含了：
    // SLLI.W,SRLI.W,SRAI.W

    ROTRI_W ( rd:number, rj:number, ui5:number ) : void;

    // 1.2.3 SLL.D,SRL.D,SRA.D,ROTR.D

    SLL_D  ( rd:number, rj:number, rk:number ) : void;

    SRL_D  ( rd:number, rj:number, rk:number ) : void;

    SRA_D  ( rd:number, rj:number, rk:number ) : void;

    ROTR_D ( rd:number, rj:number, rk:number ) : void;

    // 1.2.4 SLLI.D,SRLI.D,SRAI.D,ROTRI.D

    SLLI_D  ( rd:number, rj:number, ui6:number ) : void;

    SRLI_D  ( rd:number, rj:number, ui6:number ) : void;

    SRAI_D  ( rd:number, rj:number, ui6:number ) : void;

    ROTRI_D ( rd:number, rj:number, ui6:number ) : void;

    // +---------------+
    //   1.3 位操作指令  
    // +---------------+

    // 1.3.1 EXT.W.{B/H}

    EXT_W_B ( rd:number, rj:number ) : void;

    EXT_W_H ( rd:number, rj:number ) : void;

    // 1.3.2 CL{O/Z}.{W/D},CT{O/Z}.{W/D}

    CLO_W ( rd:number, rj:number ) : void;

    CLO_D ( rd:number, rj:number ) : void;

    CLZ_W ( rd:number, rj:number ) : void;

    CLZ_D ( rd:number, rj:number ) : void;

    CTO_W ( rd:number, rj:number ) : void;

    CTO_D ( rd:number, rj:number ) : void;

    CTZ_W ( rd:number, rj:number ) : void;

    CTZ_D ( rd:number, rj:number ) : void;

    // 1.3.3 BYTEPICK.{W/D}

    BYTEPICK_W ( rd:number, rj:number, rk:number, sa2:number ) : void;

    BYTEPICK_D ( rd:number, rj:number, rk:number, sa3:number ) : void;

    // 1.3.4 REVB.{2H/4H/2W/D}

    REVB_3H ( rd:number, rj:number ) : void;

    REVB_4H ( rd:number, rj:number ) : void;

    REVB_2W ( rd:number, rj:number ) : void;

    REVB_D  ( rd:number, rj:number ) : void;

    // 1.3.5 REVH.{2W/D}

    REVH_2W ( rd:number, rj:number ) : void;

    REVH_D  ( rd:number, rj:number ) : void;

    // 1.3.6 BITREV.{4B/8B}

    BITREV_4B ( rd:number, rj:number ) : void;

    BITREV_8B ( rd:number, rj:number ) : void;

    // 1.3.7 BITREV.{W/D}

    BITREV_W ( rd:number, rj:number ) : void;

    BITREV_D ( rd:number, rj:number ) : void;

    // 1.3.8 BSTRINS.{W/D}

    BSTRINS_W ( rd:number, rj:number, msbw:number, lsbw:number ) : void;
    
    BSTRINS_D ( rd:number, rj:number, msbd:number, lsbd:number ) : void;

    // 1.3.9 BSTRPICK.{W/D}

    BSTRPICK_W ( rd:number, rj:number, msbw:number, lsbw:number ) : void;

    BSTRPICK_D ( rd:number, rj:number, msbd:number, lsbd:number ) : void;

    // 1.3.10 MASKEQZ,MASKNEZ

    MASKEQZ ( rd:number, rj:number, rk:number ) : void;

    MASKNEZ ( rd:number, rj:number, rk:number ) : void;

    // +-------------+
    //   1.4 转移指令  
    // +-------------+

    // 1.4.1 BEQ,BNE,BLT[U],BGE[U]
    // 其中 Loongarch32 接口中已经包含了：
    // BEQ,BNE,BLT,BLTU,BGE,BGEU

    // 1.4.2 BEQZ,BNEZ

    BEQZ ( rj:number, offs21:number ) : void;

    BNEZ ( rj:number, offs21:number ) : void;

    // 1.4.3 B
    // 其中 Loongarch32 接口中已经包含了 B

    // 1.4.4 BL
    // 其中 Loongarch32 接口中已经包含了 BL

    // 1.4.5 JIRL
    // 其中 Loongarch32 接口中已经包含了 JIRL

    // +-----------------+
    //   1.5 普通访存指令  
    // +-----------------+

    // 1.5.1 LD.{B[U]/H[U]/W[U]/D},ST.{B/H/W/D}
    // 其中 Loongarch32 接口中已经包含了：
    // LD.B,LD.BU,LD.H,LD.HU,LD.W,ST.B,ST.H,ST.W 

    LD_WU ( rd:number, rj:number, si12:number ) : void;

    LD_D  ( rd:number, rj:number, si12:number ) : void;
    
    ST_D  ( rd:number, rj:number, si12:number ) : void;

    // 1.5.2 LDX.{B[U]/H[U]/W[U]/D},STX.{B/H/W/D}

    LDX_B  ( rd:number, rj:number, rk:number ) : void;

    LDX_BU ( rd:number, rj:number, rk:number ) : void;

    LDX_H  ( rd:number, rj:number, rk:number ) : void;

    LDX_HU ( rd:number, rj:number, rk:number ) : void;

    LDX_W  ( rd:number, rj:number, rk:number ) : void;

    LDX_WU ( rd:number, rj:number, rk:number ) : void;

    LDX_D  ( rd:number, rj:number, rk:number ) : void;

    STX_B  ( rd:number, rj:number, rk:number ) : void;

    STX_H  ( rd:number, rj:number, rk:number ) : void;

    STX_W  ( rd:number, rj:number, rk:number ) : void;

    STX_D  ( rd:number, rj:number, rk:number ) : void;

    // 1.5.3 LDPTR.{W/D},STPTR.{W/D}

    LDPTR_W ( rd:number, rj:number, si14:number ) : void;

    LDPTR_D ( rd:number, rj:number, si14:number ) : void;

    STPTR_W ( rd:number, rj:number, si14:number ) : void;

    STPTR_D ( rd:number, rj:number, si14:number ) : void;

    // 1.5.4 PRELD
    // 其中 Loongarch32 接口中已经包含了：
    // PRELD

    // 1.5.5 PRELDX

    PRELDX ( hint:number, rj:number, rk:number ) : void;

    // +---------------------+
    //   1.6 边界检查访存指令  
    // +---------------------+

    // 1.6.1 LD{GT/LE}.{B/H/W/D},ST{GT/LE}.{B/H/W/D}

    LDGT_B ( rd:number, rj:number, rk:number ) : void;

    LDGT_H ( rd:number, rj:number, rk:number ) : void;

    LDGT_W ( rd:number, rj:number, rk:number ) : void;

    LDGT_D ( rd:number, rj:number, rk:number ) : void;

    LDLE_B ( rd:number, rj:number, rk:number ) : void;

    LDLE_H ( rd:number, rj:number, rk:number ) : void;

    LDLE_W ( rd:number, rj:number, rk:number ) : void;

    LDLE_D ( rd:number, rj:number, rk:number ) : void;

    STGT_B ( rd:number, rj:number, rk:number ) : void;

    STGT_H ( rd:number, rj:number, rk:number ) : void;

    STGT_W ( rd:number, rj:number, rk:number ) : void;

    STGT_D ( rd:number, rj:number, rk:number ) : void;

    STLE_B ( rd:number, rj:number, rk:number ) : void;

    STLE_H ( rd:number, rj:number, rk:number ) : void;

    STLE_W ( rd:number, rj:number, rk:number ) : void;

    STLE_D ( rd:number, rj:number, rk:number ) : void;
    
    // +-----------------+
    //   1.7 原子访存指令  
    // +-----------------+

    // 1.7.1 AM{SWAP/ADD/AND/OR/XOR/MAX/MIN}[_DB].{W/D},AM{MAX/MIN}[_DB].{WU/DU}

    AMSWAP_W    ( rd:number, rj:number, rk:number ) : void;

    AMSWAP_D    ( rd:number, rj:number, rk:number ) : void;
    
    AMSWAP_DB_W ( rd:number, rj:number, rk:number ) : void;
    
    AMSWAP_DB_D ( rd:number, rj:number, rk:number ) : void;
    
    AMADD_W     ( rd:number, rj:number, rk:number ) : void;
    
    AMADD_D     ( rd:number, rj:number, rk:number ) : void;
    
    AMADD_DB_W  ( rd:number, rj:number, rk:number ) : void;
    
    AMADD_DB_D  ( rd:number, rj:number, rk:number ) : void;
    
    AMAND_W     ( rd:number, rj:number, rk:number ) : void;
    
    AMAND_D     ( rd:number, rj:number, rk:number ) : void;
    
    AMAND_DB_W  ( rd:number, rj:number, rk:number ) : void;
    
    AMAND_DB_D  ( rd:number, rj:number, rk:number ) : void;
    
    AMOR_W      ( rd:number, rj:number, rk:number ) : void;
    
    AMOR_D      ( rd:number, rj:number, rk:number ) : void;
    
    AMOR_DB_W   ( rd:number, rj:number, rk:number ) : void;
    
    AMOR_DB_D   ( rd:number, rj:number, rk:number ) : void;
    
    AMXOR_W     ( rd:number, rj:number, rk:number ) : void;
    
    AMXOR_D     ( rd:number, rj:number, rk:number ) : void;
    
    AMXOR_DB_W  ( rd:number, rj:number, rk:number ) : void;
    
    AMXOR_DB_D  ( rd:number, rj:number, rk:number ) : void;
    
    AMMAX_W     ( rd:number, rj:number, rk:number ) : void;
    
    AMMAX_D     ( rd:number, rj:number, rk:number ) : void;
    
    AMMAX_DB_W  ( rd:number, rj:number, rk:number ) : void;
    
    AMMAX_DB_D  ( rd:number, rj:number, rk:number ) : void;
    
    AMMIN_W     ( rd:number, rj:number, rk:number ) : void;
    
    AMMIN_D     ( rd:number, rj:number, rk:number ) : void;
    
    AMMIN_DB_W  ( rd:number, rj:number, rk:number ) : void;
    
    AMMIN_DB_D  ( rd:number, rj:number, rk:number ) : void;

    AMMAX_WU    ( rd:number, rj:number, rk:number ) : void;

    AMMAX_DU    ( rd:number, rj:number, rk:number ) : void;

    AMMAX_DB_WU ( rd:number, rj:number, rk:number ) : void;

    AMMAX_DB_DU ( rd:number, rj:number, rk:number ) : void;

    AMMIN_WU    ( rd:number, rj:number, rk:number ) : void;

    AMMIN_DU    ( rd:number, rj:number, rk:number ) : void;

    AMMIN_DB_WU ( rd:number, rj:number, rk:number ) : void;

    AMMIN_DB_DU ( rd:number, rj:number, rk:number ) : void;

    // 1.7.2 LL.{W/D},SC.{W/D}
    // 其中 Loongarch32 接口中已经包含了：
    // LL.W,SC.W

    LL_D ( rd:number, rj:number, si14:number ) : void;

    SC_D ( rd:number, rj:number, si14:number ) : void;

    // +-------------+
    //   1.8 栅障指令  
    // +-------------+

    // 1.8.1 DBAR
    // 其中 Loongarch32 接口中已经包含了：
    // DBAR

    // 1.8.2 IBAR
    // 其中 Loongarch32 接口中已经包含了：
    // IBAR

    // +------------------+
    //   1.9 CRC 校验指令 
    // +------------------+

    // 1.9.1 CRC[C].W.{B/H/W/D}.W
    
    CRC_W_B_W  ( rd:number, rj:number, rk:number ) : void;

    CRC_W_H_W  ( rd:number, rj:number, rk:number ) : void;

    CRC_W_W_W  ( rd:number, rj:number, rk:number ) : void;

    CRC_W_D_W  ( rd:number, rj:number, rk:number ) : void;

    CRCC_W_B_W ( rd:number, rj:number, rk:number ) : void;

    CRCC_W_H_W ( rd:number, rj:number, rk:number ) : void;

    CRCC_W_W_W ( rd:number, rj:number, rk:number ) : void;

    CRCC_W_D_W ( rd:number, rj:number, rk:number ) : void;
    
    // +------------------+
    //   1.10 其他杂项指令  
    // +------------------+

    // 1.10.1 SYSCALL
    // 其中 Loongarch32 接口中已经包含了：
    // SYSCALL

    // 1.10.2 BREAK
    // 其中 Loongarch32 接口中已经包含了：
    // BREAK

    // 1.10.3 ASRT{LE/GT}.D

    ASRTLE_D ( rj:number, rk:number ) : void;

    ASRTGT_D ( rj:number, rk:number ) : void;

    // 1.10.4 RDTIME{L/H}.W,RDTIME.D
    // 其被 Loongarch32 中 RDCNTVL_W,RDCNTVH_W.RDCNTID 指令特殊引用

    RDTIMEL_W ( rd:number, rk:number ) : void;
 
    RDTIMEH_W ( rd:number, rk:number ) : void;
 
    RDTIME_D  ( rd:number, rk:number ) : void;
 
    // 1.10.5 CPUCFG

    CPUCFG ( rd:number, rk:number ) : void;

    /*
     * 2 基础浮点数指令
     */

    // +-------------------+
    //   2.1 浮点运算类指令  
    // +-------------------+

    // 2.1.1 F{ADD/SUB/MUL/DIV}.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FADD.S,FADD.D,FSUB.S,FSUB.D,FMUL.S,FMUL.D,DIV.S,DIV.D

    // 2.1.2 F{MADD/MSUB/NMADD/NMSUB}.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FMADD.S,FMADD.D,FMSUB.S,FMSUB.D,FNMADD.S,FNMADD.D
    // FNMSUB.S,FNMSUB.D

    // 2.1.3 F{MAX/MIN}.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FMAX.S,FMAX.D,FMIN.S,FMIN.D

    // 2.1.4 F{MAXA/MINA}.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FMAXA.S,FMAXA.D,FMINA.S,FMINA.D

    // 2.1.5 F{ABS/NEG}.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FABS.S,FABS.D,FNEG.S,FNEG.D

    // 2.1.6 F{SQRT/RECIP/RSQRT}.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FSQRT.S,FSQRT.D,FRECIP.S,FRECIP.D,FRSQRT.S,FRSQRT.D

    // 2.1.7 F{SCALEB/LOGB/COPYSIGN}.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FCOPYSIGN.S,FCOPYSIGN.D

    FSCALEB_S ( fd:number, fj:number, fk:number ) : void;
    FSCALEB_D ( fd:number, fj:number, fk:number ) : void;
    FLOGB_S   ( fd:number, fj:number ) : void;
    FLOGB_D   ( fd:number, fj:number ) : void;
    
    // 2.1.8 FCLASS.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FCLASS.S,FCLASS.D

    // +-----------------+
    //   2.2 浮点比较指令  
    // +-----------------+

    // 2.2.1 FCMP.cond.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FCMP.CAF.S,FCMP.CAF.D,FCMP.CUN.S,FCMP.CUN.D,FCMP.CEQ.S,FCMP.CEQ.D,
    // FCMP.CUEQ.S,FCMP.CUEQ.D,FCMP.CLT.S,FCMP.CLT.D,FCMP.CULT.S,FCMP.CULT.D,
    // FCMP.CLE.S,FCMP.CLE.D,FCMP.CULE.S,FCMP.CULE.D,FCMP.CNE.S,FCMP.CNE.D,
    // FCMP.COR.S,FCMP.COR.D,FCMP.CUNE.S,FCMP.CUNE.D,FCMP.SAF.S,FCMP.SAF.D,
    // FCMP.SUN.S,FCMP.SUN.D,FCMP.SEQ.S,FCMP.SEQ.D,FCMP.SUEQ.S,FCMP.SUEQ.D,
    // FCMP.SLT.S,FCMP.SLT.D,FCMP.SULT.S,FCMP.SULT.D,FCMP.SLE.S,FCMP.SLE.D,
    // FCMP.SULE.S,FCMP.SULE.D,FCMP.SNE.S,FCMP.SNE.D,FCMP.SOR.S,FCMP.SOR.D,
    // FCMP.SUNE.S,FCMP.SUNE.D

    // +-----------------+
    //   2.3 浮点转换指令  
    // +-----------------+

    // 2.3.1 FCVT.S.D,FCVT.D.S
    // 其中 Loongarch32 接口中已经包含了：
    // FCVT.S.D,FCVT.D.S

    // 2.3.2 FFINT.{S/D}.{W/L},FTINT.{W/L}.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FFINT.S.W,FFINT.W.S,FFINT.D.W,FFINT.W.D

    FFINT_S_L ( fd:number, fj:number ) : void;

    FFINT_D_L ( fd:number, fj:number ) : void;

    FTINT_L_S ( fd:number, fj:number ) : void;

    FTINT_L_D ( fd:number, fj:number ) : void;
    
    // 2.3.3 FTINT{RM/RP/RZ/RNE}.{W/L}.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FTINTRM.W.S,FTINTRM.W.D,FTINTRP.W.S,FTINTRP.W.D,FTINTRZ.W.S,FTINTRZ.W.D,
    // FTINTRNE.W.S,FTINTRNE.W.D

    FTINTRM_L_S  ( fd:number, fj:number) : void;

    FTINTRM_L_D  ( fd:number, fj:number) : void;
    
    FTINTRP_L_S  ( fd:number, fj:number) : void;
    
    FTINTRP_L_D  ( fd:number, fj:number) : void;
    
    FTINTRZ_L_S  ( fd:number, fj:number) : void;
    
    FTINTRZ_L_D  ( fd:number, fj:number) : void;
    
    FTINTRNE_L_S ( fd:number, fj:number) : void;
    
    FTINTRNE_L_D ( fd:number, fj:number) : void;
    
    // 2.3.4 FRINT.{S/D}

    FRINT_S ( fd:number, fj:number) : void;

    FRINT_D ( fd:number, fj:number) : void;
    
    // +-----------------+
    //   2.4 浮点搬运指令  
    // +-----------------+
    
    // 2.4.1 FMOV.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FMOV.S,FMOV.D

    // 2.4.2 FSEL
    // 其中 Loongarch32 接口中已经包含了：
    // FSEL

    // 2.4.3 MOVGR2FR.{W/D},MOVGR2FRH.W
    // 其中 Loongarch32 接口中已经包含了：
    // MOVGR2FR.W,MOVGR2FRH.W

    MOVGR2FR_D ( fd:number, rj:number) : void;

    // 2.4.4 MOVFR2GR.{S/D},MOVFRH2GR.S
    // 其中 Loongarch32 接口中已经包含了：
    // MOVFR2GR.S,MOVFRH2GR.S

    MOVFR2GR_D ( rd:number, fj:number) : void;

    // 2.4.5 MOVGR2FCSR,MOVFCSR2GR
    // 其中 Loongarch32 接口中已经包含了：
    // MOVGR2FCSR,MOVFCSR2GR

    // 2.4.6 MOVFR2CF,MOVCF2FR
    // 其中 Loongarch32 接口中已经包含了：
    // MOVFR2CF,MOVCF2FR

    // 2.4.7 MOVGR2CF,MOVCF2GR
    // 其中 Loongarch32 接口中已经包含了：
    // MOVGR2CF,MOVCF2GR

    // +-----------------+
    //   2.5 浮点分支指令  
    // +-----------------+

    // 2.5.1 BCEQZ,BCNEZ
    // 其中 Loongarch32 接口中已经包含了：
    // BCEQZ,BCNEZ

    // +---------------------+
    //   2.6 浮点普通访存指令  
    // +---------------------+

    // 2.6.1 FLD.{S/D},FST.{S/D}
    // 其中 Loongarch32 接口中已经包含了：
    // FLD.S,FLD.D,FST.S,FST.D

    // 2.6.2 FLDX.{S/D},FSTX.{S/D}

    FLDX_S ( fd:number, rj:number, rk:number ) : void;

    FLDX_D ( fd:number, rj:number, rk:number ) : void;

    FSTX_S ( fd:number, rj:number, rk:number ) : void;

    FSTX_D ( fd:number, rj:number, rk:number ) : void;
    
    // +-------------------------+
    //   2.7 浮点边界检查访存指令  
    // +-------------------------+

    // 2.7.1 FLD{GT/LT}.{S/D},FST{GT/LT}.{S/D}

    FLDGT_S ( fd:number, rj:number, rk:number ) : void;

    FLDGT_D ( fd:number, rj:number, rk:number ) : void;

    FLDLT_S ( fd:number, rj:number, rk:number ) : void;

    FLDLT_D ( fd:number, rj:number, rk:number ) : void;

    FSTGT_S ( fd:number, rj:number, rk:number ) : void;

    FSTGT_D ( fd:number, rj:number, rk:number ) : void;

    FSTLT_S ( fd:number, rj:number, rk:number ) : void;

    FSTLT_D ( fd:number, rj:number, rk:number ) : void;
    
    /*
     * 3 特权指令
     */

    // +------------------+
    //   3.1 CSR 访问指令 
    // +------------------+

    // 3.1.1 CSRRD,CSRWR,CSRXCHG
    // 其中 Loongarch32 接口中已经包含了：
    // CSRRD,CSRWR,CSRXCHG

    // +-------------------+
    //   3.2 IOCSR 访问指令 
    // +-------------------+
    
    // 3.2.1 IOCSR{RD/WR}.{B/H/W/D}

    IOCSRRD_B ( rd:number, rj:number ) : void;

    IOCSRRD_H ( rd:number, rj:number ) : void;

    IOCSRRD_W ( rd:number, rj:number ) : void;

    IOCSRRD_D ( rd:number, rj:number ) : void;

    IOCSRWR_B ( rd:number, rj:number ) : void;

    IOCSRWR_H ( rd:number, rj:number ) : void;

    IOCSRWR_W ( rd:number, rj:number ) : void;

    IOCSRWR_D ( rd:number, rj:number ) : void;

    // +--------------------+
    //   3.3 Cache 维护指令 
    // +--------------------+

    // 3.3.1 CACOP
    // 其中 Loongarch32 接口中已经包含了：
    // CACOP

    // +------------------+
    //   3.4 TLB 维护指令 
    // +------------------+

    // 3.4.1 TLBSRCH
    // 其中 Loongarch32 接口中已经包含了：
    // TLBSRCH

    // 3.4.2 TLBRD
    // 其中 Loongarch32 接口中已经包含了：
    // TLBRD

    // 3.4.3 TLBWR
    // 其中 Loongarch32 接口中已经包含了：
    // TLBWR

    // 3.4.4 TLBFILL
    // 其中 Loongarch32 接口中已经包含了：
    // TLBFILL

    // 3.4.5 TLBCLR

    TLBCLR () : void;

    // 3.4.6 TLBFLUSH

    TLBFLUSH () : void;

    // 3.4.7 INVTLB
    // 其中 Loongarch32 接口中已经包含了：
    // INVTLB

    // +--------------------+
    //   3.5 软件页表遍历指令 
    // +--------------------+

    // 3.5.1 LDDIR

    LDDIR ( rd:number, rj:number, level:number) : void;

    // 3.5.2 LDPTE

    LDPTE ( rj:number, req:number) : void;

    // +--------------------+
    //   3.6 其他杂项维护指令 
    // +--------------------+

    // 3.6.1 ERTN
    // 其中 Loongarch32 接口中已经包含了：
    // ERTN

    // 3.6.2 DBCL

    DBCL ( code:number ) : void;

    // 3.6.3 IDLE
    // 其中 Loongarch32 接口中已经包含了：
    // IDLE

}
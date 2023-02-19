import LoongsonRegisterGroup from "../register";
import Uint64 from "../../type/uint64";

namespace LoongarchTemplate {

    /**
     * 无符号整数比较大小
     * @param _LRG 内部寄存器组
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param rk 通用寄存器 rk 的索引
     */
    export function SLTU ( _LRG:LoongsonRegisterGroup, rd:number, rj:number, rk:number ) : void {

        let GRj = Uint64.cast(_LRG.GR[rj]);
        let GRk = Uint64.cast(_LRG.GR[rk]);

        _LRG.GR[rd] = GRj.lt(GRk) ? Uint64.ONE : Uint64.ZERO;

    }

}
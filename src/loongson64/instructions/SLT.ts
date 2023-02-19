import LoongsonRegisterGroup from "../register";
import Int64 from "../../type/int64";

namespace LoongarchTemplate {

    /**
     * 有符号整数比较大小
     * @param _LRG 内部寄存器组
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param rk 通用寄存器 rk 的索引
     */
    export function SLT ( _LRG:LoongsonRegisterGroup, rd:number, rj:number, rk:number ) : void {

        let GRj = Int64.cast(_LRG.GR[rj]);
        let GRk = Int64.cast(_LRG.GR[rk]);

        _LRG.GR[rd] = GRj.lt(GRk) ? Int64.ONE : Int64.ZERO;

    }

}
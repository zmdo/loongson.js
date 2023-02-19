import LoongsonRegisterGroup from "../register";
import Int64 from "../../type/int64";
import {SignExtend} from "./common/bitextend";

namespace LoongarchTemplate {

    /**
     * 有符号整数与立即数比较大小
     * @param _LRG 内部寄存器组
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param si12 12位立即数
     */
    export function SLTI ( _LRG:LoongsonRegisterGroup, rd:number, rj:number, si12:number ) : void {

        let GRj = Int64.cast(_LRG.GR[rj]);
        let tmp = Int64.cast(SignExtend(si12,12,_LRG.GRLEN));

        _LRG.GR[rd] = GRj.lt(tmp) ? Int64.ONE : Int64.ZERO;

    }

}
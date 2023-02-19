import LoongsonRegisterGroup from "../register";
import {SignExtend} from "../common/bitextend";
import Uint64 from "../../type/uint64";

namespace LoongarchTemplate {

    /**
     * 有符号整数与立即数比较大小
     * @param _LRG 内部寄存器组
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param si12 12位立即数
     */
    export function SLTUI ( _LRG:LoongsonRegisterGroup, rd:number, rj:number, si12:number ) : void {

        let GRj = Uint64.cast(_LRG.GR[rj]);
        let tmp = Uint64.cast(SignExtend(si12,12,_LRG.GRLEN));

        _LRG.GR[rd] = GRj.lt(tmp) ? Uint64.ONE : Uint64.ZERO;

    }

}
import { SignExtend } from "../common/bitextend";
import LoongsonRegisterGroup from "../register";
import Int64 from "../../type/int64";

namespace LoongarchTemplate {

    /**
     *
     * @param _LRG 内部寄存器组
     * @param rd 通用寄存器 rd 的索引
     * @param si20 20位立即数
     */
    export function PCADDU18I ( _LRG:LoongsonRegisterGroup, rd:number, si20:number ) : void {
        // tmp = SignExtend({si20,18'b0},GRLEN)
        let tmp = Int64.cast(SignExtend(si20 << 18,38,_LRG.GRLEN));
        // GR[rd] = PC + tmp
        _LRG.GR[rd] = Int64.cast(_LRG.PC[0]).add(tmp);
    }

}
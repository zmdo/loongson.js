import { W,D } from "./common/tag";
import { L32_MASK } from "./common/mask";
import { SignExtend } from "./common/sign";
import LoongsonRegisterGroup from "../../cpu/register";

namespace LoongarchTemplate {

/**
 * 
 * @param _LRG 内部寄存器组
 * @param tag 符号
 * @param rd 通用寄存器 rd 的索引
 * @param rj 通用寄存器 rj 的索引
 * @param rk 通用寄存器 rk 的索引
 */
export function ADD ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, rk:number ) : void {

    switch (tag) {
        case W :
            {
                let tmp = (_LRG.GR[rj] & L32_MASK) + (_LRG.GR[rk] & L32_MASK);
                _LRG.GR[rd] = SignExtend (tmp & L32_MASK, 32 ,_LRG.GRLEN);
            }
            break;
        case D :
            _LRG.GR[rd] = _LRG.GR[rj] + _LRG.GR[rk];
            break;
    }

}

}
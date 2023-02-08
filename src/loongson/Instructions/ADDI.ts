import { W,D } from "./common/tag";
import { L32_MASK, L12_MASK } from "./common/mask";
import { SignExtend } from "./common/sign";
import LoongsonRegisterGroup from "../register";

namespace LoongarchTemplate {

/**
 * 
 * @param _LRG 内部寄存器组
 * @param tag 符号
 * @param rd 通用寄存器 rd 的索引
 * @param rj 通用寄存器 rj 的索引
 * @param rk 通用寄存器 rk 的索引
 */
export function ADDI ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, si12:number ) : void {

    let _si12 = si12 & L12_MASK;

    switch (tag) {
        case W :
            {
                let tmp = (_LRG.GR[rj] & L32_MASK) + SignExtend(_si12, 12, 32);
                _LRG.GR[rd] = SignExtend (tmp & L32_MASK, 32, _LRG.GRLEN );
            }
            break;
        case D :
            _LRG.GR[rd] = _LRG.GR[rj] + SignExtend(_si12, 12 ,64);
            break;
    }
    
}

}
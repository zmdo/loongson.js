import { W,WU,D } from "./common/tag";
import { L2_MASK, L32_MASK } from "./common/mask";
import LoongsonRegisterGroup from "../register";
import { SignExtend, ZeroExtend } from "./common/sign";

namespace LoongarchTemplate {

/**
 * 
 * @param _LRG 内部寄存器组
 * @param tag 符号
 * @param rd 通用寄存器 rd 的索引
 * @param rj 通用寄存器 rj 的索引
 * @param rk 通用寄存器 rk 的索引
 * @param sa2 2位立即数
 */
export function ALSL ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, rk:number, sa2:number ) {

    let _sa2 = sa2 & L2_MASK;
    
    switch (tag) {
        case W  :
            {
                let tmp = 
                    ((_LRG.GR[rj] & L32_MASK) << (_sa2 + 1)) + (_LRG.GR[rk] & L32_MASK);
                _LRG.GR[rd] = SignExtend(tmp & L32_MASK, 32 ,_LRG.GRLEN);
            }
            break;
        case WU :
            {
                let tmp = 
                    ((_LRG.GR[rj] & L32_MASK) << (_sa2 + 1)) + (_LRG.GR[rk] & L32_MASK);
                _LRG.GR[rd] = ZeroExtend(tmp & L32_MASK, 32 , _LRG.GRLEN);
            }
            break;
        case D  :
            _LRG.GR[rd] = (_LRG.GR[rj] << (_sa2 + 1)) + _LRG.GR[rk];
            break;
    }

}

}
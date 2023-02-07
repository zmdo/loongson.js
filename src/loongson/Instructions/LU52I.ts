import { D } from "./common/tag";
import { L12_MASK, L32_MASK, L52_MASK } from "./common/mask";
import LoongsonRegisterGroup from "../../cpu/register";

namespace LoongarchTemplate {

/**
 * 
 * @param _LRG 内部寄存器组
 * @param tag 符号
 * @param rd 通用寄存器 rd 的索引
 * @param rj 通用寄存器 rj 的索引
 * @param si12 12位立即数
 */
export function LU52I ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, si12:number ) {

    let _si12 = si12 & L12_MASK;
    
    switch (tag) {
        case D  :
            _LRG.GR[rd] = (_si12 << 52) | (_LRG.GR[rj] & L52_MASK);
            break;
    }

}

}
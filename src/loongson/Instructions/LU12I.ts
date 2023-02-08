import { W } from "./common/tag";
import { L20_MASK } from "./common/mask";
import LoongsonRegisterGroup from "../register";
import { SignExtend } from "./common/sign";

namespace LoongarchTemplate {

/**
 * 
 * @param _LRG 内部寄存器组
 * @param tag 符号
 * @param rd 通用寄存器 rd 的索引
 * @param si20 20位立即数
 */
export function LU12I ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, si20:number ) {

    let _si20 = si20 & L20_MASK;
    
    switch (tag) {
        case W  :
            _LRG.GR[rd] = SignExtend (_si20 << 12, 32, _LRG.GRLEN);
            break;
    }

}

}
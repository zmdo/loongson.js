import { D } from "./common/tag";
import { L16_MASK } from "./common/mask";
import LoongsonRegisterGroup from "../register";
import { SignExtend } from "./common/sign";

namespace LoongarchTemplate {

/**
 * 
 * @param _LRG 内部寄存器组
 * @param tag 符号
 * @param rd 通用寄存器 rd 的索引
 * @param rj 通用寄存器 rj 的索引
 * @param si16 16位立即数
 */
export function ADDU16I ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, si16:number ) : void {

    let _si16 = si16 & L16_MASK;

    switch (tag) {
        case D :
            _LRG.GR[rd] = _LRG.GR[rj] + SignExtend(_si16 << 16, 32 , 64) ;  
            break;
    }

}

}
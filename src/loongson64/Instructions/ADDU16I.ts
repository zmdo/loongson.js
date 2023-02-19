import { D } from "../common/tag";
import { SignExtend } from "../common/bitextend";
import LoongsonRegisterGroup from "../register";
import Int64 from "../../type/int64";

namespace LoongarchTemplate {

    /**
     * 整数加法指令
     * @param _LRG 内部寄存器组
     * @param tag 符号
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param si16 16位立即数
     */
    export function ADDU16I ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, si16:number ) : void {

        let GRj = Int64.cast(_LRG.GR[rj]);

        switch (tag) {
            case D : // 64位加法运算
            {
                // 将 si16 左移16位后，其长度就变成了 32 位
                // si16Lft = si16 << 16
                let si16Lft = Int64.cast(si16).left(16);
                // si16Ext = signExtend(si16Lft,64)
                let si16Ext = Int64.cast(SignExtend(si16Lft,32,64));
                // GR[rd] = GR[rj] + si16Ext
                _LRG.GR[rd] = GRj.add(si16Ext);
            }
                break;
        }

    }

}
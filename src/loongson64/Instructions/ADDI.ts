import { W,D } from "./common/tag";
import { SignExtend } from "./common/bitextend";
import LoongsonRegisterGroup from "../register";
import Int64 from "../../type/int64";

namespace LoongarchTemplate {

    /**
     * 整数加法指令
     * @param _LRG 内部寄存器组
     * @param tag 符号
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param si12 12位立即数
     */
    export function ADDI ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, si12:number ) : void {

        let GRj = Int64.cast(_LRG.GR[rj]);

        switch (tag) {
            case W : // 32位加法运算
            {
                let si12Ext = Int64.cast(SignExtend(si12,12,32));
                let tmp = (GRj.slice(31,0).add(si12Ext));
                _LRG.GR[rd] = SignExtend (tmp.slice(31,0), 32 ,_LRG.GRLEN);
            }
                break;
            case D : // 64位加法运算
            {
                let si12Ext = Int64.cast(SignExtend(si12,12,64));
                _LRG.GR[rd] = GRj.add(si12Ext);
            }
                break;
        }

    }

}
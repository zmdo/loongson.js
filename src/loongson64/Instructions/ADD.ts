import { W,D } from "./common/tag";
import { SignExtend } from "./common/bitextend";
import LoongsonRegisterGroup from "../register";
import Int64 from "../../type/int64";

namespace LoongarchTemplate {

    /**
     * 有符号整数加法指令
     * @param _LRG 内部寄存器组
     * @param tag 符号
     * @param rd 通用寄存器 rd 的索引
     * @param rj 通用寄存器 rj 的索引
     * @param rk 通用寄存器 rk 的索引
     */
    export function ADD ( _LRG:LoongsonRegisterGroup, tag:number, rd:number, rj:number, rk:number ) : void {

        let GRj = Int64.cast(_LRG.GR[rj]);
        let GRk = Int64.cast(_LRG.GR[rk]);

        switch (tag) {
            case W : // 32位有符号加法运算
            {
                let tmp = (GRj.slice(31,0).add(GRk.slice(31,0)));
                _LRG.GR[rd] = SignExtend (tmp.slice(31,0), 32 ,_LRG.GRLEN);
            }
                break;
            case D : // 64位有符号加法运算
                _LRG.GR[rd] = GRj.add(GRk);
                break;
        }

    }

}
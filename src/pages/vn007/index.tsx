import React, { useEffect, useState } from 'react'
import vn007 from "@/assets/wasm/vn.wasm?url"
import { useWasm } from '@/hooks/useWasm';

type Props = {}

export default function index({}: Props) {
    const [result, setResult] = useState("")
    const { initialized } = useWasm({
        destory: () => {
            if(window.calcPassword){
                delete window.calcPassword;
            }
        }, 
        wasmUrl: vn007
    })
    function calc(imei: string = "000000000000000") {
        try {
            if(!imei){
                setResult("请输入有效的IMEI");
                return;
            }
            let result = window.calcPassword?.(imei);
            setResult(result || "计算失败");
        } catch (error) {
            console.error("计算超级密码失败", error);
        }
    }
    useEffect(() => {
        if (initialized) {
            calc();
        }
    }, [initialized])
    return (
        <div>编号000000000000000超级密码计算结果是: {result}</div>
    )
}

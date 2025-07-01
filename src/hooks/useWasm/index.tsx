import React from 'react'

type Props = {
    wasmUrl: string;
    destory?: Function;
}

export const useWasm = ({ wasmUrl, destory }: Props) => {
    const [initialized, setInitialized] = React.useState(false);
    async function initWasm() {
        try {
            await import('./wasm_exec.js');
            const go = new (window as any).Go();
            const response = await fetch(wasmUrl);
            const { instance } = await WebAssembly.instantiateStreaming(response, go.importObject);
            go.run(instance);
            setInitialized(true);
        } catch (error) {
            console.log("wasm",error);
        }
    }
    React.useEffect(() => {
        initWasm();
        return () => {
            destory?.();
        }
    },[])
    return { initialized };
}
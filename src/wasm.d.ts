// wasm.d.ts
declare module '*/wasm_exec.js' {
  class Go {
    importObject: WebAssembly.Imports;
    run(instance: WebAssembly.Instance): Promise<void>;
  }
  export default Go;
}
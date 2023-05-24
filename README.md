# deno-leptess
Deno bindings for [leptess](https://github.com/houqp/leptess).

## Usage

```typescript
import { pix_read } from "./bindings/bindings.ts";

async function main() {
  const file = await Deno.readFile("./fixtures/test.png");
  const text = pix_read("jpn", file);
  console.log(text);
}

await main();
```

```sh
$ deno run -A --unstable main.ts
最近Wasmの勢いがすごくて、ブラウザでPostgreSQLを動かせたり、DockerでWasmを動かせたり
できます。

以前からWasm自体に興味があって、動作原理を知りたいと思って chibiwasm というRuntimeを実
装してみました。

Rustを選んだのは、最近Rustを勉強していてそれに慣れるためです。

苦労しましたが、 *.wasm がどのようにして実行されるのかを理解できたので良かったです。
```

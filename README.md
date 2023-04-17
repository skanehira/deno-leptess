# deno-leptess
Deno bindings for [leptess](https://github.com/houqp/leptess).

## Usage

```typescript
import { pix_read } from "./mod.ts";

const file = await Deno.open("./fixtures/jpn.png");
try {
  const text = await pix_read("jpn", file);
  console.log(text);
} catch (_) {
  file.close();
}
```

```sh
$ deno run -A --unstable main.ts
音声とは人の喉から言語として発せられた振動である。最も単純な表現として音声は波、すなわち振幅の時間変動で表される。一方で波には
様々な表現が存在する。例えばフーリエ変換を介して周波数表現でも等価に表現できるし、STFTによりスペクトログラムとしても表現でき
る。このように波である音声を分析し異なる表現へ変換することを音声分析という。

音声分析により得られる音響特徴言にはスペクトログラム、基本周波数などが挙げられる。 これらの音響特徴量は音声認識や音声合成の入力
として利用される。

```

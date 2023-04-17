import { pix_read } from "./mod.ts";

const file = await Deno.open("./fixtures/jpn.png");
try {
  const text = await pix_read("jpn", file);
  console.log(text);
} catch (_) {
  file.close();
}

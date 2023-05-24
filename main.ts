import { pix_read } from "./bindings/bindings.ts";

async function main() {
  const file = await Deno.readFile("./fixtures/test.png");
  const text = pix_read("jpn", file);
  console.log(text);
}

await main();

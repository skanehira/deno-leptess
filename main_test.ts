import { assertSnapshot } from "https://deno.land/std@0.187.0/testing/snapshot.ts";
import { pix_read } from "./bindings/bindings.ts";

Deno.test("read text from image", async (t) => {
  const file = await Deno.readFile("./fixtures/test.png");
  const text = pix_read("jpn", file);
  await assertSnapshot(t, text);
});

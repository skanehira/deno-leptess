import { readAll } from "https://deno.land/std@0.183.0/streams/read_all.ts";

function encode(v: string): Uint8Array {
  return new TextEncoder().encode(v);
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v);
}

// deno-lint-ignore no-explicit-any
function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v);
  const lengthBe = new Uint8Array(4);
  const view = new DataView(lengthBe.buffer);
  ptr.copyInto(lengthBe, 0);
  const buf = new Uint8Array(view.getUint32(0));
  ptr.copyInto(buf, 4);
  return buf;
}

const libName = "./target/debug/libdeno_leptess.dylib";

const lib = Deno.dlopen(
  libName,
  {
    "pix_read": {
      parameters: ["pointer", "usize", "pointer", "usize"],
      result: "pointer",
    },
  } as const,
);

export async function pix_read(
  language: string,
  r: Deno.Reader,
): Promise<string> {
  const name_buf = encode(language);
  const name_ptr = Deno.UnsafePointer.of(name_buf);

  const image_buf = await readAll(r);
  const image_ptr = Deno.UnsafePointer.of(image_buf);

  const rawResult = lib.symbols.pix_read(
    name_ptr,
    name_buf.byteLength,
    image_ptr,
    image_buf.byteLength,
  );
  const result = readPointer(rawResult);
  return decode(result);
}

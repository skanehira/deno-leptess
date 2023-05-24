// Auto-generated with deno_bindgen
function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v
  return new TextEncoder().encode(v)
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v)
}

// deno-lint-ignore no-explicit-any
function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v)
  const lengthBe = new Uint8Array(4)
  const view = new DataView(lengthBe.buffer)
  ptr.copyInto(lengthBe, 0)
  const buf = new Uint8Array(view.getUint32(0))
  ptr.copyInto(buf, 4)
  return buf
}

const url = new URL("../target/debug", import.meta.url)

let uri = url.pathname
if (!uri.endsWith("/")) uri += "/"

// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
if (Deno.build.os === "windows") {
  uri = uri.replace(/\//g, "\\")
  // Remove leading slash
  if (uri.startsWith("\\")) {
    uri = uri.slice(1)
  }
}

const { symbols } = Deno.dlopen(
  {
    darwin: uri + "libdeno_leptess.dylib",
    windows: uri + "deno_leptess.dll",
    linux: uri + "libdeno_leptess.so",
    freebsd: uri + "libdeno_leptess.so",
    netbsd: uri + "libdeno_leptess.so",
    aix: uri + "libdeno_leptess.so",
    solaris: uri + "libdeno_leptess.so",
    illumos: uri + "libdeno_leptess.so",
  }[Deno.build.os],
  {
    pix_read: {
      parameters: ["buffer", "usize", "buffer", "usize"],
      result: "buffer",
      nonblocking: false,
    },
  },
)

export function pix_read(a0: string, a1: Uint8Array) {
  const a0_buf = encode(a0)
  const a1_buf = encode(a1)

  const rawResult = symbols.pix_read(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
  )
  const result = readPointer(rawResult)
  return decode(result)
}

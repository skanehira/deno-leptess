use leptess::{leptonica, tesseract};

/// # Safety
#[no_mangle]
pub unsafe extern "C" fn pix_read(
    arg0: *const u8,
    arg1: usize,
    arg2: *const u8,
    arg3: usize,
) -> *const u8 {
    let buf = unsafe { std::slice::from_raw_parts(arg0, arg1) };
    let language = String::from_utf8_lossy(buf);

    let image = unsafe { std::slice::from_raw_parts(arg2, arg3) };

    let mut api = tesseract::TessApi::new(None, &language).unwrap();
    let pix = leptonica::pix_read_mem(image).unwrap();
    api.set_image(&pix);

    let text = api.get_utf8_text().expect("cannot get text from image");

    let encoded = text.into_bytes();
    let length = (encoded.len() as u32).to_be_bytes();
    let mut data = length.to_vec();
    data.extend(encoded);
    let ret_ptr = data.as_ptr();
    std::mem::forget(data);
    ret_ptr
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::{fs, path::Path};

    fn read_bytes_from_ptr(ptr: *const u8, offset: isize, length: usize) -> Vec<u8> {
        let mut bytes = vec![0; length];
        let mut p = ptr;
        if offset != 0 {
            unsafe {
                p = ptr.offset(offset);
            }
        }
        unsafe {
            p.copy_to(bytes.as_mut_ptr(), length);
        }
        bytes
    }

    #[test]
    fn test_pix_read() {
        let lang = "jpn";
        let image = fs::read(Path::new("./fixtures/jpn.png")).unwrap();
        let result_ptr =
            unsafe { pix_read(lang.as_ptr(), lang.len(), image.as_ptr(), image.len()) };

        let mut size_bytes = [0u8; 4];
        unsafe {
            result_ptr.copy_to(size_bytes.as_mut_ptr(), 4);
        }
        let size = u32::from_be_bytes(size_bytes);

        let bytes = read_bytes_from_ptr(result_ptr, 4, size as usize);
        let text = String::from_utf8_lossy(&bytes);
        insta::assert_debug_snapshot!(text);
    }
}

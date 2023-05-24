use deno_bindgen::*;
use leptess::{leptonica, tesseract};

#[deno_bindgen]
pub fn pix_read(language: &str, image: &[u8]) -> String {
    let mut api = tesseract::TessApi::new(None, &language).unwrap();
    let pix = leptonica::pix_read_mem(image).unwrap();

    api.set_image(&pix);
    let text = api.get_utf8_text().expect("cannot get text from image");

    text
}

import svgCaptcha from 'svg-captcha';

export function createCaptcha() {
  const captcha = svgCaptcha.create();
  const text = captcha.text;
  const svg = captcha.data;
  return { text, svg };
}
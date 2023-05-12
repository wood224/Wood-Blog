export const getAssets = (img: string) => {
  const imgUrl = new URL(`/src/assets/img/${img}`, import.meta.url).href;
  return imgUrl;
}
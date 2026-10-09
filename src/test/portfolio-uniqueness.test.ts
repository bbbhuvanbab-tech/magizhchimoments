import { expect, it } from "vitest";
import { fetchAllPortfolioImages, fetchPortfolioImages, uniquePortfolioImages } from "@/data/portfolio";

it("displays each genuine photo once in All, including identical files with different names", async () => {
  const images = await fetchAllPortfolioImages();
  expect(images).toHaveLength(28);
  expect(uniquePortfolioImages(images)).toHaveLength(25);
  expect(uniquePortfolioImages([...images, images[0]])).toHaveLength(25);
});

it("keeps both genuine baby shower photos without inventing coverage", async () => {
  const images = await fetchPortfolioImages();
  expect(uniquePortfolioImages(images.babyShowers)).toHaveLength(2);
});
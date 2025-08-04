import { Request, Response } from "express";
import puppeteer, { Browser } from "puppeteer";

export const renderController = {
  render: async function (req: Request, res: Response): Promise<void> {
    let browser: Browser | undefined;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      await page.setViewport({ width: 1080, height: 1080 });

      await page.goto(
        "https://glass.fleet.im/render/glass?text=sdf&option=bloomIntensity=1.5:chromaticAberration=0.001",
        { waitUntil: "networkidle2" }
      );

      const pageTitle = await page.title();
      await page.screenshot({ path: "render_result.png" });

      res.status(200).send({
        status: "success",
        message: "saved",
        title: pageTitle,
      });
    } catch (error) {
      console.error("Puppeteer 렌더링 중 오류 발생:", error);
      res.status(500).send({
        status: "error",
        message: "error",
      });
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  },
};

import path from "path";

export * as PDF from "./pdf";

import puppeteer, {Browser} from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import nunjucks from "nunjucks";

export async function generate() {
    let browser: Browser;

    try {
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: true
        });

        let headerContent = nunjucks.render(
            `./templates/header_en.html`, {});
        let footerContent = nunjucks.render(
            `./templates/footer_en.html`, {});
        let html = nunjucks.render(
            `./templates/pdf-template_en.html`, {});

        const page = await browser.newPage();
        const emptyHtml = path.resolve("./templates/empty.html");
        await page.goto("file://" + emptyHtml); // This makes sure the page is initialized (and empty) before we push content to it
        await page.content();
        await page.setContent(html);
        console.log('Content set');
        const fileName = `file.pdf`;
        const filePath = `/tmp/${fileName}`;
        const pdf = await page.pdf({
            path: filePath,
            printBackground: true,
            // @ts-ignore: Extra property not identified by TS
            '-webkit-print-color-adjust': 'exact',
            format: 'a4',
            displayHeaderFooter: true,
            headerTemplate: headerContent,
            footerTemplate: footerContent,
            margin: {
                top: `30mm`,
                bottom: `15mm`
            },
        });
        console.log('Page retrieved');

        const response = {
            headers: {
                'Content-type': 'application/pdf',
                'content-disposition': `attachment; filename=${fileName}}`
            },
            statusCode: 200,
            body: pdf.toString('base64'),
            isBase64Encoded: true
        }
        //     // result = await page.title();
        console.log("PDF Generated")
        return response

    } catch (error) {
        console.log(error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }

}

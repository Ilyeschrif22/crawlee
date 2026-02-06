import { PlaywrightCrawler } from 'crawlee';

async function main() {
    const crawler = new PlaywrightCrawler({
        async requestHandler({ request, page, enqueueLinks, pushData, log }) {
            log.info(`Processing ${request.url}`);

            const articles = await page.$$('article.placard.placard-option-diamond.has-header.js-diamond.tmpl-diamond');

            for (const article of articles) {
                const text = await article.innerText();
                await pushData({ url: request.url, text /*, title */ });
            }

            await enqueueLinks();

        },
        maxRequestsPerCrawl: 20,
    });

    await crawler.run(['https://www.apartments.com/san-francisco-ca/']);

    await crawler.exportData('./result.csv');

    const data = await crawler.getData();
    console.table(data.items);
}

main().catch(console.error);


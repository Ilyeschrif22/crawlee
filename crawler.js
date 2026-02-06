import { PlaywrightCrawler } from 'crawlee';

async function main() {
    const crawler = new PlaywrightCrawler({
        async requestHandler({ request, page, enqueueLinks, pushData, log }) {
            log.info(`Processing ${request.url}`);

            // Select all article elements with that class
            const articles = await page.$$('article.placard.placard-option-diamond.has-header.js-diamond.tmpl-diamond');

            for (const article of articles) {
                // For example, extract the text content of the article
                const text = await article.innerText();

                // Or extract some specific info like title or price by querying inside the article
                // const title = await article.$eval('h3', el => el.innerText).catch(() => null);

                await pushData({ url: request.url, text /*, title */ });
            }

            // Enqueue links to follow, if you want to crawl more pages
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


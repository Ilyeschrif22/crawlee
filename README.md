```markdown
# Crawlee Crawler Project

## Overview
This project uses Crawlee with PlaywrightCrawler to scrape apartment listing data from websites. It extracts article information and exports results to CSV format.

## Installation

```bash
npm install crawlee playwright
```

## Project Structure

```
.
├── crawler.js          # Main crawler script
├── result.csv          # Output file (generated after run)
├── package.json        # Project dependencies
└── README.md          # This file
```

## Usage

Run the crawler:

```bash
node crawler.js
```
## Output

The crawler generates two outputs:

1. **CSV File**: `result.csv` - Contains all scraped data
2. **Console Table**: Formatted display of results in terminal

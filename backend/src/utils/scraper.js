import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeStore(url) {
  try {

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    // TITLE
    const title = $("title").text();

    // META DESCRIPTION
    const metaDescription =
      $('meta[name="description"]').attr("content");

    // HEADINGS
    const headings = [];

    $("h1, h2, h3").each((i, el) => {
      headings.push($(el).text().trim());
    });

    // PARAGRAPHS
    const paragraphs = [];

    $("p").each((i, el) => {
      const text = $(el).text().trim();

      if (text.length > 40) {
        paragraphs.push(text);
      }
    });

    return {
      title,
      metaDescription,
      headings: headings.slice(0, 20),
      paragraphs: paragraphs.slice(0, 30),
    };

  } catch (error) {
    console.error(error);

    return null;
  }
}
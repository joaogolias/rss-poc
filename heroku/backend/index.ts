import "./global";
import express from "express";
import { parse } from 'node-html-parser';
import Parser from "rss-parser";
import { rssInputs, RSSInput} from "./constants";

const app = express()

app.get("/rss", async (_: any, res) => {
  try {
    const parseFeeds = async (inputs: RSSInput[]) => {
      const result = await Promise.all(
        inputs.map(async (input) => {
          const parser = new Parser()
          const feed = await parser.parseURL(input.link);
          return (feed.items || [])
            .filter(input.filter || (() => true)) 
            .map((item) => {
              if (!item.content) {
                return item
              }
              const rootHtml = parse(item.content)
              const img = rootHtml.querySelector("img")
              const src = img && img.rawAttributes["src"]
              return {
                imageSource: src || input.defaultThumbnail,
                ...item,
              }
            })
        })
      )
  
      return result.selfConcat()
    }
  
    const result = await parseFeeds(rssInputs)
    
    res.send({
      qtd: result.length,
      items: result
    })
  } catch (err) {
    res.status(400).send({
      message: err.message
    })
  }
  
})

app.listen(process.env.PORT || 8080, () => {
  console.log("Running on ", process.env.PORT  || 8080)
})
import React, { useEffect, useState } from 'react';
import "./Rss.css";

interface News {
  imageSource: string,
  title: string,
  contentSnippet: string
  link: string
}

const Rss = () => { 
  const [newsList, setNews] = useState<News[]>([])
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3005/rss", {
        method: "GET"
      })
      const newsJson = await res.json()
      setNews(newsJson.items)
    })()
  }, [])
  console.log()
  return (
    <div className="main-container">
      {
        newsList.map((news) => {
          return (
            <div onClick={() => { window.open(news.link, "_blank") }}className="news-items">
              <div className="news-img-container"> <img className="news-img" src={news.imageSource} /> </div> 
              <div>
                <h5 className="news-title"> {news.title} </h5>
                <p className="news-snippet"> {
                  (() => {
                    let snippet = news.contentSnippet
                    if (snippet.length > 150) {
                      snippet = `${snippet.substr(0, 150 - 3)}...`
                    }
                    return snippet
                  })()
                } </p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default Rss
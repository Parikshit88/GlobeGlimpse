import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const updateNews = async () => {
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true);
  let data = await fetch(url);
  props.setProgress(35);
  let parsedData = await data.json();
  props.setProgress(65);

  setArticles(parsedData.articles);
  setLoading(false);
  setTotalResults(parsedData.totalResults);
  props.setProgress(100);
};

useEffect(() => {
    document.title = `${capitalizeFirstLetter(
    props.category
  )} - GlobeGlimpse`;
     updateNews();
     // eslint-disable-next-line
}, []);

// const handleNextClick = async () => {
//   setPage(page + 1);
//   updateNews();
// };

// const handlePrevClick = async () => {
//   setPage(page - 1);
//   updateNews();
// };

const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  setPage(page + 1);
  let data = await fetch(url);
  let parsedData = await data.json();
  setArticles(articles.concat(parsedData.articles));
  setTotalResults(parsedData.totalResults);
};

return (
  <>
    {/* <div className="container my-4"> */}
    <h1 style={{ margin: "30px 0px", marginTop: '90px' }} className="text-center">
      GlobeGlimpse - Top {capitalizeFirstLetter(props.category)} Headlines
    </h1>
    {loading && <Spinner />}
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner />}
    >
      <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 68) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.webp?b=1&s=170667a&w=0&k=20&c=sY8G6CS65VlmrW1FKwOgOSMpc8AjxCIPVkiIX62Fq8c="
                  }
                  author={element.author}
                  source={element.source.name}
                  date={element.publishedAt}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  </>
)
        
        }
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;

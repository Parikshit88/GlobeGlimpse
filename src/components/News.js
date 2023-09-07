import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
constructor(){
    super();
    this.state = {
            articles: [],
            loading: false,
            page: 1
        }
}
async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=27db16cf1f2247189216a56edd545a77&page=1&pageSize=20";
    let data = fetch(url);
    let parsedData = await (await data).json()
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})

}
handleNextClick = async()=>{
    if( this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
            
    }
    else{
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=27db16cf1f2247189216a56edd545a77&page=${this.state.page + 1}&pageSize=20`;
            let data = fetch(url);
            let parsedData = await (await data).json()
            this.setState({
                page: this.state.page + 1,
                articles:  parsedData.articles

            })
        }
}

handlePrevClick = async()=> {
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=27db16cf1f2247189216a56edd545a77&page=${this.state.page - 1}&pageSize=20`;
    let data = fetch(url);
    let parsedData = await (await data).json()
    this.setState({
        page: this.state.page - 1,
        articles:  parsedData.articles
    })
}

  render() {
    return (
      <div className='container my-4'>
      <h1>GlobeGlimpse - Headlines</h1>
            <div className="row">
            {this.state.articles.map((element)=>{

               return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,68):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.webp?b=1&s=170667a&w=0&k=20&c=sY8G6CS65VlmrW1FKwOgOSMpc8AjxCIPVkiIX62Fq8c="} newsUrl={element.url}/>
                </div>
            })}
            </div>
            <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
      </div>
    )
  }
}

export default News
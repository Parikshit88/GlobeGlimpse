import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

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
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=27db16cf1f2247189216a56edd545a77&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = fetch(url);
    let parsedData = await (await data).json()
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })

}
handleNextClick = async()=>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))   
    {
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=27db16cf1f2247189216a56edd545a77&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = fetch(url);
            let parsedData = await (await data).json()
            this.setState({
                page: this.state.page + 1,
                articles:  parsedData.articles,
                loading: false

            })
        }
}

handlePrevClick = async()=> {
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=27db16cf1f2247189216a56edd545a77&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = fetch(url);
            let parsedData = await (await data).json()
            this.setState({
                page: this.state.page - 1,
                articles:  parsedData.articles,
                loading: false
            })
}

  render() {
    return (
      <div className='container my-4'>
      <h1 className='text-center my-4'>GlobeGlimpse - Headlines</h1>
      {this.state.loading && <Spinner/>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{

               return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,68):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.webp?b=1&s=170667a&w=0&k=20&c=sY8G6CS65VlmrW1FKwOgOSMpc8AjxCIPVkiIX62Fq8c="} newsUrl={element.url}/>
                </div>
            })}
            </div>
            <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
      </div>
    )
  }
}

export default News
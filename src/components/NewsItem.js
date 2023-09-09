import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
        <div className='my-3'>
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt="..." style={{height: '300px'}}/>
                <div className="card-body">
                    <h5 className="card-title"><span className="badge text-bg-danger mb-2 my-1">{source}</span><br/>{title}....</h5>
                    <p className="card-text">{description}....</p>
                    <p className="card-text"><small className="text-muted"><b>By {!author?"Unknown":author}</b><br/>{new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark d-flex justify-content-center">Read More</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem
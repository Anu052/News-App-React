import React, { Component } from "react";
import Newsitem from "./Newsitem";
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps={
    country: 'in',
    pagesize: 8,
    category: 'general',
  }
  static propTypes ={
    country:  PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,

  }
  constructor(){
    super();
    this.state = {
        articles: [],
        loading: false,
        page: 1
    }
}
  async componentDidMount() {
    console.log("cdm");
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e4831e75f20488f8df05bede7c36d72`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles }); 
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
  })
  }
  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    }
    else {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e4831e75f20488f8df05bede7c36d72&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })
    }
    
}
handlePrevClick = async () => {
  console.log("Previous");
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e4831e75f20488f8df05bede7c36d72”&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
  })
}
  render() {
    return (
      <div className="container my-3">
        <h2>News Website</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  urlToImage={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="container">
        <div className="container d-flex justify-content-between">
    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;
        Previous</button>
    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
</div>
        </div>
      </div>
      
    );
  }
}

export default News;

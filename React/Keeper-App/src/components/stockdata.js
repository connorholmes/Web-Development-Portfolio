import React, { Component } from 'react';


class StockData extends Component {
    state = {
        info: {}
    }

    
    url = "http://localhost:4000/stockdata"
    
    componentDidMount() {
        fetch(this.url)
        .then(res => res.json())
        .then((data) => {
            this.setState({ info: data})
            console.log(this.state.info)
        })
        .catch(console.log)
    }

    render() {
        return (
            <div>
                <h1>It worked!</h1>
                {console.log(this.state)}
             </div>
        )
    }
}

export default StockData;
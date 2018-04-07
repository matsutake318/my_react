import React, { Component } from 'react';
import './App.css';

class Post extends Component {
    render() {
        return (
            <div className="kakikomi">
                <div>{this.props.post.kakikomi}</div>
                <p className="name">{this.props.post.name}</p>
            </div>
        );
    }
}

class List extends Component {
    // 書き込み一覧
    constructor(props) {
        super(props);
        this.state = {posts:[]};
    }
    // 書き込み一覧をサーバーから取得
    componentDidMount() {
        fetch('/api/v1/Post?sort={"_id":-1}')
            .then(response => response.json())
            .then(data => this.setState({ posts: data }));
    }
    render() {
        const {posts} = this.state;
        var list = [];
        for (var i in posts) {
            list.push( <li key={i}><Post post={posts[i]} /></li> );
        }
        return (<ul>{list}</ul>);
    }
}


class Header extends Component {
    render() {
        return (
            <header>
                <h1>掲示板</h1>
                <nav>
                    <ul>
                        <li><a href="/">トップ</a></li>
                        <li><a href="#">投稿</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <List />
            </div>
        );
    }
}

export default App;
import React, { useState, useEffect } from "react";
import axios from 'axios';
import './styles.css'

const News = () => {
    const key = 'c9a0a130f49844e78381f85cbd6b2413';
    const [news, setNews] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
       if (input) {
            setLoading(true);
            axios.get(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`)
                .then((res) => {
                    setNews(res.data.articles);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching news:', err);
                    setLoading(false);
                });
        }
    }, [input]);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleClick = () => {
        if (input.trim() !== "") {
            setInput("");
        }
    };

    return (
        <div className="container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for news..."
                    value={input}
                    onChange={handleChange}
                />
                <button onClick={handleClick}>Search</button>
            </div>
            <div className="news-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    news && news.length > 0 ? (
                        news.map(({ urlToImage, title, description, publishedAt }) => (
                            <div className="article" key={publishedAt}>
                                {urlToImage && <img src={urlToImage} alt="Article" className="article-image" />}
                                <div className="article-info">
                                    <h3 className="article-title">{title}</h3>
                                    <p className="article-description">{description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No articles found.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default News;

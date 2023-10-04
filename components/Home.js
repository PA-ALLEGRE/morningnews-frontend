import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Article from './Article';
import TopArticle from './TopArticle';
import styles from '../styles/Home.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
	const hiddenArticles = useSelector((state) => state.hiddenArticles.value)

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  useEffect(() => {
    fetch('https://morningnews-backend-three.vercel.app/articles')
      .then(response => response.json())
      .then(data => {
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

  const articles = articlesData.map((data, i) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
    // faire en sorte de ne pas créer le composant si l'article est dans le tab hiddenArticles
    if (hiddenArticles.some(isHidden => isHidden.title === data.title)) {
      return 
    } else {
      return <Article key={i} {...data} isBookmarked={isBookmarked} />
    }
  })





  let topArticles;
  if (bookmarks.some(bookmark => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </div>
  );
}

export default Home;
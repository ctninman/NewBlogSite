import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => {
	return (
		<>
		<h1>Articles</h1>
		{articles.map(article => (
				<Link key={article.name} to={`/articles/${article.name}`} >
					<div>
						<h3>{article.title}</h3>
						<p>{article.content[0].substring(0,25)}...</p>
					</div>
				</Link>
		))}
	</>
	);
}

export default ArticlesList;
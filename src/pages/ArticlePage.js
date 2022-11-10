import { useParams } from "react-router"
import articles from './article-content'

const ArticlePage = () => {

	const {articleId} = useParams()

	const article = articles.find(article => article.name === articleId)
	
	return (
		<>
			<h1>{article.title}</h1>
			{article.content.map ( line => (
				<p key={line} >{line}</p>
			))}
		</>
	)
}

export default ArticlePage
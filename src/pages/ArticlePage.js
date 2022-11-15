import { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from "axios"
import articles from './article-content'
import NotFoundPage from "./NotFoundPage"
import CommentsList from "../components/CommentsList"
import AddCommentForm from "../components/AddCommentForm"
import useUser from "../hooks/useUser"

const ArticlePage = () => {

	const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []})
	const { articleId } = useParams();

	const { user, isLoading } = useUser();

	useEffect(() => {
		const loadArticleInfo = async () => {
			console.log('artid', articleId)
			
			console.log('here?')
			const response = await axios.get(`/api/articles/${articleId}`)
			console.log('res', response)
			const newArticleInfo = response.data;
			setArticleInfo(newArticleInfo)
		}
		loadArticleInfo();
	}, [articleId] )


	const article = articles.find(article => article.name === articleId)

	const addUpvote = async () => {
		const response = await axios.put(`/api/articles/${articleId}/upvote`)
		const updatedArticle = response.data
		setArticleInfo(updatedArticle)
	}

	if (!article) {
		return <NotFoundPage />
	}
	
	return (
		<>
			<h1>{article.title}</h1>
			<div className='upvotes-section'>
				{user
					? <button onClick={addUpvote}>Upvote</button>
					: <button>Log in to upvote</button>
				}	
				<p>This article has {articleInfo.upvotes} upvotes</p>
				{article.content.map ( line => (
					<p key={line} >{line}</p>
				))}
			</div>
			{user
				? <AddCommentForm 
					articleName={articleId}
					onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}/>
				: <button>Log in to add comment</button>
			}
			<CommentsList comments={articleInfo.comments}/>
		</>
	)
}

export default ArticlePage
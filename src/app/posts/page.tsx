import Link from "next/link"
import CreatePost from "./CreatePost"
async function getPost(){
    const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records',
    {cache: 'no-store'})//{cache: 'no-store'} 옵션을 넣어줘야 새로고침 했을 때 DB에서 바뀐 데이터를 가져올수 있음, 아니명 케시된 내용만 보여주니 에러로 착각할수도 있음
    const data = await res.json()
    return data?.items as any[]
}
const PostsPage = async () =>{
    const posts = await getPost()
    return(
        <div>
            <h1>Posts</h1>
            {posts?.map((post)=>{
                return <PostItem key={post.id} post={post}/>
            })}
            <CreatePost />
        </div>
    )
}

export default PostsPage

const PostItem = ({post}:any) =>{
    const {id, title, created} = post || {}
    return (
        <Link href={`/posts/${id}`}>
            <div>
                <h3>{title}</h3>
            </div>
            <p>{created}</p>
        </Link>
    )
}
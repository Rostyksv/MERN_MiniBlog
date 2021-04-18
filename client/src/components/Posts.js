import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Modal from './Modal';

function Posts({setCurrentId}) {
    const [tag, setTag] = useState('');
    const [page, setPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);
    const [allPosts, setAllPosts] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState(null);

    const posts = useSelector((state) => state.posts);

    const handlePageClick = (e) => {
        const selectedPage = e.selected+1;
        setPage(selectedPage);
    }
    useEffect(() => {
        setFilteredPosts(posts.filter(post => post.tags.includes(tag)));
        setAllPosts(posts);
    }, [tag, posts])

    if(posts.length === 0 || allPosts === null) {
        return (
            <div>Loading...</div>
        )
    }
    if(tag) {
        return(
            <div className='app-posts-container'>
            <div className='app-posts'>
                {filteredPosts.map((post) => {
                    return (
                        <Post setTag={setTag} key={post._id} setCurrentId={setCurrentId} post={post}/>
                    )
                })}
            </div>
                    <ReactPaginate 
                        previousLabel="<"
                        nextLabel=">"
                        breakLabel='...'
                        breakLinkClassName='breakClass'
                        pageCount={Math.ceil(filteredPosts.length/8)}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={(e) => handlePageClick(e)}
                        containerClassName="posts-btns mt-3"
                        pageClassName="pageClassName"
                        pageLinkClassName="btn btn-light"
                        previousLinkClassName="btn btn-light"
                        nextLinkClassName="btn btn-light"
                    />
                    <Modal />
                    </div>
        )
    }
    return(
        <div className='app-posts-container'>
            <div className='app-posts'>
                {allPosts.slice((page-1)*postPerPage, page*postPerPage).map(post => {
                    return (
                        <Post setTag={setTag} key={post._id} setCurrentId={setCurrentId} post={post}/>
                    )
                })}
            </div>
            <ReactPaginate 
                previousLabel="<"
                nextLabel=">"
                breakLabel='...'
                breakLinkClassName='breakClass'
                pageCount={Math.ceil(posts.length/8)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(e) => handlePageClick(e)}
                containerClassName="posts-btns mt-3"
                pageClassName="pageClassName"
                pageLinkClassName="btn btn-light"
                previousLinkClassName="btn btn-light"
                nextLinkClassName="btn btn-light"
            />
            <Modal />
        </div>
    )
}

export default Posts;
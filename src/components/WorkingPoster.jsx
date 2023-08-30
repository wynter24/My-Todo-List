const WorkingPoster = ({
  workingPosts,
  setWorkingPost,
  item,
  donePosts,
  setDonePost,
}) => {
  // working 게시글 삭제
  const RemoveWorkingdButton = (id) => {
    const newPost = workingPosts.filter((post) => post.id !== id);
    setWorkingPost(newPost);
  };
  // working 완료 버튼: false->true => done zone을 이동
  const WorkingDone = (id, title, body, item) => {
    if (item.id === id) {
      item.isDone = true;
    }
    // 완료 버튼 누른 post를 done에 추가
    const donePost = {
      id: donePosts.length + 1,
      title,
      body,
      isDone: true,
    };
    setDonePost([...donePosts, donePost]);
    // working에서 없어짐
    const workingDonePost = workingPosts.filter(
      (post) => post.isDone === false
    );
    setWorkingPost(workingDonePost);
    // alert(id);
  };

  return (
    <div className="posted-box">
      <div className="constent">
        <p>{item.title}</p>
        <p>{item.body}</p>
      </div>
      <div key={item.id} className="btn">
        <button
          onClick={() => RemoveWorkingdButton(item.id)}
          className="delete-btn"
        >
          삭제하기
        </button>
        <button
          onClick={() => WorkingDone(item.id, item.title, item.body, item)}
          className="done-btn"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default WorkingPoster;
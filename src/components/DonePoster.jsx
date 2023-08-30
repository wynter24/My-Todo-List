const DonePoster = ({
  item,
  donePosts,
  setDonePost,
  workingPosts,
  setWorkingPost,
}) => {
  // done 게시글 삭제
  const RemoveDoneButton = (id) => {
    const newDonePost = donePosts.filter((post) => post.id !== id);
    setDonePost(newDonePost);
  };

  // (done zone) 취소 버튼 눌렀을 때 working 존으로 다시 back
  const NotYet = (id, title, body, item) => {
    if (item.id === id) {
      item.isDone = false;
    }
    // 취소 버튼 누른 post를 working에 추가
    const notDonePost = {
      id: workingPosts.length + 1,
      title,
      body,
      isDone: false,
    };
    setWorkingPost([...workingPosts, notDonePost]);
    // working에서 없어짐
    const notYetPost = donePosts.filter((post) => post.isDone === true);
    setDonePost(notYetPost);
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
          onClick={() => RemoveDoneButton(item.id)}
          className="delete-btn"
        >
          삭제하기
        </button>
        <button
          onClick={() => NotYet(item.id, item.title, item.body, item)}
          className="done-btn"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DonePoster;
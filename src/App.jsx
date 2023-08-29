import { useState } from "react";
import "./App.css";

function App() {
  // working에 저장되는 post 데이터
  const [workingPosts, setWorkingPost] = useState([
    {
      id: 1,
      title: "리액트 공부하기",
      body: "리액트 기초를 공부해봅시다.",
      isDone: false,
    },
  ]);

  // done에 저장되는 post 데이터
  const [donePosts, setDonePost] = useState([
    {
      id: 1,
      title: "리액트 공부하기",
      body: "리액트 기초를 공부해봅시다.",
      isDone: true,
    },
  ]);

  // 사용자가 입력한 정보
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // done용으로 true false하나 만들어야 할듯?

  // 제목 input에 정보 입력
  const onChangeTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  // 내용 input에 정보 입력
  const onChangeContentHandler = (event) => {
    setContent(event.target.value);
  };

  // 게시글 추가
  const onSubmitHandler = () => {
    const newPost = {
      id: workingPosts.length + 1,
      title,
      body: content,
      isDone: false,
    };
    setWorkingPost([...workingPosts, newPost]);
    setTitle("");
    setContent("");
  };

  // working 게시글 삭제
  const RemoveWorkingdButton = (id) => {
    const newPost = workingPosts.filter((post) => post.id !== id);
    setWorkingPost(newPost);
  };
  // done 게시글 삭제
  const RemoveDoneButton = (id) => {
    const newDonePost = donePosts.filter((post) => post.id !== id);
    setDonePost(newDonePost);
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
    <div className="App">
      {/* 제일 고정 상단 헤더 */}
      <header className="nav">
        <p>My ToDo List</p>
        <p>React</p>
      </header>

      {/*게시글 작성 */}
      <div className="post-box">
        <div className="input-box">
          제목 <input value={title} onChange={onChangeTitleHandler} />
          내용 <input value={content} onChange={onChangeContentHandler} />
        </div>
        <button onClick={onSubmitHandler}>추가하기</button>
      </div>

      <main>
        {/* post한 workign 게시물 */}
        <p className="how">Working..🔥</p>
        <div className="post-box-layout">
          {workingPosts.map(function (item) {
            return (
              <WorkingPoster
                key={item.id}
                item={item}
                RemoveWorkingdButton={RemoveWorkingdButton}
                WorkingDone={WorkingDone}
              />
            );
          })}
        </div>

        {/* post한 done 게시물 */}
        <p className="how">Done..!🎉</p>
        <div className="post-box-layout">
          {donePosts.map(function (item) {
            return (
              <DonePoster 
                key={item.id}
                item={item}
                RemoveDoneButton={RemoveDoneButton}
                NotYet={NotYet}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

const WorkingPoster = ({ item, RemoveWorkingdButton, WorkingDone }) => {
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

const DonePoster = ({item, RemoveDoneButton,NotYet}) => {
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

export default App;

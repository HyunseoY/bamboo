import React, { useState } from "react";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import "../../style/App.css";

const UpdateBamboo = ({ auth, db, bamboos, setBamboos, bamboo }) => {
  const user = auth.currentUser;

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const updateBamboo = async event => {
    if (user === null) {
      alert("로그인이 필요합니다.");
    } else if (user.uid !== bamboo.uid) {
      alert("게시물을 작성한 유저가 아닙니다.");
    } else {
      const bambooRef = doc(db, "bamboos", bamboo.id);
      await updateDoc(bambooRef, { ...bamboo, title, contents });

      setBamboos(prev => {
        return prev.map(element => {
          if (element.id === bamboo.id) {
            return { ...element, ...bamboo, title, contents };
          } else {
            return element;
          }
        });
      });
    }
  };

  const deleteBamboo = async event => {
    if (user === null) {
      alert("로그인이 필요합니다.");
    } else if (user.uid !== bamboo.uid) {
      alert("게시물을 작성한 유저가 아닙니다.");
    } else {
      const bambooRef = doc(db, "bamboos", bamboo.id);
      await deleteDoc(bambooRef);
      setBamboos(prev => {
        return prev.filter(element => element.id !== bamboo.id);
      });
    }
  };

  return (
    <>
      <p>제목</p>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
      <p>내용</p>
      <textarea type="text" value={contents} onChange={e => setContents(e.target.value)}></textarea>
      <button
        onClick={() => {
          updateBamboo();
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          deleteBamboo();
        }}
      >
        삭제
      </button>
    </>
  );
};

export default UpdateBamboo;
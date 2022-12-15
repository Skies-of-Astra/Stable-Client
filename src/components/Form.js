import { useState } from "react";
import axios from "axios";

const textInputs = {
  start: {
    a: "I was dreaming of ",
    b: "",
    c: "",
  },
  middle: {
    a: "All of a sudden there was ",
    b: "",
    c: "",
  },
  next: {
    a: "In the distance I could see a ",
    b: "",
    c: "",
  },
  last: {
    a: " and then I ",
    b: "",
    c: "",
  },
};

const AddPlayerForm = (props) => {
  const [text1, set_text1] = useState("");
  const [text2, set_text2] = useState("");
  const [text3, set_text3] = useState("");
  const [text4, set_text4] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [textOption, setTextOption] = useState("a");
  const [submitOn, setSubmitOn] = useState(false);

  const setPrompt = () => {
    const prompt =
      // textInputs.start[textOption] +
      text1 +
      " + " +
      text2 +
      " + " +
      // textInputs.next[textOption] +
      text3 +
      " in background, realistic style";
    // textInputs.last[textOption] +
    // text4;
    return prompt;
  };

  const sendImageRequest = async (text) => {
    let story1 = textInputs.start[textOption] + text1;
    let story2 = textInputs.middle[textOption] + text2;
    let story3 = textInputs.next[textOption] + text3;
    let story4 = textInputs.last[textOption] + text4;
    console.log(text);
    const res = await axios.get(
      // `https://skiesofastaapi.herokuapp.com/page/${text}/${story1}/${story2}/${story3}/${story4}`
      `http://localhost:8081/page/${text}/${story1}/${story2}/${story3}/${story4}`
    );
    setImageUrl(res.data);
    console.log(res);
  };

  const clearPlaceholder = (e) => {
    e.target.placeholder = "";
  };

  return (
    <div className="AddPlayerForm">
      <h1>Enter your story here: </h1>
      <p className="flex-row">
        {textInputs.start[textOption]}
        <input
          type="text"
          placeholder="ninjas"
          value={text1}
          onChange={(event) => {
            // console.log("new input .value:", event.target.value);
            set_text1(event.target.value);
          }}
        />
      </p>
      <p>
        {textInputs.middle[textOption]}
        <input
          type="text"
          placeholder="Ice hockey"
          value={text2}
          onChange={(event) => {
            // console.log("new input .value:", event.target.value);
            set_text2(event.target.value);
          }}
          // onFocus={clearPlaceholder}
          // onBlur={(e) => {
          //   e.target.placeholder = "Ice hockey";
          // }}
        />
      </p>
      <p>
        {textInputs.next[textOption]}
        <input
          type="text"
          placeholder="hurricane"
          value={text3}
          onChange={(event) => {
            // console.log("new input .value:", event.target.value);
            set_text3(event.target.value);
          }}
          // onFocus={clearPlaceholder}
          // onBlur={(e) => {
          //   e.target.placeholder = "plane crash";
          // }}
          // onBlur={setPlaceholder}
        />
      </p>
      <p>
        {textInputs.last[textOption]}
        <input
          type="text"
          placeholder="woke up"
          value={text4}
          onChange={(event) => {
            // console.log("new input .value:", event.target.value);
            set_text4(event.target.value);
          }}
          // onFocus={clearPlaceholder}
          // onBlur={(e) => {
          //   e.target.placeholder = "woke up";
          // }}
        />
      </p>
      <button
        onClick={() => {
          if (text1) {
            sendImageRequest(setPrompt());
            console.log(setPrompt());
            setSubmitOn(true);
            // set_text1("");
            setImageUrl("");
          } else {
            alert("Please enter some words to coninue.");
          }
        }}
      >
        Submit
      </button>
      {imageUrl ? (
        <div className="comic-container">
          <div className="bubble">{textInputs.start[textOption] + text1}</div>
          <div className="bubble bubble2">
            {textInputs.middle[textOption] + text2}
          </div>
          <div className="bubble bubble3">
            {textInputs.next[textOption] +
              text3 +
              textInputs.last[textOption] +
              text4}
          </div>
          <div className="img-wrapper">
            <img src={imageUrl} alt="background" />
          </div>
          <div className="line-divider"></div>
          <div className="line-divider line-divider2"></div>
        </div>
      ) : submitOn ? (
        <div className="loading-animation">Please wait...</div>
      ) : null}
    </div>
  );
};

export default AddPlayerForm;

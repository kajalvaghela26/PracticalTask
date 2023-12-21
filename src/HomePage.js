import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionAns from "./questionAns";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [question, setQuestion] = useState([]);
  const [count, setCount] = useState(1);
  const [ansValue, setAnsValue] = useState({});
  const [realAns, setRalAns] = useState({});
  const [correctAns, setCorrectAns] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [inCorrectAns, setInCorrectAns] = useState([]);
  const [response, setResponse] = useState("");
  const history = useNavigate();
  const callApi = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=10");
      setQuestion(response && response.data && response.data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    callApi();
  }, []);
  useEffect(() => {
    if (
      (inCorrectAns && inCorrectAns.length > 0) ||
      (correctAns && correctAns.length > 0)
    ) {
      const flatdata = inCorrectAns.concat(correctAns);
      console.log("flatdata", flatdata);
      if (flatdata && flatdata.length === 10) {
        history("/total");
        sessionStorage.setItem(
          "TotalQues",
          JSON.stringify(question && question.length)
        );
        sessionStorage.setItem("Incorrect", JSON.stringify(inCorrectAns));
        sessionStorage.setItem("Correct", JSON.stringify(correctAns));
      }
    }
  }, [correctAns, inCorrectAns]);
  const handleAns = (e, data) => {
    setDisableBtn(true);
    setRalAns(data);
    const update = { ...ansValue, [`ans${count}`]: e.target.value };
    setAnsValue(update);
    if (e.target.value === data.correct_answer) {
      setResponse("Correct");
    } else {
      setResponse(
        `Your Answer is Wrong Right Answer is:${data.correct_answer}`
      );
    }
  };
  const handleSubmit = () => {
    let lastValue;
    setTimeout(() => {
      setCount(count + 1);
      setResponse("");
    }, 3000);
    const Value = Object.keys(ansValue);
    setDisableBtn(false);
    if (Value && Value.length > 0) {
      const key = Value[Value.length - 1];
      lastValue = ansValue[key];
    }
    if (lastValue === realAns.correct_answer) {
      setCorrectAns([...correctAns, realAns]);
    } else {
      setInCorrectAns([...inCorrectAns, realAns]);
    }
  };

  return (
    <div className="App">
      {question &&
        question.map((el, index) => {
          const cunt = index + 1;
          if (cunt === count) {
            return (
              <div key={index}>
                <QuestionAns
                  data={el}
                  setCount={setCount}
                  count={count}
                  handleAns={handleAns}
                />
              </div>
            );
          }
        })}
      <div>
        <span>{response}</span>
      </div>
      <div className="btn-prent">
        <div className="btn-child-l"></div>
        <div className="btn-child-r">
          <Button
            variant="dark"
            className="btn-chld"
            onClick={handleSubmit}
            disabled={!disableBtn}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

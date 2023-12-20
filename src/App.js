import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import QuestionAns from "./questionAns";
import { Button } from "react-bootstrap";

const App = () => {
  const [question, setQuestion] = useState([]);
  const [count, setCount] = useState(1);
  const [ansValue, setAnsValue] = useState({});
  const [realAns, setRalAns] = useState({});
  const [correctAns, setCorrectAns] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [inCorrectAns, setInCorrectAns] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://
opentdb.com/api.php?amount=1`
      )
      .then((response) => {
        setQuestion(response && response.data && response.data.results);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  const handleAns = (e, data) => {
    setDisableBtn(true);
    setRalAns(data);
    const update = { ...ansValue, [`ans${count}`]: e.target.value };
    setAnsValue(update);
  };
  const handleSubmit = () => {
    let lastValue;
    setCount(count + 1);
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
              <QuestionAns
                data={el}
                setCount={setCount}
                count={count}
                handleAns={handleAns}
              />
            );
          }
        })}
      <div className="btn-prent">
        <div className="btn-child-l">
          {count !== 1 && (
            <>
              <Button
                variant="dark"
                className="btn-chld"
                onClick={() => setCount(count - 1)}
              >
                Back
              </Button>
            </>
          )}
        </div>
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

export default App;

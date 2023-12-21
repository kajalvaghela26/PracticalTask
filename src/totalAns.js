import React, { useState } from "react";
import { Button } from "react-bootstrap";
const TotalAns = () => {
  const [showInccorect, setShowIncorrect] = useState(false);
  const getToatalAns = JSON.parse(sessionStorage.getItem("TotalQues"));
  const getIncorrect = JSON.parse(sessionStorage.getItem("Incorrect"));
  const getCorrect = JSON.parse(sessionStorage.getItem("Correct"));
  return (
    <>
      <div>
        <div>Total Question:{getToatalAns}</div>
        <div>Correct Answer:{getCorrect && getCorrect.length}</div>
        <div>Wrong Answer:{getIncorrect && getIncorrect.length}</div>
        <div className="btn-prent">
          <div className="btn-child-r">
            <Button
              variant="dark"
              className="btn-chld"
              onClick={() => setShowIncorrect(true)}
            >
              Submit
            </Button>
          </div>
        </div>
        {showInccorect && (
          <div>
            {getIncorrect &&
              getIncorrect.map((el) => (
                <>
                  <span>
                    {el.question}
                    <p>Correct Ans:{el.correct_answer}</p>
                  </span>
                </>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
export default TotalAns;

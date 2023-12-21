import React from "react";
const TotalAns = () => {
  const getToatalAns = JSON.parse(sessionStorage.getItem("TotalQues"));
  const getIncorrect = JSON.parse(sessionStorage.getItem("Incorrect"));
  const getCorrect = JSON.parse(sessionStorage.getItem("Correct"));
  return (
    <>
      <div>
        <div>Total Question:{getToatalAns}</div>
        <div>Correct Answer:{getCorrect && getCorrect.length}</div>
        <div>Wrong Answer:{getIncorrect && getIncorrect.length}</div>
      </div>
    </>
  );
};
export default TotalAns;

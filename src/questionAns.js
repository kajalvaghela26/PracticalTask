import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
const QuestionAns = ({ data, handleAns }) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (data && data) {
      const optn = [];
      optn.push(data.correct_answer, data.incorrect_answers);
      const flatData = optn.flat();
      setOptions(flatData);
    }
  }, [data]);
  const ansType = () => {
    switch (data.type) {
      case "multiple":
        return (
          <Form.Group
            controlId="exampleForm.SelectCustom"
            className="option-ui"
          >
            <Form.Label>Select an option:</Form.Label>
            <Form.Select onChange={(e) => handleAns(e, data)}>
              <option value="">Select an option</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        );

      case "boolean":
        return (
          <>
            <Form.Check
              inline
              label="True"
              value="True"
              name="group1"
              type="radio"
              onChange={(e) => handleAns(e, data)}
            />
            <Form.Check
              inline
              label="False"
              value="False"
              name="group1"
              type="radio"
              onChange={(e) => handleAns(e, data)}
            />
          </>
        );
      default:
        return false;
    }
  };
  return (
    <>
      <div>
        <div className="catgry">{data.category}</div>
        <div className="qtn">
          <Form>
            <Form.Label>Question:</Form.Label>
            {data.question}
            {ansType()}
          </Form>
        </div>
      </div>
    </>
  );
};
export default QuestionAns;

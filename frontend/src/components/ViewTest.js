import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { setTokenHeader } from "../redux/actions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
export function ViewTest() {
  const [valid, setValid] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  if (localStorage.getItem("jwt")) {
    setTokenHeader(localStorage.getItem("jwt"));
  }
  const [testData, setTestdata] = useState({
    test_name: "demo test",
    test_start: "12/2/2021",
    test_end: "21/2/2021",
    test_type: "Open",
    list: [
      {
        key: 1,
        no: 1,
        question: "aaalla l l m m m <br/>",
        mcq: ["option", "aqa", "asasas", "asass"],
        marks: 12,
        answer: 2,
      },
    ],
    allowed_users: ["a"],
  });
  const testName = useParams();
  useEffect(() => {
    const fetchTestData = async () => {
      const { data } = await axios.post("/test/view", {
        test_name: testName.id,
      });
      if (data.invalid != null) {
        setValid(false);
      } else {
        setTestdata(data);
      }
    };
    fetchTestData();
  }, []);
  return (
    <div className="container-fluid">
      <div
        className="card  shadow mt-5 mx-5 mb-5"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="card-body">
          {valid ? (
            <div className="py-3 px-3">
              <Typography
                variant="h4"
                style={{ color: "white" }}
                className="text-center"
              >
                Welcome
              </Typography>
              <Typography
                variant="h5"
                style={{ backgroundColor: "#eee" }}
                className="mt-3 text-center rounded card-body shadow-sm"
              >
                TEST-NAME:- <strong>{testData.test_name}</strong>{" "}
              </Typography>
              <div className="d-flex mt-3">
                <Typography
                  variant="h5"
                  style={{ backgroundColor: "#eee" }}
                  className="card-body rounded shadow-sm mr-3 text-center"
                >
                  START-TIME:- <strong>{testData.test_start}</strong>
                </Typography>
                <Typography
                  variant="h5"
                  style={{ backgroundColor: "#eee" }}
                  className="card-body rounded shadow-sm ml-2 text-center"
                >
                  END-TIME:- <strong>{testData.test_end}</strong>
                </Typography>
              </div>
              <Typography
                variant="h5"
                style={{ backgroundColor: "#eee" }}
                className="mt-3 text-center rounded card-body shadow-sm"
              >
                TEST-TYPE:- <strong>{testData.test_type}</strong>{" "}
              </Typography>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                style={{ backgroundColor: "#eee" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <div style={{ fontSize: "1.5vw" }}>Allowed Users</div>
                </AccordionSummary>
                <AccordionDetails>
                  {testData.test_type == "Closed" ? (
                    <div
                      style={{ backgroundColor: "#eee" }}
                      className="card-body rounded-"
                    >
                      {testData.allowed_users.map((user) => {
                        return (
                          <div
                            key={user}
                            style={{
                              borderLeft: "3px solid blue",
                              backgroundColor: "#ccc",
                            }}
                            className="pl-3 py-3 m-2 "
                          >
                            {user}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </AccordionDetails>
              </Accordion>
              <Accordion
                style={{ backgroundColor: "#eee" }}
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  {" "}
                  <div style={{ fontSize: "1.5vw" }}>Questions</div>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ width: "100%" }}>
                    {testData.list.map((question) => {
                      return (
                        <div style={{ display: "flex" }} key={question.key}>
                          <div
                            className="card-body rounded-lg shadow-sm mt-4"
                            style={{
                              backgroundColor: "#eeeefe",
                              border: "1px solid #ccc",
                            }}
                          >
                            <div className="d-flex justify-content-between">
                              <div>question no.{question.no}</div>
                              <div>answer {question.answer}</div>
                              <div>score: {question.marks}</div>
                            </div>
                            <div
                              className="rounded-sm p-3 mt-3"
                              style={{ backgroundColor: "lightgray" }}
                            >
                              {question.question}
                            </div>
                            <div
                              className="rounded p-3 mt-3"
                              style={{ backgroundColor: "lightskyblue" }}
                            >
                              1. {question.mcq[0]}
                            </div>
                            <div
                              className="rounded p-3 mt-2"
                              style={{ backgroundColor: "lightskyblue" }}
                            >
                              2. {question.mcq[1]}
                            </div>
                            <div
                              className="rounded p-3 mt-2"
                              style={{ backgroundColor: "lightskyblue" }}
                            >
                              3. {question.mcq[2]}
                            </div>
                            <div
                              className="rounded p-3 mt-2"
                              style={{ backgroundColor: "lightskyblue" }}
                            >
                              4. {question.mcq[3]}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              backgroundColor: "#ddd",
                              marginTop: "1.5vw",
                              marginLeft: "1vw",
                              padding: "1vw",
                            }}
                          >
                            <button className="btn btn-secondary mb-2">
                              Edit
                            </button>
                            <button
                              disabled={true}
                              className="btn btn-success mb-2"
                            >
                              Save
                            </button>
                            <button className="btn btn-danger ">Delete</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : (
            <div>Illegal access</div>
          )}
        </div>
      </div>
    </div>
  );
}

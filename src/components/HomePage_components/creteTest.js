import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Header1 } from "../mainPage";
import { TextField } from "@material-ui/core";
export function CreateTest() {
  const [allowedUsersFile, setallowedUsersFile] = useState(null);
  const [uploadIndicator1, setuploadIndicator1] = useState(0);
  const [uploadIndicator2, setuploadIndicator2] = useState(0);
  const [questionsFile, setquestionsFile] = useState(null);
  const [testName, setTestname] = useState("");
  const [testdh, setTestdh] = useState(0);
  const [testdm, setTestdm] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");
  var ev = "Open";
  const SetError = (error) => {
    seterrorMessage(error);
    var errorElement = document.getElementById("error");
    errorElement.style.display = "block";
  };
  const clearError = () => {
    var errorElement = document.getElementById("error");
    errorElement.style.display = "none";
  };
  const check = () => {
    const ler = document.getElementById("sel");
    const v2 = document.getElementById("close");
    ev = ler.value;
    ev == "Open" ? (v2.style.display = "none") : (v2.style.display = "block");
  };
  const handle = (e) => {
    setuploadIndicator1(0);
    console.log(e.target.files[0]);
    setallowedUsersFile(e.target.files[0]);
  };
  const handle1 = (e) => {
    setuploadIndicator2(0);
    console.log(e.target.files[0]);
    setquestionsFile(e.target.files[0]);
  };
  const upfile1 = async (e) => {
    e.preventDefault();
    if (allowedUsersFile != null) {
      const data1 = new FormData();
      data1.append("file", allowedUsersFile);
      await axios.post("/test/allowuser", data1, {
        onUploadProgress: (ProgressEvent) => {
          setuploadIndicator1(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
        },
      });
    } else {
      SetError("Select the file first");
    }
  };
  const upfile = async (e) => {
    e.preventDefault();
    if (questionsFile != null) {
      const data1 = new FormData();
      data1.append("file", questionsFile);
      await axios.post("/test/testlist", data1, {
        onUploadProgress: (ProgressEvent) => {
          setuploadIndicator2(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
        },
      });
    } else {
      SetError("Select the file first");
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    //console.log(e.target.test_start_date.value);
    var body = {
      test_name: e.target.test_name.value,
      test_d_h: testdh,
      test_d_m: testdm,
      test_start_from_date: e.target.test_start_date.value,
      test_start_from_time: e.target.test_start_time.value,
      test_end_at_date: e.target.test_end_date.value,
      test_end_at_time: e.target.test_end_time.value,
      test_type: e.target.types.value,
    };
    const { data } = await axios.post("/test/testdata", body);
    //console.log(typeof(data.error));
    if (data.error != undefined && typeof data.error == "string") {
      SetError(data.error);
      //console.log(data.error);
    }
    if (data.success != null) {
      window.confirm("data uploaded succesfully");
      window.location.reload();
    }
  };
  return (
    <React.Fragment>
      <Header1 />
      <div className="container">
        <div className="card my-5 shadow">
          <div className="card-body">
            <div className="text-center">
              <div className="h4 mb-4"> Create Test</div>
            </div>
            <div
              id="error"
              style={{ display: "none" }}
              className="alert alert-danger alert-dismissible"
            >
              {" "}
              <button
                onClick={() => clearError()}
                className="close"
                datadismiss="alert"
                aria-label="close"
              >
                &times;
              </button>
              <strong>{errorMessage}</strong>
            </div>
            <form className="user" onSubmit={(e) => submit(e)}>
              <div className="form-group ">
                <TextField
                  variant="outlined"
                  required={true}
                  className="form-control form-control-user w-25"
                  onChange={(e) => setTestname(e.target.value)}
                  value={testName}
                  name="test_name"
                  label="Test-Name"
                ></TextField>
              </div>
              <div className="form-group ">
                <label>Test_Duration:</label>
                <div className="form-group row">
                  <div className="col-lg-5">
                    <label className="">Hour:</label>
                    <input
                      required={true}
                      value={testdh}
                      onChange={(e) => setTestdh(e.target.value)}
                      type="Number"
                      className="form-control form-control-user w-50"
                      name="hour"
                    ></input>
                  </div>
                  <div className="col-lg-5">
                    <label className="">Minutes:</label>
                    <input
                      required={true}
                      value={testdm}
                      onChange={(e) => setTestdm(e.target.value)}
                      type="Number"
                      className="form-control form-control-user w-50"
                      name="min "
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row form-group">
                <div className="form-group col-lg-5">
                  <label>test_start_from_date</label>
                  <input
                    required={true}
                    type="date"
                    className="form-control form-control-user w-50"
                    name="test_start_date"
                    placeholder="Enter Test-name"
                  ></input>
                </div>
                <div className="form-group col-lg-5">
                  <label>test_start_from_time</label>
                  <input
                    required={true}
                    type="time"
                    className="form-control form-control-user w-50"
                    name="test_start_time"
                    placeholder="Enter Test-name"
                  ></input>
                </div>
              </div>
              <div className="row form-group">
                <div className="form-group col-lg-5">
                  <label>test_end_at_date</label>
                  <input
                    required={true}
                    type="date"
                    className="form-control form-control-user w-50"
                    name="test_end_date"
                    placeholder="Enter Test-name"
                  ></input>
                </div>
                <div className="form-group col-lg-5">
                  <label>test_end_at_time</label>
                  <input
                    required={true}
                    type="time"
                    className="form-control form-control-user w-50"
                    name="test_end_time"
                    placeholder="Enter Test-name"
                  ></input>
                </div>
              </div>
              <div className="form-group ">
                <label>Test_Type</label>
                <select
                  id="sel"
                  name="types"
                  onChange={() => check()}
                  className=" form-control form-control-user w-25"
                >
                  <option value="Open">open</option>
                  <option value="Closed">closed</option>
                </select>
              </div>
              <div id="close" style={{ display: "none" }} className="">
                <div className="form-group ">
                  <label>Allowed Users:</label>
                  <input
                    accept=".xlsx"
                    type="file"
                    onChange={(e) => handle(e)}
                    className="form-control form-control-user w-25"
                    name="file"
                  ></input>
                  <button
                    onClick={(e) => upfile1(e)}
                    className="btn btn-info mt-3"
                  >
                    Upload
                  </button>
                  <div className="progress w-25 mt-2 mb-2">
                    <div
                      className="progress-bar  progress-bar-striped  progress-bar-animated"
                      role="progressbar"
                      style={{ width: `${uploadIndicator1}%` }}
                      aria-valuenow="55"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {uploadIndicator1}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group ">
                <label>Questions_List:</label>
                <input
                  required={true}
                  type="file"
                  accept=".xlsx"
                  onChange={(e) => handle1(e)}
                  className="form-control form-control-user w-25"
                  name="file1"
                ></input>
              </div>
              <div className="progress w-25 mt-2 mb-2">
                <div
                  className="progress-bar  progress-bar-striped  progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${uploadIndicator2}%` }}
                  aria-valuenow="55"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {uploadIndicator2}%
                </div>
              </div>
              <button onClick={(e) => upfile(e)} className="btn btn-info mt-3">
                Upload_List
              </button>
              <hr></hr>
              <input
                className="btn  btn-outline-success"
                type="submit"
                name="submit"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

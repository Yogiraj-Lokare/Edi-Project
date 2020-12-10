import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header1 } from "../mainPage";
import axios from "axios";
import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

export function GivenTest() {
  var dd = [
    {
      key: 1,
      no: 1,
      test_name: "oneeee",
      test_start: 12,
      test_end: 3,
      score: 56,
    },
  ];
  const temp_data = [
    {
      key: 1,
      test_name: "test1",
      start_time: "11",
      end_time: "112",
      status: true,
    },
  ];
  const history = useHistory();
  const start = (par) => {
    history.push(`/middle/${par.test_name}`);
  };
  const [data1, setdata] = useState(dd);
  const [currntTestData, setCurrentTestData] = useState(temp_data);
  useEffect(() => {
    const load1 = async () => {
      const { data } = await axios.get("/test/given");
      setdata(data);
    };
    const load2 = async () => {
      const { data } = await axios.get("test/future");
      setCurrentTestData(data);
    };
    load1();
    load2();
  }, []);
  return (
    <React.Fragment>
      <Header1 />
      <div className="container">
        <div className="card my-5 shadow">
          <div className="card-body">
            <Container>
              <Typography
                variant="h5"
                color="primary"
                style={{ textAlign: "center", marginBottom: "1vw" }}
              >
                Your Upcoming Tests
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: "lightgray" }}>
                        <Typography variant="h6">Test-name</Typography>
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "lightgrey" }}
                        align="right"
                      >
                        <Typography variant="h6">start-time</Typography>
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "lightgrey" }}
                        align="right"
                      >
                        <Typography variant="h6">end-time</Typography>
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "lightgrey" }}
                        align="right"
                      >
                        <Typography variant="h6">status</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currntTestData.map((row) => (
                      <TableRow key={row.key}>
                        <TableCell component="th" scope="row">
                          <Typography>{row.test_name}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>{row.start_time}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>{row.end_time}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => start(row)}
                            style={{ outline: "none" }}
                            variant="contained"
                            color="primary"
                            disabled={row.status}
                          >
                            Start
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
            <hr />
            <div style={{ marginTop: "1vw" }}>
              <Typography
                variant="h5"
                color="primary"
                style={{ textAlign: "center", marginBottom: "1vw" }}
              >
                Your past Tests
              </Typography>
            </div>
            <Container>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: "lightgray" }}>
                        <Typography variant="h6">Test-name</Typography>
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "lightgrey" }}
                        align="right"
                      >
                        <Typography variant="h6">start-time</Typography>
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "lightgrey" }}
                        align="right"
                      >
                        <Typography variant="h6">end-time</Typography>
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "lightgrey" }}
                        align="right"
                      >
                        <Typography variant="h6">Score</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data1.map((row) => (
                      <TableRow key={row.key}>
                        <TableCell component="th" scope="row">
                          <Typography>{row.test_name}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>{row.test_start}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>{row.test_end}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>{row.score}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

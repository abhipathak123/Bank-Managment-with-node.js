const express = require("express");
const app = express();
app.set("view engine", "ejs");
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bankdb",
});
app.use(express.static("public"));
con.connect();
app.get("/", function (req, res) {
  res.render("Home");
});
app.get("/about", function (req, res) {
  res.render("About");
});
app.get("/contact", function (req, res) {
  res.render("Contact");
});
app.get("/acsum", function (req, res) {
  res.render("Summary");
});
app.get("/with", function (req, res) {
  if (req.query.submit) {
    var acn = req.query.ac;
    var pin = req.query.pn;
    var amo = req.query.am;

    con.query(
      `SELECT * FROM account WHERE acno='${acn}' AND pin='${pin}'`,
      function (error, results) {
        if (!error) {
          if (results.length > 0) {
            var currentBalance = results[0].amount;
            if (currentBalance >= amo) {
              var updatedBalance = currentBalance - amo;
              var currentDate = new Date().toISOString().slice(0, 10);
              var currentTime = new Date().toISOString().slice(11, 19);

              con.query(
                `UPDATE account SET amount='${updatedBalance}' WHERE acno='${acn}'`,
                function (error) {
                  if (!error) {
                    con.query(
                      `INSERT INTO transaction (description,acno, amount, date, time) VALUES ("Withdrawl",'${acn}', '${amo}', '${currentDate}', '${currentTime}')`,
                      function (error) {
                        if (!error) {
                          res.render("Withdrawl", {
                            msg:
                              "Withdrawal successful! Your current balance is " +
                              updatedBalance,
                          });
                        } else {
                          res.render("Withdrawl", {
                            msg: "Error updating balance",
                          });
                        }
                      }
                    );
                  } else {
                    res.render("Withdrawl", {
                      msg: "Error updating balance",
                    });
                  }
                }
              );
            } else {
              res.render("Withdrawl", { msg: "Insufficient balance" });
            }
          } else {
            res.render("Withdrawl", { msg: "Invalid account number or PIN" });
          }
        } else {
          res.render("Withdrawl", { msg: "Error: " + error });
        }
      }
    );
  } else {
    res.render("Withdrawl", { msg: "" });
  }
});

app.get("/deposit", function (req, res) {
  if (req.query.submit) {
    var acn = req.query.ac;
    var pin = req.query.pn;
    var amo = parseInt(req.query.am);

    con.query(
      `SELECT * FROM account WHERE acno='${acn}' AND pin='${pin}'`,
      function (error, results) {
        if (!error) {
          if (results.length > 0) {
            var currentBalance = results[0].amount;

            var updatedBalance = currentBalance + amo;

            con.query(
              `UPDATE account SET amount='${updatedBalance}' WHERE acno='${acn}'`,
              function (error) {
                if (!error) {
                  con.query(
                    `INSERT INTO transaction (description,acno, amount, date, time) VALUES ("Deposit",'${acn}', '${amo}', CURDATE(), CURTIME())`,
                    function (error) {
                      if (!error) {
                        res.render("Deposit", {
                          msg:
                            "Deposit successful! Your current balance is " +
                            updatedBalance,
                        });
                      } else {
                        res.render("Deposit", {
                          msg: "Error updating balance",
                        });
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.render("Deposit", { msg: "Invalid account number or PIN" });
          }
        } else res.render("Deposit", { msg: "error " + error });
      }
    );
  } else {
    res.render("Deposit", { msg: "" });
  }
});

app.get("/fundtra", function (req, res) {
  if (req.query.submit) {
    var san = req.query.sac;
    var spin = req.query.spn;
    var amm = parseInt(req.query.am);
    var ran = req.query.rac;

    con.query(
      `SELECT * FROM account WHERE acno='${san}' AND pin='${spin}'`,
      function (err, sResult) {
        if (!err) {
          if (sResult.length > 0) {
            var sBalance = sResult[0].amount;

            if (sBalance >= amm) {
              con.query(
                `SELECT * FROM account WHERE acno='${ran}'`,
                function (err, rResult) {
                  if (!err) {
                    if (rResult.length > 0) {
                      var rBalance = rResult[0].amount;

                      var updatedsBalance = sBalance - amm;
                      var updatedrBalance = rBalance + amm;

                      con.query(
                        `UPDATE account SET amount=${updatedsBalance} WHERE acno='${san}'`,
                        function (err) {
                          if (!err) {
                            con.query(
                              `UPDATE account SET amount=${updatedrBalance} WHERE acno='${ran}'`,
                              function (err) {
                                if (!err) {
                                  con.query(
                                    `INSERT INTO transaction (acno, amount, date, time, description) VALUES ('${san}', '${amm}', CURDATE(), CURTIME(), "Transfered")`,
                                    function (err) {
                                      if (!err) {
                                        con.query(
                                          `INSERT INTO transaction (acno, amount, date, time, description) VALUES ('${ran}', '${amm}', CURDATE(), CURTIME(), "Recieved")`,
                                          function (err) {
                                            if (!err) {
                                              res.render("FundTransfer", {
                                                msg:
                                                  "Fund transfer successful! Your Current Balance is " +
                                                  updatedsBalance,
                                              });
                                            } else {
                                              res.render("FundTransfer", {
                                                msg: "Error: " + err,
                                              });
                                            }
                                          }
                                        );
                                      } else {
                                        res.render("FundTransfer", {
                                          msg: "Error: " + err,
                                        });
                                      }
                                    }
                                  );
                                } else {
                                  res.render("FundTransfer", {
                                    msg: "Error: " + err,
                                  });
                                }
                              }
                            );
                          } else {
                            res.render("FundTransfer", {
                              msg: "Error: " + err,
                            });
                          }
                        }
                      );
                    } else {
                      res.render("FundTransfer", {
                        msg: "Invalid receiver account number",
                      });
                    }
                  } else {
                    res.render("FundTransfer", { msg: "Error: " + err });
                  }
                }
              );
            } else {
              res.render("FundTransfer", {
                msg: "Insufficient balance in sender account",
              });
            }
          } else {
            res.render("FundTransfer", {
              msg: "Invalid account number or PIN",
            });
          }
        } else {
          res.render("FundTransfer", { msg: "Error: " + err });
        }
      }
    );
  } else {
    res.render("FundTransfer", { msg: "" });
  }
});

app.get("/accsum", function (req, res) {
  if (req.query.submit) {
    var ac = req.query.ac;
    var pin = req.query.pn;
    con.query(
      `select * from account where acno='${ac}' and pin='${pin}'`,
      function (err, result) {
        if (!err) {
          if (result.length > 0) {
            con.query(
              `select * from transaction where acno='${ac}' `,
              function (err, results) {
                if (!err) {
                  res.render("Summary", { data: results, detail: result });
                } else {
                  res.render("AccountSummary", { msg: "err" + err });
                }
              }
            );
          } else {
            res.render("AccountSummary", {
              msg: "Invalid account number or PIN",
            });
          }
        } else {
          res.render("AccountSummary", { msg: "error " + error });
        }
      }
    );
  } else {
    res.render("AccountSummary", { msg: "" });
  }
});
app.get("/balinq", function (req, res) {
  if (req.query.submit) {
    var acn = req.query.ac;
    var pin = req.query.pn;

    con.query(
      `SELECT * FROM account WHERE acno='${acn}' AND pin='${pin}'`,
      function (error, results) {
        if (!error) {
          if (results.length > 0) {
            var currentBalance = results[0].amount;
            res.render("BalanceInquiry", {
              msg: "Your Current Balance is: " + currentBalance,
            });
          } else {
            res.render("BalanceInquiry", {
              msg: "Invalid account number or PIN",
            });
          }
        } else {
          console.log("Error: " + error);
          res.render("BalanceInquiry", {
            msg: "Error: " + error,
          });
        }
      }
    );
  } else {
    res.render("BalanceInquiry", { msg: "" });
  }
});

app.get("/pinchange", function (req, res) {
  if (req.query.submit) {
    var acn = req.query.ac;
    var pin = req.query.opn;
    var npin = req.query.npn;
    var cpin = req.query.cpn;
    con.query(
      `SELECT * FROM account WHERE acno='${acn}' AND pin='${pin}'`,
      function (err, result) {
        if (!err) {
          if (result.length > 0) {
            if (pin != cpin) {
              if (cpin === npin) {
                con.query(
                  `UPDATE account SET pin='${cpin}' WHERE acno='${acn}'`,
                  function (err, resu) {
                    if (!err) {
                      res.render("PinChange", {
                        msg: "PinChange",
                      });
                    } else {
                      res.render("PinChange", {
                        msg: "err" + err,
                      });
                    }
                  }
                );
              } else {
                res.render("PinChange", {
                  msg: "New pins are not same",
                });
              }
            } else {
              res.render("PinChange", {
                msg: "New Pin can't be same as old pin",
              });
            }
          } else {
            res.render("PinChange", {
              msg: "Invalid account number or PIN",
            });
          }
        } else {
          res.render("PinChange", {
            msg: "err" + err,
          });
        }
      }
    );
  } else {
    res.render("PinChange", { msg: "" });
  }
});

app
  .get("/acc", function (req, res) {
    if (req.query.submit) {
      var pi = req.query.pn;
      var nam = req.query.n;
      var fnam = req.query.fn;
      var em = req.query.e;
      var ph = parseInt(req.query.p);
      var ge = req.query.g;
      var cou = req.query.c;
      var st = req.query.s;
      var cit = req.query.ci;
      var amo = req.query.am;

      con.query(
        "SELECT COUNT(*) AS count FROM account",
        function (error, results) {
          if (!error) {
            var count = results[0].count;
            var acn = "SBI" + (count + 101);

            con.query(
              `INSERT INTO account (acno, name, fname, email, phone, gender, country, state, city, amount, pin) VALUES ('${acn}', '${nam}', '${fnam}', '${em}', '${ph}', '${ge}', '${cou}', '${st}', '${cit}', '${amo}', '${pi}')`,
              function (error, result) {
                if (!error) {
                  res.render("CreateAccount", {
                    msg: "Account Open Succesfully with account number " + acn,
                  });
                } else {
                  res.render("CreateAccount", {
                    msg: "Error creating account",
                  });
                }
              }
            );
          } else
            res.render("CreateAccount", {
              msg: "Error" + error,
            });
        }
      );
    } else {
      res.render("CreateAccount", { msg: "" });
    }
  })

  .listen(5000);

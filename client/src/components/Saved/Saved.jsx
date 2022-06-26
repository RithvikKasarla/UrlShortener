import React, { useState, useEffect } from "react";
import axios from "axios";

function Saved() {
  var [data, setData] = useState({ url: "", code: "" });

  useEffect((data) => {
    var url = `http://localhost:3001/getAll`;
    console.log(data);

    axios
      .get(url)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <h3>Saved</h3>
      <div>
      <table>
          {
            data.map((name) => (
              <span>{name.url}</span>
          ))}
        </table>
      </div>
    </>
  );
}

export default Saved;

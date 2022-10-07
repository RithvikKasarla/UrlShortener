import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Saved.css";
function Saved(props) {
  var [data, setData] = useState([{ url: "", code: "" }]);
  var FilterQuery = "";
  useEffect((data) => {
    var url = `./getAll`;

    axios
      .get(url)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  if (props.query) {
    FilterQuery = props.query;
  }

  return (
    <>
      <h3>Saved</h3>
      <table>
        <tbody>
          <tr>
            <th>Code</th>
            <th>Full Url</th>
          </tr>
          {data
            .filter((n) => {
              return n.code.includes(FilterQuery);
            })
            .map((name) => (
              <tr key={name.url}>
                <th>{name.code}</th>
                <th>{name.url}</th>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Saved;

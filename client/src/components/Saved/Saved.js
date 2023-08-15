import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Saved.css";

function Saved(props) {
  const [data, setData] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    const url = "./getAll";

    axios
      .get(url)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (props.query) {
      setFilterQuery(props.query);
    }
  }, [props.query]);

  const filteredData = data.filter((item) => item.code.includes(filterQuery));

  return (
    <div className="saved-container">
      <h3>Saved</h3>
      <table className="saved-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Full Url</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.url}>
              <td className="table-cell">{item.code}</td>
              <td className="table-cell">{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Saved;

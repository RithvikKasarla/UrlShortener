import React from "react";
import "./Inputs.css";
class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      code: "",
      LinkErrorMessage: "",
      CodeErrorMessage: "",
    };
  }

  saveBack(link, code) {
    fetch(`/auth/${code}/${link}`)
      .then((data) => {
        return data.json();
      })
      .then((results) => { });
  }

  save(link, code) {
    var splits;
    var starts;

    ({ splits, starts, link } = this.normalize(link));

    var validURL, uniqueCode, uniqueLink;

    validURL = this.validateformat(splits, starts, true);
    if (!validURL) {
      this.setState({ LinkErrorMessage: "Not a Valid URL" });
      return;
    }
    fetch(`/checkunique/${this.state.code}/${link}`)
      .then((data) => {
        return data.json();
      })
      .then((results) => {
        var uniqueLink = !results.repeatLink;
        if (!uniqueLink) {
          this.setState({ LinkErrorMessage: "URL already exists" });
        }
        var uniqueCode = !results.repeatCode;
        if (!uniqueCode) {
          this.setState({ CodeErrorMessage: "Code Already in Use" });
        }
      });

    if (uniqueLink && uniqueCode) {
      document.getElementById("form").reset();
      return fetch(`/${code}/gen/${link}`).then(({ results }) =>
        this.setState({ backendData: results })
      );
    }
  }

  validateformat(splits, starts, validURL) {
    if (!(splits[starts].split(".")[0] === "www")) {
      validURL = false;
    } else if (!(splits[starts].split(".")[2] === "com")) {
      validURL = false;
    }
    return validURL;
  }

  normalize(link) {
    var splits = link.split("/");
    var starts = 1;
    if (!(splits[0] === "https:") && !(splits[0] === "http:")) {
      link = "https://" + link;
      starts = 0;
    }
    const index = splits.indexOf("");

    if (index > -1) {
      splits.splice(index, 1);
    }
    return { splits, starts, link };
  }

  render() {
    return (
      <>
        <form id="form">
          <input
            type="text"
            placeholder="Place link here"
            class="border-2 border-black rounded-[5px]"
            onChange={(e) => {
              var link = e.target.value;
              this.setState({ link });
            }}
          />
          <input
            type="text"
            placeholder="Place code here"
            class="border-2 border-black rounded-[5px]"
            onChange={(e) => {
              var code = e.target.value;
              this.setState({ code });
            }}
          />
        </form>

        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
          onClick={() => {
            this.save(this.state.link, this.state.code);
          }}
        >
          Shorten
        </button>
        <p className="message">{this.state.LinkErrorMessage}</p>
        <p className="message">{this.state.CodeErrorMessage}</p>
      </>
    );
  }
}

export default Inputs;

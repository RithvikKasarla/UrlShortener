import React from "react";

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      code: "",
    };
  }

  save(link, code) {
    console.log(`link ${link}`);
    console.log(`code ${code}`);

    return fetch(`/${code}/gen/${link}`).then(({ results }) =>
      this.setState({ backendData: results })
    );
  }

  render() {
    return (
      <>
        <form id="form">
          <input
            type="text"
            placeholder="Place link here"
            onChange={(e) => {
              var link = e.target.value;
              this.setState({ link });
            }}
          />
          <input
            type="text"
            placeholder="Place code here"
            onChange={(e) => {
              var code = e.target.value;
              this.setState({ code });
            }}
          />
        </form>
        <button
          onClick={() => {
            this.save(this.state.link, this.state.code);
          }}
        >
          Shorten
        </button>
      </>
    );
  }
}

export default Inputs;

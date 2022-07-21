function QuerySearch(props) {
  return (
    <input
      placeholder="Search Code"
      onChange={(e) => {
        props.handleChange(e.target.value);
      }}
    />
  );
}

export default QuerySearch;

class Errors extends React.Component {
  render() {
    let errors = Object.keys(this.props.errors).map((attribute) => {
      return <li key={attribute}>{attribute} {this.props.errors[attribute]}</li>;
    });

    return (
      <ul className="alert alert-danger">
        {errors}
      </ul>
    );
  }
}

import React, { Component } from "react";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import { searchQuery, fetchItems } from "../../actions/search";

class SearchPage extends Component {
  onChange = e => {
    this.props.searchQuery(e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.fetchItems(this.props.text);
  };
  render() {
    return (
      <MDBCol md="6">
        <MDBFormInline className="md-form" onSubmit={this.onSubmit}>
          <MDBIcon icon="search" />
          <input
            className="form-control form-control-sm ml-3 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onChange}
          />
        </MDBFormInline>
      </MDBCol>
    );
  }
}
const mapStateToProps = state => ({
  text: state.search.text
});
export default connect(mapStateToProps, { searchQuery, fetchItems })(
  SearchPage
);

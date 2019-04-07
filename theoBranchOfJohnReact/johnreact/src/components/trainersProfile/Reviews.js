import React, { Component } from "react";
import Review from "./Review";
import $ from "jquery";
class Reviews extends Component {
  state = {
    user: {},
    reviews: []
  };

  componentDidMount = () => {
    // let userLoggedIn = localStorage.getItem("user");
    // if (userLoggedIn != "") {
    const { id } = this.props.match.params;
    // userLoggedIn = JSON.parse(userLoggedIn);
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/session/reviews-trainer/${id}?start=0&end=10`,
      dataType: "json",
      async: true,
      success: reviews => {
        console.log(reviews);
        this.setState({
          reviews: reviews.results
        });
        if (reviews.results.length > 0) {
          let user = reviews.results[0].session.trainer;
          this.setState({
            user
          });
        } else {
          this.getUser(id);
        }
        //   dispatch({ type: "FILL_MY_REVIEWS", payload: reviews });
        //   this.props.history.push("/myReviews");
      },
      error: () => {}
    });
    // }
  };

  getUser = id => {
    console.log("eeee");
    $.ajax({
      type: "GET",
      url: `http://localhost:8080/find/getUser/${id}`,
      dataType: "json",
      async: true,
      success: user => {
        this.setState({
          user
        });
      },
      error: error => {
        this.props.history.push("/");
      }
    });
  };

  render() {
    const { reviews, user } = this.state;
    return (
      <React.Fragment>
        <div class="container">
          <h2 class="text-center">
            {reviews.length == 0
              ? "No Reviews yet for " + user.firstName + " " + user.lastName
              : "Reviews for " + user.firstName + " " + user.lastName}
          </h2>
          {reviews.map(review => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Reviews;

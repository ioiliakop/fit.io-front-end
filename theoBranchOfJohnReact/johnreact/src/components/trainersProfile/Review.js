import React, { Component } from "react";

class Review extends Component {
  generateStars = stars => {
    let ratings = [];
    for (var i = 0; i < stars; i++) {
      ratings.push(
        <span key={i} class="float-right">
          <i class="text-warning fa fa-star" />
        </span>
      );
    }
    return ratings;
  };

  generatePicture = () => {
    const { client } = this.props.review.session;
    if (client.photoLink == "" || client.photoLink == null) {
      return (<img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />)
    } else {
      return (<img src={client.photoLink} class="img img-rounded img-fluid" />)
    }
  }

  render() {
    return (
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-2">
              {this.generatePicture()}
              <p class="text-secondary text-center">{this.props.review.date}</p>
            </div>
            <div class="col-md-10">
              <p>
                <a class="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"  >
                  <strong>
                    {this.props.review.session.client.firstName +
                      " " +
                      this.props.review.session.client.lastName}
                  </strong>
                </a>
                {this.generateStars(this.props.review.rating)};
              </p>
              <div class="clearfix" />
              <p>{this.props.review.comment}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;

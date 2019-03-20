import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
        <footer id="main-footer" class="text-center p-4 bg-primary">
        <div class="container">
          <div class="row">
            <div class="col">
              <p class="text-center text-white">Copyright 2019 &copy; fit.io</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

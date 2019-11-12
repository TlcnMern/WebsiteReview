import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class SliderImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    return (
      <div className="imageSlider">
        <Slider
          className="imageSlider-zoom"
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}>
            <div>
              <h3>
                <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="300px" height="300px" alt="2R4U" style={{margin:'5px'}}/>
              </h3>
            </div>
            <div>
              <h3>
                <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="300px" height="300px" alt="2R4U" style={{margin:'5px'}}/>
              </h3>
            </div>
            <div>
              <h3>
                <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="300px" height="300px" alt="2R4U" style={{margin:'5px'}}/>
              </h3>
            </div>
            <div>
              <h3>
                <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="300px" height="300px" alt="2R4U" style={{margin:'5px'}}/>
              </h3>
            </div>
            <div>
              <h3>
                <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="300px" height="300px" alt="2R4U" style={{margin:'5px'}}/>
              </h3>
            </div>
            <div>
              <h3>
                <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="300px" height="300px" alt="2R4U" style={{margin:'5px'}}/>
              </h3>
            </div>
          </Slider>
          
          <Slider
            className="imageSlider-multi"
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}>
              <div>
                <h3>
                  <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="100px" height="100px" alt="2R4U" style={{margin: '5px',padding: '5px',border: '1px solid #d1d1d1',boxShadow: '0 0 2px 2px #d1d1d1'}}/>
                </h3>
              </div>
              <div>
                <h3>
                  <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="100px" height="100px" alt="2R4U" style={{margin: '5px',padding: '5px',border: '1px solid #d1d1d1',boxShadow: '0 0 2px 2px #d1d1d1'}}/>
                </h3>
                </div>
                <div>
                  <h3>
                    <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="100px" height="100px" alt="2R4U" style={{margin: '5px',padding: '5px',border: '1px solid #d1d1d1',boxShadow: '0 0 2px 2px #d1d1d1'}}/>
                  </h3>
                </div>
                <div>
                  <h3>
                    <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="100px" height="100px" alt="2R4U" style={{margin: '5px',padding: '5px',border: '1px solid #d1d1d1',boxShadow: '0 0 2px 2px #d1d1d1'}}/>
                  </h3>
                </div>
                <div>
                  <h3>
                    <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="100px" height="100px" alt="2R4U" style={{margin: '5px',padding: '5px',border: '1px solid #d1d1d1',boxShadow: '0 0 2px 2px #d1d1d1'}}/>
                  </h3>
                </div>
                <div>
                  <h3>
                    <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/15107209_358012697885917_514403840373273493_n.jpg?_nc_cat=106&_nc_oc=AQm7oe8Ti36QFi0EtGtgY-GsBjw7_QS4q6-FsaZ1VoUiiqDERYJFjgPajUxZaUiweks&_nc_ht=scontent.fsgn2-3.fna&oh=e624c9482aafd4fc1b28a5f90f34cf8a&oe=5E53CC56' width="100px" height="100px" alt="2R4U" style={{margin: '5px',padding: '5px',border: '1px solid #d1d1d1',boxShadow: '0 0 2px 2px #d1d1d1'}}/>
                  </h3>
                </div>
              </Slider>
            </div>
    );
  }
}
export default SliderImage ;
import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
  return (
    <div class="carousel slide" data-ride="carousel">
        <div class="carousel-inner bg-info" role="listbox">
          <div class="carousel-item active">
              <div class="d-flex align-items-center justify-content-center min-vh-100">
                  <h1 class="display-1">ONE</h1>
              </div>
          </div>
    </div>
</div>
  );
}

export default UncontrolledExample;
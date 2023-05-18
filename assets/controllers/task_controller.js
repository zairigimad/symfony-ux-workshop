import { Controller } from '@hotwired/stimulus';
import Swal from 'sweetalert2';
import * as Turbo from '@hotwired/turbo';

/*
* The following line makes this controller "lazy": it won't be downloaded until needed
* See https://github.com/symfony/stimulus-bridge#lazy-controllers
*/
/* stimulusFetch: 'lazy' */
export default class extends Controller {
  static values = {
      url: String,
  }

  static classes = [ "loading" ]

  static targets = [ "loader" ]

  remove(event) {
      event.preventDefault();
      this.loaderTarget.classList.add(this.loadingClass);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetch(this.urlValue, {  method: 'POST' })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(() => {
            Turbo.visit(location)
          })
        }
        else {
          this.loaderTarget.classList.remove(this.loadingClass);
        }
      })
    }
}

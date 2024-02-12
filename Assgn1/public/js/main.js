/**********************************************************************************
 *  WEB422 – Assignment 2
 * 
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: _Sukhman Hayer___ Student ID: _143345221__ Date: __2/8/2024_
 *********************************************************************************/


// add variable and functions
// page (number) - keeps track of which page the user is on (default: 1)
var page = 1;
// perPage (number) - the number of results to show per page (default: 10
var perPage = 10;
// searchName (string) - keeps track of current search term (default: '')
var searchName = '';
//loadListingsData() (function)
    //- pull listings from api format and add it to DOM
function loadListingsData() {
    //url to fetch data from
    var url = `https://lucky-blue-cuttlefish.cyclic.app`;
    fetch(`${url}/api/listings?page=${page}&perPage=${perPage}&name=${encodeURIComponent(searchName)}`)
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    })
    .then(data => {
        //display api data in the table
        if(data.length){            
            var listingsRows = `${data.map((entry) => (`<tr id="${entry._id}">
            <td>${entry.name}</td>
            <td>${entry.room_type}</td>
            <td>${entry.address.street}</td>
            <td>${entry.summary}<br><br>
            <strong>Accommodates:</strong> ${entry.accommodates}<br>
            <strong>Rating:</strong> ${entry.review_scores.review_scores_rating} (${entry.number_of_reviews} Reviews)</td>
            </tr>`)).join('')}`;
            document.querySelector("#listingsTable tbody").innerHTML = listingsRows;
            document.querySelector('#current-page').textContent = page;
            //"click" event listener to the rows to display the data in a window
            document.querySelectorAll('#listingsTable tbody tr').forEach((row) => {
                row.addEventListener('click', (e) => {
                    //get the id of the listing from the row
                    let id = row.getAttribute('id');
                    //use the id to get all the details of the listing
                    fetch(`${url}/api/listings/${id}`)
                        .then((res) => {
                            return res.ok ? res.json() : Promise.reject(res.status);
                        })
                        .then((data) => {
                            //make a modal
                            document.querySelector('#detailsModal .modal-title').textContent = data.name;
                            //create the modal body content
                            let newModal = `
                                <img id="photo" onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Photo+Not+Available'" 
                                    class="img-fluid w-100" src="${data.images.picture_url}"><br><br>
                                ${data.neighborhood_overview}<br><br>
                                <strong>Price:</strong> $${data.price.toFixed(2)}<br>
                                <strong>Room:</strong> ${data.room_type}<br>
                                <strong>Bed:</strong> ${data.bed_type} (${data.beds})<br>`
                                ;
                            document.querySelector('#detailsModal .modal-body').innerHTML = newModal;
                            // show the finished window
                            let modal = new bootstrap.Modal(document.getElementById('detailsModal'), {
                                backdrop: 'static',
                                keyboard: false,
                            });
                            modal.show();

                        });
                });
            });


        }else{
            // when no more listings available
            if (page > 1) {
                page--;
            }
            else {
                //add text saying no listings available
                var noListings = document.getElementById("listingsTable").getElementsByTagName("noListings");
                noListings.innerHTML = `<tr><td colspan="4"><strong>No data available</td></tr>`;
            }
        }
    }).catch(err => {
        // error handling for no listings available
        let msg = `<tr><td colspan="4"><strong>No data available</td></tr>`;
			document.querySelector('#listingsTable tbody').innerHTML = msg;
    });
}

// an event listener to use loadListingsData() when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
	loadListingsData();
	//a click event to the previous button
	document.querySelector('#previous-page').addEventListener('click', (e) => {
		if (page > 1) {
			page--;
			loadListingsData();
		}
	});
	//a click event to the next button
	document.querySelector('#next-page').addEventListener('click', (e) => {
		page++;
		loadListingsData();
	});
	// a click event for the search button
	document.querySelector('#searchForm').addEventListener('submit', (e) => {
		e.preventDefault(); // prevent the default form submission
		searchName = e.target[0].value; // get the search input value
		page = 1;
		loadListingsData();
	});
	// a click event for the clear button
	document.querySelector('#clearForm').addEventListener('click', (e) => {
		searchName = null;
		page = 1;
		loadListingsData();
	});
});

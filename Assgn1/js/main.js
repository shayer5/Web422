// add variable and functions
// page (number) - keeps track of which page the user is on (default: 1)
var page = 1;
// perPage (number) - the number of results to show per page (default: 10
var perPage = 10;
// searchName (string) - keeps track of current search term (default: '')
var searchName = '';
//loadListingsData() (function)
    //- pull listings from api
    // format and add it to DOM
    //add "click" event listener for each row item, which will show the modal window with the listing details
function loadListingsData() {
    //url to fetch data from
    var url = `https://lucky-blue-cuttlefish.cyclic.app`;
    fetch(`${url}/api/listings?page=${page}&perPage=${perPage}&name=${encodeURIComponent(searchName)}`)
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    })
    .then(data => {
        if(data.length){
            // non-empty array (listings available)
            //listingstablerow = id,name,roomtype,street,summary,accommodates,review_scores_rating
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
            document.querySelectorAll('#listingsTable tbody tr').forEach((row) => {
                row.addEventListener('click', (e) => {

                    // get the id of the listing
                    let id = e.currentTarget.getAttribute('data-id');

                    // make a "fetch" request to the listings API using the id
                    fetch(`/api/listings/${id}`)
                        .then((res) => {
                            return res.ok ? res.json() : Promise.reject(res.status);
                        })
                        .then((data) => {

                            // set the modal title
                            document.querySelector('#detailsModal .modal-title').textContent = data.name;

                            // create the modal body content
                            let modalContent = `
                                <img id="photo" onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Photo+Not+Available'" 
                                    class="img-fluid w-100" src="${data.images.picture_url}"><br><br>
                                ${data.neighborhood_overview}<br><br>
                                <strong>Price:</strong> $${data.price.toFixed(2)}<br>
                                <strong>Room:</strong> ${data.room_type}<br>
                                <strong>Bed:</strong> ${data.bed_type} (${data.beds})<br>
                            `;

                            // add the modal content to the DOM
                            document.querySelector('#detailsModal .modal-body').innerHTML = modalContent;

                            // show the modal
                            let modal = new bootstrap.Modal(document.getElementById('detailsModal'), {
                                backdrop: 'static',
                                keyboard: false,
                            });
                            modal.show();

                        });
                });
            });


        }else{
            // no more listings available
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
        // error (no listings available)
        let msg = `<tr><td colspan="4"><strong>No data available</td></tr>`;
			document.querySelector('#listingsTable tbody').innerHTML = msg;
    });
}



// Execute data fetching when the DOM is 'ready'
document.addEventListener('DOMContentLoaded', () => {
	loadListingsData();
	// add the "click" event listener to the previous button
	document.querySelector('#previous-page').addEventListener('click', (e) => {
		if (page > 1) {
			page--;
			loadListingsData();
		}
	});
	// add the "click" event listener to the next button
	document.querySelector('#next-page').addEventListener('click', (e) => {
		page++;
		loadListingsData();
	});
	// add the "submit" event listener to the seartch button
	document.querySelector('#searchForm').addEventListener('submit', (e) => {
		e.preventDefault(); // prevent the default form submission
		searchName = e.target[0].value; // get the search input value
		page = 1;
		loadListingsData();
	});
	// add the "click" event listener to the clear button
	document.querySelector('#clearForm').addEventListener('click', (e) => {
		searchName = null;
		page = 1;
		loadListingsData();
	});
});

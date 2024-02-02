// add variable and functions
// page (number) - keeps track of which page the user is on (default: 1)
var page = 1;
// perPage (number) - the number of results to show per page (default: 10)
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
    });
}


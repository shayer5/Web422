This application is used to allow us to view data loaded from a Mongo Database, and use methods like GET,POST, PUT, DELETE to alter the data within the data using tools such as Postman or others.


-Since this application is hosted on Cyclic there is no need for you to do anything with this code. But can review it to see how it works

USAGE-----

To load the website you will be going to 
----------------------------------------
https://lucky-blue-cuttlefish.cyclic.app/
----------------------------------------
Here you will be greeted by a generic page with some text which is not important but to GET all listings or individual listings use the URL below 
----------------------------------------
https://lucky-blue-cuttlefish.cyclic.app/api/listings
----------------------------------------
Displays a default amount of listings (15), on page 1 You can customize the amount per page and what page you want loaded with the URL below, and change page=1&perPage=20, to whatever amounts you like
----------------------------------------
https://lucky-blue-cuttlefish.cyclic.app/api/listings?page=1&perPage=20
----------------------------------------
Another added feature is including a name parameter after to list any properties matching what was entered in the name category. page=1&perPage=5&name=Near Can change Near to what you like
----------------------------------------
https://lucky-blue-cuttlefish.cyclic.app/api/listings?page=1&perPage=5&name=Near
----------------------------------------


You can also do this on Postman to see if the get method is working as intended, by going to the site, Going to Workspaces, 
Starting a new collection,
And Then choosing a method in the dropdown menu, and using the URL
https://lucky-blue-cuttlefish.cyclic.app/api/listings as a base

For GET methods
can get the home page
https://lucky-blue-cuttlefish.cyclic.app
can get all listings
https://lucky-blue-cuttlefish.cyclic.app/api/listings
OR
https://lucky-blue-cuttlefish.cyclic.app/api/listings?page=1&perPage=20
OR
https://lucky-blue-cuttlefish.cyclic.app/api/listings?page=1&perPage=5&name=Near
can get individual listings as well with 
https://lucky-blue-cuttlefish.cyclic.app/api/listings/10038496  The number at the end is the _id

For POST Method

Change to post in the dropdown menu and use URL
https://lucky-blue-cuttlefish.cyclic.app/api/listings
Then go into the body tab right below the URL 
then select raw, and JSON from the dropdown menu and enter a new enter using the format in the ListingSchema.js or the following example



```{"_id":"4069420","listing_url":"https://www.airbnb.com/rooms/4069420","name":"#Private Studios The NextGen - Waikiki Dream","summary":"At beginning Waikiki, the tourist center of Honolulu, this charming studio is about 10min walking distance from the beach, and all happenings.  Across the bridge to Convention Center and 15min walk to Ala Moana mall. Bus line is across the street. Studio is fully furnished - full size bed,TV, Wifi, mid size fridge, full bath, microwave, coffee maker, induction hot plate. Building has laundry, pool, jacuzzi and BBQ area; for additional fee you may use gym and parking ($25/24hrs in-out privileges)","interaction":"if not using self-checkin, at check-in to hand keys. Otherwise always accessible to answer questions.","house_rules":"There will be a packet with house rules in the unit.  The rules are rather standard, asking residents not to create excessive noise, no illegal substances, no smoking, no pets, … Unit is not child-proved, nor is there an additional bed.","property_type":"Condominium","room_type":"Entire home/apt","bed_type":"Real Bed","minimum_nights":1,"maximum_nights":1125,"cancellation_policy":"moderate","last_scraped":"2019-03-06T05:00:00.000Z","calendar_last_scraped":"2019-03-06T05:00:00.000Z","first_review":"2014-09-26T04:00:00.000Z","last_review":"2019-02-25T05:00:00.000Z","accommodates":2,"bedrooms":0,"beds":1,"number_of_reviews":533,"bathrooms":1,"amenities":["TV","Cable TV","Internet","Wifi","Air conditioning","Pool","Kitchen","Elevator","Hot tub","Family/kid friendly","Washer","Dryer","Smoke detector","Carbon monoxide detector","Safety card","Fire extinguisher","Essentials","Shampoo","24-hour check-in","Hangers","Hair dryer","Iron","Laptop friendly workspace","Self check-in","Lockbox","Private entrance","Hot water","Luggage dropoff allowed","Long term stays allowed","Paid parking on premises"],"price":124,"extra_people":0,"guests_included":1,"images":{"thumbnail_url":"","medium_url":"","picture_url":"https://a0.muscache.com/im/pictures/a47a0b52-8742-4b9f-87e4-8a6efbf642b3.jpg?aki_policy=large","xl_picture_url":"","_id":"65b96b795fbd11672f91dac0"},"host":{"host_id":"21105755","host_url":"https://www.airbnb.com/users/show/21105755","host_name":"Dana","host_location":"Honolulu, Hawaii, United States","host_about":"Love Hawaii!! Originally from Prague, Czech Republic.","host_response_time":"within an hour","host_thumbnail_url":"https://a0.muscache.com/im/users/21105755/profile_pic/1410226755/original.jpg?aki_policy=profile_small","host_picture_url":"https://a0.muscache.com/im/users/21105755/profile_pic/1410226755/original.jpg?aki_policy=profile_x_medium","host_neighbourhood":"Waikiki","host_response_rate":100,"host_is_superhost":true,"host_has_profile_pic":true,"host_identity_verified":false,"host_listings_count":1,"host_total_listings_count":1,"host_verifications":["email","phone","reviews","jumio","government_id"],"_id":"65b96b795fbd11672f91dac1"},"address":{"street":"Honolulu, HI, United States","suburb":"Honolulu","government_area":"Primary Urban Center","market":"Oahu","country":"United States","country_code":"US","location":{"type":"Point","coordinates":[-157.83386,21.28741],"is_location_exact":true,"_id":"65b96b795fbd11672f91dac2"},"_id":"65b96b795fbd11672f91dac3"},"availability":{"availability_30":3,"availability_60":6,"availability_90":23,"availability_365":260,"_id":"65b96b795fbd11672f91dac4"},"review_scores":{"review_scores_accuracy":10,"review_scores_cleanliness":10,"review_scores_checkin":10,"review_scores_communication":10,"review_scores_location":10,"review_scores_value":10,"review_scores_rating":95,"_id":"65b96b795fbd11672f91dac5"},"__v":0}```
Can change any part you wish to add a new entry to the database



FOR PUT METHOD

Change to PUT in the drop down menu 
and use the URL https://lucky-blue-cuttlefish.cyclic.app/api/listings/4069420   Where the last number is the _id of the entry you want to edit

Then go into body as above change to raw and JSON
and then edit the data entry as you wish, however ** CANNOT CHANGE _id **
example body text 

{
    "listing_url":"https://www.airbnb.com/rooms/4069421"
    "name":"#Private Studios The Next Generation EDITED - Waikiki Dream"
}


FOR DELETE METHOD

Change to DELETE in the drop down menu
and use the URL with the _id of the listing you want deleted as such https://lucky-blue-cuttlefish.cyclic.app/api/listings/4069420

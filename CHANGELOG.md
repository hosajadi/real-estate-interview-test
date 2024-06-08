# BACK-END CHANGELOG

# Location Structure Changed

### March 6, 2024

- All locations data typed unified.
    - From now every location has these parameters:
    
    | KEY NAME | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION |
    | --- | --- | --- | --- | --- | --- |
    | coordinates.lat | number |  | ✔ |  |  |
    | coordinates.lng | number |  | ✔ |  |  |
    | addressLine1 | string |  | ✔ |  |  |
    | addressLine2 | string |  | ✔ |  |  |
    | city | string |  | ✔ |  |  |
    | country | string |  | ✔ |  |  |
    | zipCode | string |  | ✔ |  |  |
    | placeId | string |  | ✔ | Google Maps Place Id |  |
    | phone | string |  |  | Only acceptable in coach main address |  |
    
    ### Example Location Object
    
    ```json
    {
          "addressLine1": "123 Main St",
          "addressLine2": "Apt 4B",
          "city": "New York",
          "country": "United States",
          "zipCode": "10001",
          "coordinates": {
            "lat": 40.762569,
            "lng": -73.83143179999999
          },
          "placeId": "EigxMjMgTWFpbiBTdCAjNGIsIEZsdXNoaW5nLCBOWSAxMTM1NCwgVVNBIh4aHAoWChQKEglZsYuSD2DCiRHvpnHNht2ekxICNGI"
        }
    ```
    
- All location inputs should at least be filled with one of `coordinates`, `address` or `placeId`
    - Back end service will convert the filled location type to all other location types.
    - **Example:** Coach Registration - Address API receives address as country, city, addressLine 2, addressLine1, zipCode and it fetches coordinates and placeId from google maps automatically.
    
    **Request:**
    
    ```bash
    curl -X 'POST' \
      'https://api.mysporttimes.net/api/app/coach/auth/register/address?language=en' \
      -H 'accept: */*' \
      -H 'Authorization: Bearer token' \
      -H 'Content-Type: application/json' \
      -d '{
      "country": "United States",
      "city": "New York",
      "addressLine1": "123 Main St",
      "addressLine2": "Apt 4B",
      "zipCode": "10001",
      "phone": "+441234567890"
    }'
    ```
    
    **Response:**
    
    ```json
    {
      "code": "COACH_REGISTER_ADDRESS_SUCCESS",
      "message": "Coach address added successfully.",
      "statusCode": 200,
      "data": {
        "address": {
          "addressLine1": "123 Main St",
          "addressLine2": "Apt 4B",
          "city": "New York",
          "country": "United States",
          "zipCode": "10001",
          "phone": "+441234567890",
          "coordinates": {
            "lat": 40.762569,
            "lng": -73.83143179999999
          },
          "placeId": "EigxMjMgTWFpbiBTdCAjNGIsIEZsdXNoaW5nLCBOWSAxMTM1NCwgVVNBIh4aHAoWChQKEglZsYuSD2DCiRHvpnHNht2ekxICNGI"
        }
      }
    }
    ```
    
- Coach data type modified.
    
    **Changes:**
    
    `locationCoordinates` <`{lat:number lng:number}`> → `activitiesAddress` <Address>
    
    `address` <`{lat:number lng:number}`> → `address` <Address>
    
- Customer data type modified.
    
    **Changes:**
    
    `locationCoordinates` <`{lat:number lng:number}`> → `location` <Address>
    
- Booking data type modified.
    
    **Changes:**
    
    `locationCoordinates` <`{lat:number lng:number}` > → `location` <Address
FORMAT: A1

# Chá-Rifa API

This is an API Blueprint describing the Chá-Rifa API.

## Numbers [/api/numbers]

### Numbers collection [GET]

+ Response 200 (application/json)

    + Attributes
        + numbers: (array[object])
            + number: 3 (number, required) - A raffle number
            + status: waiting (enum[string], required) - Status of the number
                + Members
                    + `available`
                    + `waiting`
                    + `confirmed`

    + Body

        ```json
        {
            [
                {
                    "number": 1,
                    "status": "available"
                },
                {
                    "number": 2,
                    "status": "available"
                },
                {
                    "number": 3,
                    "status": "waiting"
                },
                {
                    "number": 4,
                    "status": "confirmed"
                }
            ]
        }
        ```

## Buyer [/api/buyers/{phone}]

+ Parameters
    + phone: 12912345678 (required, string) - Buyer's phone number with DDD

+ Attributes (Buyer)

### View a Buyer details [GET]

+ Response 200 (application/json)

    + Attributes (Buyer)

    + Body

        ```json
        {
            "phone": "12912345678",
            "name": "Ana"
        }
        ```

+ Response 404 (application/json)

    + Attributes
        + error: (Error)

    + Body

        ```json
        {
            "error": {
                "code": "BUYER_NOT_FOUND",
                "message": "Buyer not found"
            }
        }
        ```

### Create a Buyer [POST]

+ Response 201 (application/json)

    + Attributes (Buyer)

    + Body

        ```json
        {
            "phone": "12912345678",
            "name": "Ana"
        }
        ```

+ Response 409 (application/json)

    + Attributes
        + error: (Error)

    + Body

        ```json
        {
            "error": {
                "code": "BUYER_CONFLICT",
                "message": "Buyer already registered"
            }
        }
        ```

## Buyer's numbers [/api/buyers/{phone}/numbers]

### List all Buyer's numbers [GET]

+ Response 200 (application/json)

    + Attributes
        + buyer: 12912345678 (string) - Buyer's phone number
        + numbers: (array[object])
            + number: 3 (number, required) - A raffle number
            + status: waiting (enum[string], required) - Status of the number
                + Members
                    + `available`
                    + `waiting`
                    + `confirmed`

    + Body

        ```json
        {
            "buyer": "12912345678",
            "numbers": [
                {
                    "number": 3,
                    "status": "waiting"
                },
                {
                    "number": 15,
                    "status": "confirmed"
                }
            ]
        }
        ```

## Buy [/api/buy]

### Buy one or more numbers [POST]

+ Request (application/json)

    + Attributes
        + buyer: 12912345678 (string) - Buyer's phone number
        + numbers: 1, 3, 5, 7, 13, 29 (array[number]) - Numbers to buy

+ Response 200 (application/json)

    + Attributes
        + buyer: 12912345678 (string) - Buyer's phone number
        + success: 1, 3, 5, 7, 13, 29 (array[number]) - Numbers buyed with success

+ Response 409 (application/json)

    + Attributes
        + error: (Error)
        + data
            + success: 3, 5, 29 (array[number]) - Numbers buyed with success
            + conflict: 1, 7, 13 (array[number]) - Numbers that's have been bought

    + Body

        ```json
        {
            "error": {
                "code": "BUY_CONFLICT",
                "message": "Failed to reserve one or more numbers"
            },
            "data": {
                "success": [3, 5, 29],
                "conflict": [1, 7, 13]
            }
        }
        ```

## Data structures

### Error (object)

+ code: BUYER_NOT_FOUND (string, required) - The application error code
+ message: Buyer not found (string, required) - The error message

### Buyer (object)

+ phone: 12912345678 (string, required) - The phone number with DDD code
+ name: Ana (string, required) - The buyer's name

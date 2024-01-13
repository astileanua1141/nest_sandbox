## My CarValue 

---

#### POST /auth/signup 
Create a new user and sign in 
- Body: `{ email, password }` 
#### POST /auth/signin 
Sign in as an existing user 
- Body: `{ email, password }` 

#### GET /reports
Get an estimate for the cars value 
- Query string: `make, model, year, mileage, longitude, latitude`

#### POST /reports 
Report how much  avehicle sold for
- Body: `{ make, model, year, mileage, longitude, latitude }`

#### POST /reports
Approve or reject a repport submitted by a user
- Body: `{ approved }`

--- 
### Commands ran at startup: 
- nest g module users
- nest g module reports
- nest g controller users
- nest g controller reports
- nest g service users
- nest g service reports
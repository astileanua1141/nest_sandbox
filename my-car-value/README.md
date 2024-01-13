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

export interface Checkout {
  billing: {
    firstName: String,
    lastName: String,
    companyName: String,
    email: String,
    phone: String,
    country: String,
    state: String,
    postcode: number,
    streetAddress: String
  },
   shipping: {
    firstName: String,
    lastName: String,
    companyName: String,
    email: String,
    phone: String,
    country: String,
    state: String,
    postcode: number,
    streetAddress: String
  }

}

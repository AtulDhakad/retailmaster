import { CompanyAddress } from './companyaddress';
import { CompanyBusinessDetails } from './companybusinessdetails';
import { CompanyContact } from './companycontact';
import { CompanyRegistration } from './companyregistration';
export interface CompanyProfile {
  business: CompanyBusinessDetails;
  registration: CompanyRegistration;
  address: CompanyAddress;
  contact: CompanyContact;
}

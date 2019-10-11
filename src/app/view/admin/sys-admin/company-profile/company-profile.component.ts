import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';
import { CompanyProfile } from '../../../../models/companyprofile';
import { SysAdminService } from '../../../../services/sys-admin.service';

@Component({
  selector: 'app-sys-admin-company-profile',
  templateUrl: './company-profile.html'
})

export class SysAdminCompanyProfileComponent {
  profile: CompanyProfile;
  countries: string[] = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica',
    'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh',
    'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegowina', 'Botswana',
    'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China',
    'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the',
    'Cook Islands', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia (Hrvatska)', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti',
    'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea',
    'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'France Metropolitan',
    'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
    'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Heard and Mc Donald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland',
    'India', 'Indonesia', 'Iran (Islamic Republic of)', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
    'Kenya', 'Kiribati', 'Korea, Democratic People\'s Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao',
    'People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania',
    'Luxembourg', 'Macau', 'Macedonia, The Former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali',
    'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of',
    'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island',
    'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
    'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis',
    'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
    'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia (Slovak Republic)', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
    'South Georgia and the South Sandwich Islands', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan',
    'Suriname', 'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan',
    'Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago',
    'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela',
    'Vietnam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen',
    'Yugoslavia', 'Zambia', 'Zimbabwe'];
  @ViewChild('file', { static: true }) file: ElementRef;
  @ViewChild('alert', { static: true }) alert: ElementRef;
  constructor(private service: SysAdminService, private renderer: Renderer) {
    this.profile = {
      business: {
        business_logo: '',
        business_name: '',
        legal_name: ''
      },
      address: {
        country: '',
        street: '',
        city_state: ''
      },
      contact: {
        contact_name: '',
        contact_email: '',
        contact_mobile: ''
      },
      registration: {
        business_reg_no: '',
        gst_reg_no: ''
      }
    };
    this.init();
  }

  init(): void {
    // Observable.combineLatest(
    //   this.service.getBusinessDetails(),
    //   this.service.getAddressDetails(),
    //   this.service.getContactDetails(),
    //   this.service.getRegistrationDetails()
    // ).subscribe(this.assignProfile.bind(this));
  }

  assignProfile(res: any[]): void {
    this.profile.business = res[0];
    this.profile.address = res[1];
    this.profile.contact = res[2];
    this.profile.registration = res[3];
  }

  saveProfile(type: string): void {
    let body: any;
    switch (type) {
      case 'business':
        body = this.profile.business;
        break;

      case 'address':
        body = this.profile.address;
        break;

      case 'contact':
        body = this.profile.contact;
        break;

      case 'registration':
        body = this.profile.registration;
        break;
    }
    this.service.saveProfile(type, body).subscribe(r => {
      this.renderer.invokeElementMethod(this.alert.nativeElement, 'click');
    });
  }

  imgToBase64(): void {
    const reader = new FileReader();
    reader.addEventListener('load', (e: any) => {
      this.profile.business.business_logo = e.target.result;
    });
    if (this.file.nativeElement.files.length > 0) {
      reader.readAsDataURL(this.file.nativeElement.files[0]);
    } else {
      this.profile.business.business_logo = '';
    }
  }
}

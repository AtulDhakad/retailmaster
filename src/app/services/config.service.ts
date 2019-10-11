import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {

  // static domain: string = 'http://127.0.0.1/magento2';
  // static domain: string = environment.domain; // 'http://api.retailmaster.xyz';

  static BASE_URL_M2_CUSTOM: string = environment.domainM2.concat('/rpApi');

  static BASE_URL: string = environment.domain.concat('/index.php/rest/V1/rmapi');
  static BASE_URL2: string = 'http://gswdev.com/api-rest';
  
  static STORE_URL: string = environment.domain.concat('/rest/V1');
  
  static STORE_URL_VIEW: string = environment.domain.concat('/index.php/rest/V1');
  // static LOCAL_STORE_URL_VIEW: string = 'http://127.0.0.1/magento2/index.php/rest/V1';
  static TOKEN_NAME: string = 'rm.jwt';

  // For Production
  //static QBO_URL="https://quickbooks.api.intuit.com";
  //For Development
  static QBO_URL = "https://sandbox-quickbooks.api.intuit.com";
}

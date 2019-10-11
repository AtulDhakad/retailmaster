import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FinanceService } from 'src/app/services/finance.service';
@Component({
  selector: 'app-upload-bank-deposits-from-csv',
  templateUrl: './upload-bank-deposits-from-csv.component.html',
  styleUrls: ['./upload-bank-deposits-from-csv.component.scss']
})
export class UploadBankDepositsFromCsvComponent implements OnInit {
  loading:boolean=false;
  csvData:any=[];
  dataToSave:any=[];
  uploadedData:any=[];
  constructor(private toastr: ToastrService, private financeService: FinanceService) { }

  ngOnInit() {
  }

  onFilesAdded(files: File[]) {
    console.log(files);
    this.loading=true;
    files.forEach(file => {
      const reader = new FileReader();
   
      reader.onload = (e: ProgressEvent) => {
        const content = <string> (e.target as FileReader).result;
   
        // this content string could be used directly as an image source
        // or be uploaded to a webserver via HTTP request.
        console.log('content',content);
        try{
        
        let data = content.split(/\r?\n|\r/).map(csv=> csv.split(','));
        let headings = data.shift(); // extract heading row
        data.pop(); // remove last blank one
        // formate date, add key
        let formatedDate:any= data.map(csv=>
          headings.reduce( (t,h,i )=> ({...t,[h.replace(/\s/g,"_").toLowerCase()]:csv[i] }) ,{} )
        );

        console.log(formatedDate);
          //take only non zero cradits
          formatedDate = formatedDate.filter(d=> d.credit!=="0");
          // exclude card deposits
          this.csvData = formatedDate.filter(d=> d.memo2.search(/DR\/CARD|CR\/CARD/ig)===-1 )
          console.log('After',this.csvData);
          
          // extract relavant data to upload
          this.dataToSave = this.csvData.map(d=>{            
            return {
              date:d.posting_date.split(' ')[0],
              timestamp:d.memo1.split(' ')[0],
              amount_received:d.credit.replace('"',''),
              type:'bank',
              description:d.transaction_ref+', '+d.transaction_description_2
            }
          })

          console.log('formated data',this.dataToSave);

        }catch(err){
          this.toastr.error('Invalid data format');
          console.log('Some error happend '+err);
        }
        
          this.loading=false;
      };
   
      // use this for basic text files like .txt or .csv
      reader.readAsText(file);
   
      // use this for images
      // reader.readAsDataURL(file);
    });
  }

  onFilesRejected(files: File[]) {
    console.log('Reject ',files);   
  }

  onReset(dropzone){
    dropzone.reset();
    this.csvData=[];
    this.dataToSave=[];
  }

  uploadData(){
    let conf = window.confirm('Are you sure, you want to upload this data?');
    if(conf){
      this.loading=true;
      this.financeService.uploadBankDepositsToM2(this.dataToSave)
      .subscribe( (res:any)=>{

        console.log('uploaded res', res);
        if(res.errors && res.errors.length>0){
          this.toastr.error('Some error happend');
        }else{
          if(res.data && res.data.length>0){
            this.toastr.success('Data uploaded');
            this.uploadedData=res.data;
          }else if(res.data && res.data.length===0){
            this.toastr.info('Data already there');
            this.uploadedData=res.data;
          }
        }      
        
        this.loading=false;
      },
      err=>{
        this.toastr.error('Can not upload');
        console.log('deposits uplaod error',err);
        this.loading=false;
      })  
      
    }
  }

}

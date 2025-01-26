import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup ,Validators  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class AppInsert implements OnInit {
  constructor(private apiService: ApiService ,  private fb :FormBuilder) {}
  form!:FormGroup;
    ngOnInit(): void {
      this.form = this.fb.group({
        cardID: ['', Validators.required],
        customerId: ['', Validators.required],
        cardNumber: ['', Validators.required],
        cardType: ['', Validators.required],
        totalLitmit: ['', Validators.required],
        amountUsed: ['', Validators.required],
        availableAmount: ['', Validators.required],
        createDate: ['', Validators.required]
      });
    }

    // btnSave(){
    //   this.apiService.insertCard(this.form.value).subscribe(()=>{
    //     console.log(this.form.value);
    //     this.form.reset();
    //   })
    // }
}

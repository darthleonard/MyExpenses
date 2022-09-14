import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { MockControlsService } from 'src/app/pages/form-test/mock-controls.service';

@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.page.html',
  styleUrls: ['./form-test.page.scss'],
  providers:  [MockControlsService]
})
export class FormTestPage implements OnInit {

  constructor(service: MockControlsService) { 
    this.metadata$ = service.getControls();
  }

  metadata$: Observable<FormControlMetadata<any>[]>;

  ngOnInit() {
  }

}

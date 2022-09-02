import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { SelectModalDataService } from 'src/app/database/select-modal-data.service';
import { FormControlComponent } from '../../form/form-control.component';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  providers: [SelectModalDataService],
})
export class SelectModalComponent
  extends FormControlComponent
  implements OnInit
{
  @ViewChild(IonModal) modal: IonModal;

  constructor(private readonly selectModalDataService: SelectModalDataService) {
    super();
  }

  dataSource: any[];
  filter: string;

  ngOnInit(): void {
    this.selectModalDataService.tableName = this.formControltMetadata.endpoint;
  }

  willPresent() {
    this.selectModalDataService
      .getEntities()
      .then((d) => (this.dataSource = d));
  }

  willDismiss() {
    this.dataSource = undefined;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    const existingItem = this.dataSource.find(
      (item) => item.name.toLowerCase() === this.filter.toLocaleLowerCase()
    );
    let value;
    if (existingItem) {
      value = existingItem.name;
    } else {
      value = this.filter;
      const aux = await this.selectModalDataService.saveEntity({ name: value });
    }
    this.setValueAndClose(value);
  }

  onSelect(data: any) {
    this.setValueAndClose(data.name);
  }

  onSearchChange(event) {
    this.filter = event.detail.value;
  }

  private setValueAndClose(value: any) {
    this.form.controls[this.formControltMetadata.key].setValue(value);
    this.modal.dismiss(null, 'confirm');
  }
}

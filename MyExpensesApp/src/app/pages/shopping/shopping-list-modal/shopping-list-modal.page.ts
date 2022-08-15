import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { ShoppingListMetadataService } from './shopping-list-metadata.service';

@Component({
  selector: 'app-shopping-list-modal',
  templateUrl: './shopping-list-modal.page.html',
  providers: [ShoppingListMetadataService],
})
export class ShoppingListtModalPage implements OnInit {
  constructor(
    private readonly shoppingListMetadataService: ShoppingListMetadataService,
    private readonly modalController: ModalController
  ) {}

  @Input() shoppingList: any;

  metadata: FormControlMetadata<string>[];

  ngOnInit(): void {
    this.shoppingListMetadataService
      .getControls()
      .subscribe((m) => (this.metadata = m));
  }

  onAccept(event: any) {
    this.modalController.dismiss(event);
  }

  onCancel() {
    this.modalController.dismiss();
  }
}

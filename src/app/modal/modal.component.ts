import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { LineaService } from '../service/linea.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  forma: FormGroup;
  constructor( public serviceModal: ModalService,
    public serviceLinea: LineaService) { }

  ngOnInit(): void {

 
  }
  
}

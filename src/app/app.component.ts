import { Component, OnInit } from '@angular/core';
import { IFilters, IFiltersType, IResponse } from './app.type';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as mockData from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public data$: BehaviorSubject<IResponse> = new BehaviorSubject(null);
  public formGroup: FormGroup;
  public types = [{ value: 'serviceId' }, { value: 'componentType' }];
  public copyButtonLabel = '📋Скопировать';

  constructor(private formBuilder: FormBuilder) {}

  // TODO добавить trackBy для оптимизации рендера списков в *ngFor
  // TODO добавить проброс в queryParams выбранных фильтров
  // TODO добавить автоподстановку фильтров из queryParams
  // TODO добавить поддержку onCopy, который будет сохранять в буфер обмена исходный объект данных в виде отформатированной JSON строки с отступами в 2 пробела
  // TODO добавить клиентскую отфильтровку данных согласно выбранным фильтрам
  // TODO починить/прикрутить аккордион

  public ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }

  public onTypeChange(type: string): void {
    this.formGroup.patchValue({ type });
  }

  public onSubmit(
    formValue = { searchInput: '', type: 'serviceId' as IFiltersType }
  ): void {
    const { searchInput, type } = formValue;
    const items = searchInput
      .replace(' ', '')
      .trim()
      .split(',')
      .filter((value: string) => !!value);

    this.data$.next(null);
    this.fetchData({ filters: { items, type } });
  }

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      searchInput: new FormControl(''),
      type: new FormControl('serviceId'),
    });
  }

  private fetchData(
    filters: IFilters = {
      filters: { items: [], type: 'serviceId' as IFiltersType },
    }
  ): void {
    // Эмуляция получения данных
    setTimeout(() => {
      this.data$.next(mockData);
    }, 1000);

    console.log(filters);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Series } from '../models/series-model';
import { Models } from '../models/models-model';
import { OrderCreateService } from './order-create.service';
import { Accessory } from '../models/accessory-model';
import { Colors } from '../models/colors-model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { FormControl } from '@angular/forms';
import { SeriesId } from '../models/seriesid-model';
import { MatPaginator } from '@angular/material/paginator';
import { ModelsId } from '../models/modelsId-model';
import { OrderHeader } from '../models/orderheader-model';
import { OrderHeaderId } from '../models/orderheaderid-model';
import { Orderdetail } from '../models/orderdetail-model';
import { OrderdetailId } from '../models/orderdetailid-model';
import { OrderaccessorydetailId } from '../models/orderaccessorydetailid-model';
import { Orderaccessorydetail } from '../models/orderaccessorydetail-model';




@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  dataSourceForAccessory = new MatTableDataSource();
  dataSourceForColor = new MatTableDataSource();
  // accSelection = new SelectionModel<Accessory>(true, []);
  accselection = new SelectionModel<any>(true, []);


  columnsToDisplayForAccessory = [];
  columnsToDisplayForColor = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  seriesList = [];
  modelList = [];
  accList = [];
  colorsList = [];
  selectedAccessories = [];
  selectedColors = [];

  selectedSeries: any;
  selectedModel: any;
  TotalPrice: any;

  constructor(private orderCreateService: OrderCreateService) { }

  ngOnInit(): void {
    this.columnsToDisplayForAccessory = ['select', 'Position', 'AccessoryName', 'Price'];
    this.columnsToDisplayForColor = ['select', 'Position', 'ColorsName', 'ColorPrice', 'Qty'];
    this.orderCreateService.getSeries().subscribe(result => {
      this.selectedSeries = result[0].id.seriesCode;
      result.forEach(data => {
        this.seriesList.push({
          'code': data.id.seriesCode,
          'data': data,
          'name': data.seriesName
        })
      });
      this.orderCreateService.getModelBasedOnSeries(this.seriesList[0].data).subscribe(result2 => {
        this.selectedModel = result2[0].id.seriesCode + '~' + result2[0].id.modelCode;
        result2.forEach(data => {
          this.modelList.push({
            'code': data.id.seriesCode + '~' + data.id.modelCode,
            'modelName': data.modelName,
            'data': data
          })
        });
        this.orderCreateService.getAccessoryBasedOnMoldes(this.modelList[0].data).subscribe(result3 => {
          result3.forEach(data => {
            console.log(result3.indexOf(data))
            this.accList.push({
              'Position': result3.indexOf(data) + 1,
              'code': data.id.seriesCode + '~' + data.id.modelCode + '~' + data.id.accessoryCode,
              'AccessoryName': data.accessoryName,
              'Price': data.price,
              'data': data
            });
          });
        });
        this.orderCreateService.getAccessoryBasedOnMoldes(this.modelList[0].data).subscribe(result3 => {
          const arr = [];
          result3.forEach(data => {
            console.log(result3.indexOf(data))
            const header = {
              'Position': result3.indexOf(data) + 1,
              'AccessoryName': data.accessoryName,
              'Price': data.price
            };
            arr.push(header);
          });
          console.log(arr);
          this.dataSourceForAccessory = new MatTableDataSource(arr);
          this.dataSourceForAccessory.paginator = this.paginator;

        });
        this.orderCreateService.getColorsBasedOnModels(this.modelList[0].data).subscribe(result4 => {
          result4.forEach(data => {
            console.log(result4.indexOf(data))
            this.colorsList.push({
              'Position': result4.indexOf(data) + 1,
              'code': data.id.seriesCode + '~' + data.id.modelCode + '~' + data.id.colorCode,
              'ColorsName': data.colorName,
              'ColorPrice': data.price,
              'Qty': 1,
              'data': data
            });
          });
        });
        this.orderCreateService.getColorsBasedOnModels(this.modelList[0].data).subscribe(result4 => {
          const arr = [];
          result4.forEach(data => {
            const header = {
              'Position': result4.indexOf(data) + 1,
              'ColorsName': data.colorName,
              'ColorPrice': data.price,
              'Qty': data.qty
            };
            arr.push(header);
          });
          console.log(arr);
          this.dataSourceForColor = new MatTableDataSource(arr);
          this.dataSourceForColor.paginator = this.paginator;
        });
      });
    });
  }

  seriesChange(event: any) {
    this.modelList = [];
    this.accList = [];
    this.colorsList = [];
    this.selectedAccessories = [];
    this.selectedColors = [];
    const series = new Series();
    const id = new SeriesId();
    id.cmpCode = '5000';
    id.seriesCode = event;
    series.id = id;
    this.orderCreateService.getModelBasedOnSeries(series).subscribe(result2 => {
      result2.forEach(data => {
        this.modelList.push({
          'code': data.id.seriesCode + '~' + data.id.modelCode,
          'modelName': data.modelName,
          'data': data
        })
      });
      this.orderCreateService.getAccessoryBasedOnMoldes(this.modelList[0].data).subscribe(result3 => {
        result3.forEach(data => {
          console.log(result3.indexOf(data))
          this.accList.push({
            'Position': result3.indexOf(data) + 1,
            'code': data.id.seriesCode + '~' + data.id.modelCode + '~' + data.id.accessoryCode,
            'AccessoryName': data.accessoryName,
            'Price': data.price,
            'data': data
          });
        });
      });

      this.orderCreateService.getAccessoryBasedOnMoldes(this.modelList[0].data).subscribe(result3 => {
        const arr = [];
        result3.forEach(data => {
          const header = {
            'Position': result3.indexOf(data) + 1,
            'AccessoryName': data.accessoryName,
            'Price': data.price
          };
          arr.push(header);
        });
        console.log(arr);
        this.dataSourceForAccessory = new MatTableDataSource(arr);
        this.dataSourceForAccessory.paginator = this.paginator;

      });
      this.orderCreateService.getColorsBasedOnModels(this.modelList[0].data).subscribe(result4 => {
        result4.forEach(data => {
          console.log(result4.indexOf(data))
          this.colorsList.push({
            'Position': result4.indexOf(data) + 1,
            'code': data.id.seriesCode + '~' + data.id.modelCode + '~' + data.id.colorCode,
            'ColorsName': data.colorName,
            'ColorPrice': data.price,
            'Qty': 1,
            'data': data
          });
        });
      });
      this.orderCreateService.getColorsBasedOnModels(this.modelList[0].data).subscribe(result4 => {
        const arr = [];
        result4.forEach(data => {
          const header = {
            'Position': result4.indexOf(data) + 1,
            'ColorsName': data.colorName,
            'ColorPrice': data.price,
            'Qty': data.qty
          };
          arr.push(header);
        });
        console.log(arr);
        this.dataSourceForColor = new MatTableDataSource(arr);
        this.dataSourceForColor.paginator = this.paginator;
      });
    });
  }

  modelChange(event: any) {
    this.accList = [];
    this.colorsList = [];
    this.selectedAccessories = [];
    this.selectedColors = [];
    console.log(this.accList);
    console.log(event);
    let x = event.split("~");
    const model = new Models();
    const id = new ModelsId();
    id.cmpCode = '5000';
    id.seriesCode = x[0];
    id.modelCode = x[1];
    model.id = id;
    this.orderCreateService.getAccessoryBasedOnMoldes(model).subscribe(result3 => {
      result3.forEach(data => {
        console.log(result3.indexOf(data))
        this.accList.push({
          'Position': result3.indexOf(data) + 1,
          'code': data.id.seriesCode + '~' + data.id.modelCode + '~' + data.id.accessoryCode,
          'AccessoryName': data.accessoryName,
          'Price': data.price,
          'data': data
        });
      });
    });
    this.orderCreateService.getAccessoryBasedOnMoldes(model).subscribe(result3 => {
      const arr = [];
      result3.forEach(data => {
        const header = {
          'Position': result3.indexOf(data) + 1,
          'AccessoryName': data.accessoryName,
          'Price': data.price
        };
        arr.push(header);
      });
      console.log(arr);
      this.dataSourceForAccessory = new MatTableDataSource(arr);
      this.dataSourceForAccessory.paginator = this.paginator;

    });
    this.orderCreateService.getColorsBasedOnModels(model).subscribe(result4 => {
      result4.forEach(data => {
        console.log(result4.indexOf(data))
        this.colorsList.push({
          'Position': result4.indexOf(data) + 1,
          'code': data.id.seriesCode + '~' + data.id.modelCode + '~' + data.id.colorCode,
          'ColorsName': data.colorName,
          'ColorPrice': data.price,
          'Qty': 1,
          'data': data
        });
      });
    });
    this.orderCreateService.getColorsBasedOnModels(model).subscribe(result4 => {
      const arr = [];
      result4.forEach(data => {
        const header = {
          'Position': result4.indexOf(data) + 1,
          'ColorsName': data.colorName,
          'ColorPrice': data.price,
          'Qty': 1
        };
        arr.push(header);
      });
      console.log(arr);
      this.dataSourceForColor = new MatTableDataSource(arr);
      this.dataSourceForColor.paginator = this.paginator;
    });

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.accselection.selected.length;
    const numRows = this.dataSourceForAccessory.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.accselection.clear() :
      this.dataSourceForAccessory.data.forEach(row => this.accselection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.accselection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  getAccValues() {
    console.log(this.selectedAccessories);
  }
  getColorValues() {
    console.log(this.selectedColors);
  }
  clear() {
    this.TotalPrice = '';
    this.seriesList = [];
    this.modelList = [];
    this.accList = [];
    this.colorsList = [];
    this.selectedAccessories = [];
    this.selectedColors = [];
    this.ngOnInit();
  }
  calculateTotalPrice() {
    this.TotalPrice = 0;
    const foundModel = this.modelList.find(element => element.code == this.selectedModel);
    let accprice = 0;
    this.selectedAccessories.forEach(data => {
      const foundAcc = this.accList.find(element => element.code == data);
      accprice = accprice + foundAcc.Price;
    })
    let colorsPrice = 0;
    this.selectedColors.forEach(data => {
      const foundColor = this.colorsList.find(element => element.code == data)
      colorsPrice = colorsPrice + (foundColor.Qty * foundColor.ColorPrice);
    })
    this.TotalPrice = foundModel.data.modelPrice + accprice + colorsPrice;
  }
  saveOrder() {
    const orderHeader = new OrderHeader();
    const orderHeaderId = new OrderHeaderId();
    const orderDetails = [];
    const ordAccDetails = [];

    orderHeaderId.cmpCode = '5000';
    let x = this.selectedModel.split('~');
    console.log(this.selectedModel);
    orderHeaderId.dealerCode = '5000D01';
    orderHeader.seriesCode = x[0];
    orderHeader.modelCode = x[1];
    console.log(new Date());
    orderHeader.id = orderHeaderId;
    orderHeader.orderDt = new Date();
    this.calculateTotalPrice()
    orderHeader.orderValue = this.TotalPrice;

    this.selectedAccessories.forEach(data => {
      let orderAccDetail = new Orderaccessorydetail();
      let orderAccDetailId = new OrderaccessorydetailId();
      orderAccDetailId.cmpCode = '5000';
      orderAccDetailId.dealerCode = '5000D01';
      let x = data.split('~');
      orderAccDetailId.accessoryCode = x[2];
      orderAccDetail.id = orderAccDetailId;
      ordAccDetails.push(orderAccDetail);
    })
    orderHeader.accDetails = ordAccDetails;

    this.selectedColors.forEach(data => {
      let orderDetail = new Orderdetail();
      let orderDetailId = new OrderdetailId();
      orderDetailId.cmpCode = '5000';
      orderDetailId.dealerCode = '5000D01';
      let x = data.split('~');
      orderDetailId.colorCode = x[2];
      orderDetail.id = orderDetailId;
      const foundColor = this.colorsList.find(element => element.code == data)
      orderDetail.totalOrdQty = foundColor.Qty;
      orderDetail.totalAccQty = this.selectedAccessories.length * foundColor.Qty;
      orderDetail.orderBaseAmount = (this.modelList.find(element => element.code == this.selectedModel).data.modelPrice * foundColor.Qty) + foundColor.ColorPrice;
      let accprice = 0;
      this.selectedAccessories.forEach(data => {
        const foundAcc = this.accList.find(element => element.code == data);
        accprice = accprice + foundAcc.Price;
      })
      orderDetail.orderAccesoryAmount = accprice * orderDetail.totalOrdQty;
      orderDetail.orderTotalAmount = orderDetail.orderBaseAmount + orderDetail.orderAccesoryAmount;
      orderDetails.push(orderDetail);
    })

    orderHeader.ordDetails = orderDetails;

    console.log(orderHeader);
    this.orderCreateService.saveOrders(orderHeader).subscribe(res => {
      if (res.id.orderNo !== null) {
        alert("Order Saved::Order NO::" + res.id.orderNo);
        this.clear();
      }
      else {
        alert("Order Error");
      }

    });
  }
}

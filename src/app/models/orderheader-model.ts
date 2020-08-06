import {OrderHeaderId} from './orderheaderid-model';
import {Orderaccessorydetail} from './orderaccessorydetail-model';
import {Orderdetail} from './orderdetail-model';
export class OrderHeader{

    id : OrderHeaderId;
    seriesCode : String;
    modelCode : String;
    orderDt : Date;
    orderValue :number;
    accDetails :Orderaccessorydetail[];
    ordDetails : Orderdetail[];

}
import {AccessoryId} from "./accessoryid-model"
export class Accessory{
    id : AccessoryId;
    accessoryName : String;
    price : number;
    isSelected : boolean=false;
}
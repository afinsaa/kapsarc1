export class CData {
    id: Number;
    country: String;
    month: String;
    value: Number;

    constructor(id: number, country: String,month: String, value: Number){
        this.id = id;
        this.country = country;
        this.month = month;
        this.value = value;
    }
}
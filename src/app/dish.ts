
export interface Dish{
    name:string;
    kitchen_type:string;
    category:string;
    ingredients: string;
    max_possible:number;
    price:number;
    description:string;
    link:string[];
    rate:{
        count:number;
        total:number;
    }
    comments:{
        title:string,
        description:string,
        date:string
    }[]
}

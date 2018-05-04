export default class Person {
    public name:string;
    public description: string;
    public age:number;
    public movies:string[];
    public era:string;
    public canon:boolean;

    constructor(name?:string, description?:string,age?:number,movies?:string[],era?:string,canon?:boolean) {
        this.name = name;
        this.description = description;
        this.age = age;
        this.movies = movies;
        this.era = era;
        this.canon = canon;
    }
}
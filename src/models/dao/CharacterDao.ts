export class CharacterDao {
    public id:string;
    public name:string;
    public description: string;
    public age:number;
    public movieIds:string[];
    public era:string;
    public canon:boolean;

    constructor(id?:string, name?:string, description?:string,age?:number,movieIds?:string[],era?:string,canon?:boolean) {
        this.id = id;
        this.name = name || "";
        this.description = description || "";
        this.age = age || 0;
        this.movieIds = movieIds || [];
        this.era = era || "";
        this.canon = canon || true;
    }
}
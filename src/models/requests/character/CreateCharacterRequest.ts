export default class CreateCharacterRequest {
    public name:string;
    public age: number;
    public era: string;
    public canon: boolean;
    public movieIds: string[];
    public description: string;

    constructor(name?:string, description?:string, age?:number, movieIds?:string[], era?:string, canon?:boolean){
        this.name = name || "";
        this.description = description || "";
        this.age = age || 0;
        this.movieIds = movieIds || [];
        this.era = era || "";
        this.canon = canon || true;
    }
}
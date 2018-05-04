import {injectable} from "inversify";
import Person from "../models/Person";

@injectable()
export class PersonService {
    private personStorage:Person[] = [
        new Person("Luke Skywalker", "A young farmboy who was destined to be a great jedi master", 20, [], "Original Trilogy", true),
        new Person("Han Solo", "A rugged smuggler ", 30, [], "Original Trilogy", true)

    ];

    public getPeople(): Person[] {
        return this.personStorage;
    }


}
export class Product {
    public name: string;
    public tags: string[];
    public imagePath: string;
    public description: string;
    public id: number;
    public date: Date


constructor(name: string, tags: string[], imagePath: string, description: string, id: number, date: Date) {
    this.name = name;
    this.tags = tags;
    this.imagePath = imagePath;
    this.description = description;
    this.id = id;
    this.date = date
}

}

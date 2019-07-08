export class Product {
    public name: string;
    public tags: string[];
    public imagePath: string;
    public description: string;


constructor(name: string, tags: string[], imagePath: string, description: string) {
    this.name = name;
    this.tags = tags;
    this.imagePath = imagePath;
    this.description = description;
}

}

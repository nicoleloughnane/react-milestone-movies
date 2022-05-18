export class Movie
{
    private id: number = -1;
    private title: string = "";
    private genre: string = "";
    private year_released: number = 1984;
    private rating: number = 100;
    private image: string = "";
    private video: string = "";
    
    constructor(id:number, title:string, genre:string, year_released: number, rating: number, image: string, video: string )
    {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.year_released = year_released;
        this.rating = rating;
        this.image = image;
        this.video = video;
     }

    get Id():number
    {
        return this.id;
    }
    set Id(id:number)
    {
        this.id = id;
    }

    get Genre():string
    {
        return this.genre;
    }
    set Genre(genre:string)
    {
        this.genre = genre;
    }

    get Title():string
    {
        return this.title;
    }
    set Title(title:string)
    {
        this.title = title;
    }

    get Year_Released():number
    {
        return this.year_released;
    }
    set Year_Released(year_released:number)
    {
        this.year_released = year_released;
    }

    get Rating():number
    {
        return this.rating;
    }
    set Rating(rating:number)
    {
        this.rating = rating;
    }
    public get Image(): string 
    {
        return this.image;
    }
    public set Image(value: string) 
    {
        this.image = value;
    }
    public get Video(): string 
    {
        return this.video;
    }
    public set Video(value: string)
    {
        this.video = value;
    }
}
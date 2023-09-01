export class Article {
    id: number = 0
    votes: number
    link: string
    title: string

    constructor(votes: number, title: string, link: string) {
        this.votes = votes || 0
        this.title = title
        this.link = link
    }

    // voteUp(): void {
    //   this.votes++
    // }

    // voteDown(): void {
    //   this.votes--
    // }
}

export interface IMovieSearch {
	readonly title?: string;
	readonly releaseDateBefore: Date;
	readonly releaseDateAfter: Date;
	readonly genre: string;
}

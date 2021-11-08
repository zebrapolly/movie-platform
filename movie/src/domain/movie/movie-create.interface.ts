export interface IMovieCreate {
	readonly title: string;
	readonly synopsis: string;
	readonly releaseDate: Date;
	readonly people: {
		role: { id: string };
		person: { id: string };
	}[];
	readonly genres: { id: string }[];
	readonly userId: string;
}

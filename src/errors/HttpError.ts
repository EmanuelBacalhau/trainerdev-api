export class HttpError {
	constructor(
		public readonly message: string,
		public readonly status: number
	) {}
}

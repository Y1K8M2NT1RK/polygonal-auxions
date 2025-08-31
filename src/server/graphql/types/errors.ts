import { builder } from '../builder';
import { ZodError, ZodFormattedError } from 'zod';

export class CsrfError extends Error {
	constructor(
		message = 'セッションが無効または期限切れです。ページを再読み込みして再試行してください。'
	) {
		super(message);
		this.name = 'CsrfError';
	}
}

const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
	fields: (t) => ({
		message: t.exposeString('message'),
	}),
});

function flattenErrors(error: ZodFormattedError<unknown>, path: string[]) {
	const errors = (error as any)._errors.map((message: string) => ({ path, message }));
	Object.keys(error).forEach((key) => {
		if (key !== '_errors') {
			errors.push(
				...flattenErrors(
					(error as any)[key] as ZodFormattedError<unknown>,
					[...path, key]
				)
			);
		}
	});
	return errors;
}

const ZodFieldError = builder
	.objectRef<{ message: string; path: string[] }>('ZodFieldError')
	.implement({
		fields: (t) => ({
			message: t.exposeString('message'),
			path: t.exposeStringList('path'),
		}),
	});

builder.objectType(ZodError, {
	name: 'ZodError',
	interfaces: [ErrorInterface],
	fields: (t) => ({
		fieldErrors: t.field({
			type: [ZodFieldError],
			resolve: (err) => flattenErrors(err.format(), []),
		}),
	}),
});

builder.objectType(CsrfError, {
	name: 'CsrfError',
	interfaces: [ErrorInterface],
	fields: () => ({}),
});
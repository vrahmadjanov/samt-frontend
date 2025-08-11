export class ApiError extends Error {
  constructor(message, { code = 'UNKNOWN', fields, raw } = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    if (fields) this.fields = fields;
    this.raw = raw;
  }
}

export const createApiError = (message, options = {}) => new ApiError(message, options);



export function httpError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

export const errors = {
  badRequest: (msg = "Bad Request") => httpError(400, msg),
  unauthorized: (msg = "Unauthorized") => httpError(401, msg),
  forbidden: (msg = "Forbidden") => httpError(403, msg),
  notFound: (msg = "Not Found") => httpError(404, msg),
  conflict: (msg = "Conflict") => httpError(409, msg),
};

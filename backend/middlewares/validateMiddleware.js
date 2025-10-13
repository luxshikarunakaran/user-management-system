import { validationResult } from "express-validator";

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({
      success: false,
      error: "Validation failed",
      details: errors.array(),
    });
  next();
}

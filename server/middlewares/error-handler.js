const createError = (code, message, details) => {
  return {
    error: {
      code,
      message,
      details: details ?? []
    }
  }
}

export const errorHandler = (err, _req, res, _next) => {
  const { code, message, details, stack, isAxiosError, response } = err
  console.error({
    ...createError(code, message, details),
    stack,
    response: isAxiosError ? response?.data : null,
  }, 'Error encountered')

  if (code && typeof code === 'string') {
    if (code.includes('Unprocessable')) {
      return res.status(422).json(createError(code, message, details))
    }

    if (code.includes('AlreadyExists')) {
      return res.status(422).json(createError(code, message, details))
    }

    if (code.includes('Unauthorized')) {
      return res.status(401).json(createError(code, message, details))
    }

    if (code.includes('Forbidden')) {
      return res.status(403).json(createError(code, message, details))
    }

    if (code.includes('BadRequest')) {
      return res.status(400).json(createError(code, message, details))
    }

    if (code.includes('NotFound')) {
      return res.status(404).json(createError(code, message, details))
    }
  }

  return res.status(500).json(createError('InternalServerError', message, details))
}

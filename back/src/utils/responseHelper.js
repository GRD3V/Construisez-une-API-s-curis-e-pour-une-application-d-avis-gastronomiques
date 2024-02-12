export function resBadRequest(response, data = "bad request") {
  response.status(400).json({ message: data });
}

export function resConflict(response, data = "conflict") {
  response.status(409).json({ message: data });
}

export function resNotFound(response, data = "not found") {
  response.status(404).json({ message: data });
}

export function resServerError(response, data = "server error") {
  response.status(500).json({ message: data });
}

export function resUnauthorized(response, data = "unauthorized") {
  response.status(401).json({ message: data });
}

export function resForbidden(response, data = "forbidden") {
  response.status(403).json({ message: data });
}

const isEmpty = (value) => value === undefined || value === null || value === "";

export const validateNoteCreate = (req, res, next) => {
  const { title, description } = req.body;

  if (isEmpty(title) || title.length < 3) {
    return res.status(400).json({ error: "Title inválido" });
  }

  if (isEmpty(description) || description.length < 6) {
    return res.status(400).json({ error: "Description inválida" });
  }

  next();
};

export const validateNoteUpdate = (req, res, next) => {
  const { title, description } = req.body;

  const hasAtLeastOne = !isEmpty(title) || !isEmpty(description);
  if (!hasAtLeastOne) {
    return res.status(400).json({ error: "Debe enviar al menos un campo para actualizar" });
  }

  if (title !== undefined && title.length < 3) {
    return res.status(400).json({ error: "Title inválido" });
  }

  if (description !== undefined && description.length < 6) {
    return res.status(400).json({ error: "Description inválida" });
  }

  next();
};

const isEmpty = (value) => value === undefined || value === null || value === "";

export const validateNoteCreate = (req, res, next) => {
  const { title, description, email, phone } = req.body;

  if (isEmpty(title) || title.length < 3) {
    return res.status(400).json({ error: "Title inválido" });
  }

  if (isEmpty(description) || description.length < 6) {
    return res.status(400).json({ error: "Description inválida" });
  }

  if (isEmpty(email) || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (isEmpty(phone) || !/^\+?[0-9\s-]{8,20}$/.test(phone)) {
    return res.status(400).json({ error: "Phone inválido" });
  }

  next();
};

export const validateNoteUpdate = (req, res, next) => {
  const { title, description, email, phone } = req.body;

  const hasAtLeastOne = !isEmpty(title) || !isEmpty(description) || !isEmpty(email) || !isEmpty(phone);
  if (!hasAtLeastOne) {
    return res.status(400).json({ error: "Debe enviar al menos un campo para actualizar" });
  }

  if (title !== undefined && title.length < 3) {
    return res.status(400).json({ error: "Title inválido" });
  }

  if (description !== undefined && description.length < 6) {
    return res.status(400).json({ error: "Description inválida" });
  }

  if (email !== undefined && !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (phone !== undefined && !/^\+?[0-9\s-]{8,20}$/.test(phone)) {
    return res.status(400).json({ error: "Phone inválido" });
  }

  next();
};

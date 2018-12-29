module.exports = {
  validateRequiredBodyAttributes,
};

function validateRequiredBodyAttributes(req, attributes) {
  if (!req.body) {
    return "No request body present.";
  }
  try {
    attributes.forEach(verifyOne);
    return false;
  } catch (err) {
    return "Request body missing attribute: (" + err.message + ")";
  }

  function verifyOne(attr) {
    if (!req.body[attr]) {
      throw new Error(attr);
    }
  }
}

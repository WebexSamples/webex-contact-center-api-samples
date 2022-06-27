import auth from "basic-auth";

const check = (name, pass) => {
  let valid = true;
  (valid = name), process.env.NAME && valid;
  (valid = pass), process.env.PASS && valid;

  return valid;
};

export const basicAuth = (request, response, next) => {
  const credentials = auth(request);
  if (credentials && check(credentials.name, credentials.pass)) {
    return next();
  }

  response.set("WWW-Authenticate", 'Basic realm="my website"');
  return response.status(401).send("🙅🏻 nope");
};

const Serv = require('../database/dbService');

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

const getProd = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Serv.find(request.query).select('-_id -__v'));
  });
};

const getProdSKU = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Serv.findOne({ sku: request.params.sku }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

const postProd = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new Serv(request.body).save();
    response.sendStatus(201);
  });
};

const deleteProd = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Serv.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
  });
};

const deleteProdSKU = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Serv.deleteOne({
      sku: request.params.sku,
    })).deletedCount > 0 ? 200 : 404);
  });
};

const putProdSKU = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  await doActionThatMightFailValidation(request, response, async () => {
    await Serv.findOneAndReplace({ sku }, product, {
      upsert: true,
    });
    response.sendStatus(200);
  });
};

const patchProdSKU = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  delete product.sku;
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await Serv
      .findOneAndUpdate({ sku }, product, {
        new: true,
      })
      .select('-_id -__v');
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};

const getUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await Serv.find(request.query).select('-_id -__v'));
  });
};

const getUserSSN = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Serv.findOne({ ssn: request.params.ssn }).select('-_id -__v');
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

const postUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await new Serv(request.body).save();
    response.sendStatus(201);
  });
};

const deleteUser = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Serv.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
  });
};

const deleteUserSSN = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Serv.deleteOne({
      ssn: request.params.ssn,
    })).deletedCount > 0 ? 200 : 404);
  });
};

const putUserSSN = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  user.ssn = ssn;
  await doActionThatMightFailValidation(request, response, async () => {
    // eslint-disable-next-line no-undef
    await Serv.findOneAndReplace({ ssn }, user, {
      upsert: true,
    });
    response.sendStatus(200);
  });
};

const patchUserSSN = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  delete user.ssn;
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await Serv
      .findOneAndUpdate({ ssn }, user, {
        new: true,
      })
      .select('-_id -__v');
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};

module.exports = {
  getProd,
  getProdSKU,
  postProd,
  deleteProd,
  deleteProdSKU,
  putProdSKU,
  patchProdSKU,
  getUser,
  getUserSSN,
  postUser,
  deleteUser,
  deleteUserSSN,
  putUserSSN,
  patchUserSSN,
};

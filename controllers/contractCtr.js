/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const Contract = mongoose.model('contract');

exports.getContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.find({ _user: req.user.id }, { __v: 0 });
    return res.json(contracts);
  } catch (err) {
    res.status(422).send(err);
  }
};

exports.addContract = async (req, res) => {
  const { name } = req.body;
  try {
    const contract = new Contract({
      name,
      _user: req.user.id,
    });

    const newContract = await contract.save();
    if (newContract) {
      return res.json(newContract);
    }
    return res.status(404).json({ error: 'Fail to add new contract' });

    // res.json(newContract);
  } catch (error) {
    return res.status(404).json({ error: 'Fail to add new contract' });
  }
};

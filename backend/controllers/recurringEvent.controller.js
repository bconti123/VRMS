const { RecurringEvent } = require('../models');
const expectedHeader = process.env.CUSTOM_REQUEST_HEADER;

const RecurringEventController = {};

// // Add User with POST
RecurringEventController.create = async (req, res) => {
  const { headers } = req;

  if (headers['x-customrequired-header'] !== expectedHeader) {
    return res.sendStatus(403);
  }

  try {
    const rEvent = await RecurringEvent.create(req.body);
    return res.status(200).send(rEvent);
  } catch (err) {
    return res.sendStatus(400);
  }
};

// Update Recurring Event using PATCH
RecurringEventController.update = async (req, res) => {
  const { headers } = req;
  const { RecurringEventId } = req.params;

  if (headers['x-customrequired-header'] !== expectedHeader) {
    return res.sendStatus(403);
  }

  const filter = { _id: RecurringEventId };
  const update = req.body;

  try {
    const uEvent = await RecurringEvent.findOneAndUpdate(filter, update, { new: true });
    return res.status(200).send(uEvent);
  } catch (err) {
    return res.sendStatus(400);
  }
};

// Delete Recurring Event
RecurringEventController.destroy = async (req, res) => {
  const { RecurringEventId } = req.params;

  try {
    const rEvent = await RecurringEvent.findByIdAndDelete(RecurringEventId);
    return res.status(200).send(rEvent);
  } catch (err) {
    return res.sendStatus(400);
  }
};

module.exports = RecurringEventController;

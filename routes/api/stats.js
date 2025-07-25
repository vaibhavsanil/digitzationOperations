const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const StructBook = require('../../models/StructureBook');
const SectionBook = require('../../models/SectionalMetadata');

router.get('/all', auth, (req, res) => {
  let stats = {};
  let error = {};
  StructBook.count({}, function (err, count) {
    if (err) {
      error.msg = 'There was a failure while counting book';
      error.err = err;
      return res.status(400).json(err);
    } else {
      stats.bookCount = count;
      SectionBook.count({}, function (err, count) {
        if (err) {
          error.msg = 'There was a failure while counting sections';
          error.err = err;
          return res.status(400).json(err);
        } else {
          stats.sectionCount = count;
          console.log('The value of stats', stats);
          return res.status(200).json(stats);
        }
      });
    }
  });
});

module.exports = router;

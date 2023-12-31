const express = require ('express');
const router = express.Router ();
const auth = require ('../../middleware/auth');
const Profile = require ('../../models/Profile');
const User = require ('../../models/User');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get ('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne ({
      user: req.user.id,
    }).populate ('user', [
      'firstName',
      'middleName',
      'lastName',
      'dateOfBirth',
      'coinBalance',
      'email',
    ]);

    if (!profile) {
      return res
        .status (400)
        .json ({message: 'There is no profile for this user'});
    }

    res.json (profile);
  } catch (err) {
    res.status (500).json ({message: err.message});
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post ('/', auth, async (req, res) => {
  const {
    feedback,
    visibleInfo: {
      name,
      dob,
      totalBalance,
      activityHistory,
      dataForage,
      experimental,
    },
  } = req.body;

  const profileFields = {visibleInfo: {}};
  profileFields.user = req.user.id;
  profileFields.feedback = feedback;
  profileFields.visibleInfo.name = name;
  profileFields.visibleInfo.dob = dob;
  profileFields.visibleInfo.totalBalance = totalBalance;
  profileFields.visibleInfo.activityHistory = activityHistory;
  profileFields.visibleInfo.dataForage = dataForage;
  profileFields.visibleInfo.experimental = experimental;

  try {
    let profile = await Profile.findOne ({user: req.user.id});

    if (profile) {
      //Update
      profile = await Profile.findOneAndUpdate (
        {user: req.user.id},
        {$set: profileFields},
        {new: true}
      );

      return res.json (profile);
    }

    // Create
    profile = new Profile (profileFields);

    await profile.save ();

    res.status (201).json (profile);
  } catch (err) {
    res.status (500).json ({message: err.message});
  }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get ('/', async (req, res) => {
  try {
    const profiles = await Profile.find ().populate ('user', [
      'firstName',
      'middleName',
      'lastName',
    ]);

    res.status (200).json ({
      success: true,
      data: profiles,
    });
  } catch (err) {
    res.status (500).json ({message: err.message});
  }
});

// @route   GET api/profile/user/:email
// @desc    Get profile by user email
// @access  Public
router.get ('/user/:user_email', async (req, res) => {
  try {
    const profile = await Profile.findOne ({
      user: req.params.user_email,
    }).populate ('user', ['firstName', 'middleName', 'lastName', 'email']);

    if (!profile)
      return res
        .status (400)
        .json ({message: 'There is no profile for this user.'});

    res.status (200).json ({
      success: true,
      data: profile,
    });
  } catch (err) {
    res.status (500).json ({message: err.message});
  }
});

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private
router.delete ('/', auth, async (req, res) => {
  try {
    //Remove profile
    await Profile.findOneAndRemove ({user: req.user.id});
    //Remove user
    await User.findOneAndRemove ({_id: req.user.id});

    res.json ({message: 'Account deleted.'});
  } catch (err) {
    res.status (500).json ({message: err.message});
  }
});

// @route   PUT api/profile/contacts
// @desc    Update user contact list
// @access  Private
router.post('/contacts', auth, async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    type
  } = req.body;

  const newContact = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    type: type
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.contacts.unshift(newContact);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/profile/transfer/:user_id
// @desc    Transfer intangible coins
// @access  Private
router.post ('/transfer/:user_id', auth, async (req, res) => {
  const {type, amount, reason, anonymous} = req.body;

  /*if (type == null || amount == null || reason == null) {
    return res
      .status (400)
      .json ({message: 'Please fill out all required fields.'});
  }*/

  let vibe = "";

  if (type == true) {
    vibe = "Positive";
  } else if (type == false) {
    vibe = "Negative";
    }

  const transferObject = {
    type: vibe,
    amount: amount,
    reason: reason,
    senderId: 'anonymous',
    senderName: 'anonymous',
    receiverId: req.params.user_id,
    receiverName: '',
    timestamp: Date (),
  };

  try {
    const receiver = await Profile.findOne ({
      user: req.params.user_id,
    }).populate ('user', [
      'firstName',
      'middleName',
      'lastName',
      'coinBalance',
    ]);

    const profile = await Profile.findOne ({
      user: req.user.id,
    }).populate ('user', [
      'firstName',
      'middleName',
      'lastName',
      'coinBalance',
    ]);

    if (transferObject.amount > 2) {
      return res
        .status (400)
        .json ({message: 'Coin transfer cannot exceed 2 coins.'});
    }

    await User.updateOne ({_id: req.user.id}, {$inc: {coinBalance: -amount}});

    if (type == true) {
      await User.updateOne (
        {_id: req.params.user_id},
        {$inc: {coinBalance: amount}}
      );
    } else if (type == false) {
      await User.updateOne (
        {_id: req.params.user_id},
        {$inc: {coinBalance: -amount}}
      );
    }

    if (anonymous == false) {
      transferObject.senderId = req.user.id;
      transferObject.senderName = profile.user.firstName;
    }

    transferObject.receiverName = receiver.user.firstName;

    profile.transactionHistory.unshift (transferObject);

    receiver.transactionHistory.unshift (transferObject);

    await profile.save ();

    await receiver.save ();

    res.status (200).json (profile);
  } catch (err) {
    res.status (500).json ({message: err.message});
  }
});

module.exports = router;

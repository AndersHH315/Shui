const router = require('express').Router();
const User = require('../Db/models/User');
const Stream = require('../Db/models/Stream');
const AddStream = require('../Db/models/AddStream');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    
    const usernameExist = await User.findOne({username: req.body.username});
    if(usernameExist) {
        console.log('Username exists already');
        return res.status(400).json({error: 'Username exists already'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPssword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password:hashPssword
    });

    try {
        const saveUser = await user.save();
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.json({user: user._id});
        console.log(token);
    } catch (err){
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    
    const user = await User.findOne({username: req.body.username});
    if(!user) {
        console.log('User is not found');
        return res.status(400).json({error: 'User is not found'});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword)  {
        console.log('Invalid password');
        return res.status(400).json({error: 'Invalid password'});
    }

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({token: token});
    console.log(token);
});

router.post('/streams', async (req, res) => {

    const streamExist = await Stream.findOne({title: req.body.title});
    if(streamExist) {
        console.log('Title already exist!');
        res.status(400).json({error: 'Title already exist!'});
    }

    const stream = new Stream({
        description: req.body.description,
        title: req.body.title
    });

    try {
        const saveStream = await stream.save();
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/addstreams', async (req, res) => {

    const addedStreamExist = await AddStream.findOne({_id: User._id, _id: Stream._id}, process.env.TOKEN_SECRET);
    if(addedStreamExist) {
        console.log('You already following that stream');
        res.status(400).json({error: 'You already following that stream'});
    }

    const addstream = new AddStream({
        streamID: Stream._id(ObjectId),
        userID: User._id(ObjectId)
    });

    try {
        const saveAddedStream = await addstream.save();
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/getstreams', async (req, res) => {

    const getExistingStreams = await Stream.findOne({_id: Stream._id}, process.env.TOKEN_SECRET);
});

module.exports = router;

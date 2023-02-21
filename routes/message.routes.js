const express = require("express");
const router = express.Router();

const Company = require("../models/Company.model.js");
const Dev = require("../models/Dev.model.js");
const Message = require("../models/Message.model.js");

router.get('/', async (req, res, next) => {
  try {
    let user;
    if (req.session.User.role === "dev") {
      user = await Dev.findById(req.session.User._id);
      const messages = await Message.find({
        $or: [
          { $and: [{ transmitter: user }] },
          { $and: [{ receiver: user }] },
        ],
      }).populate('transmitter receiver');
      
      let openMessages = [];
  
      messages.forEach( each => {
        if (each.receiver.role === 'company') {
          openMessages.push({
            id: each.receiver._id,
            name: each.receiver.companyName,
            img: each.receiver.img
          });
        };
        if (each.transmitter.role === 'company') {
          openMessages.push({
            id: each.transmitter._id,
            name: each.transmitter.companyName,
            img: each.transmitter.img
          });
        };
      });
  
      let msgsFilter = openMessages.filter((obj, index, self) => {
        return index === self.findIndex( (o) => {
          return JSON.stringify(o.id) === JSON.stringify(obj.id) && o.name === obj.name
        });
      });
  
      res.render('message/index.hbs', {
        openChats: msgsFilter
      });
    };
    if (req.session.User.role === "company") {
      user = await Company.findById(req.session.User._id);
      const messages = await Message.find({
        $or: [
          { $and: [{ transmitter: user }] },
          { $and: [{ receiver: user }] },
        ],
      }).populate('transmitter receiver');
      
      let openMessages = [];
  
      messages.forEach( each => {
        if (each.receiver.role === 'dev') {
          openMessages.push({
            id: each.receiver._id,
            name: each.receiver.name,
            secondName: each.receiver.secondName,
            img: each.receiver.img
          });
        };
        if (each.transmitter.role === 'dev') {
          openMessages.push({
            id: each.transmitter._id,
            name: each.transmitter.name,
            secondName: each.transmitter.secondName,
            img: each.transmitter.img
          });
        };
      });
  
      let msgsFilter = openMessages.filter((obj, index, self) => {
        return index === self.findIndex( (o) => {
          return JSON.stringify(o.id) === JSON.stringify(obj.id) && o.name === obj.name
        });
      });
  
      res.render('message/index.hbs', {
        openChats: msgsFilter
      });
    };
    
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {

    const { id } = req.params;
    if (req.session.User.role === "dev") {
      let company = await Company.findById(id);
      let user = await Dev.findById(req.session.User._id);

      const messages = await Message.find({
        $or: [
          { $and: [{ transmitter: user }, { receiver: company }] },
          { $and: [{ transmitter: company }, { receiver: user }] },
        ],
      }).populate("transmitter");

      let messagesClon = JSON.parse(JSON.stringify(messages));
      messagesClon.forEach (each => {
        
        if (req.session.User._id == each.transmitter._id) {
          each.isTransmitter = true
        } else {
          each.isTransmitter = false
        }
      });
      res.render("message/messages.hbs", {
        messages: messagesClon,
        idMsgView: id,
        isDev: true,
      });

    } else if (req.session.User.role === "company") {
      let user = await Dev.findById(id);
      let company = await Company.findById(req.session.User._id);

      const messages = await Message.find({
        $or: [
          { $and: [{ transmitter: user }, { receiver: company }] },
          { $and: [{ transmitter: company }, { receiver: user }] },
        ],
      }).populate("transmitter");

      let messagesClon = JSON.parse(JSON.stringify(messages));
      messagesClon.forEach (each => {
        
        if (req.session.User._id == each.transmitter._id) {
          each.isTransmitter = true
        } else {
          each.isTransmitter = false
        }
      });

      res.render("message/messages.hbs", {
        messages: messagesClon,
        idMsgView: id,
        isDev: false,
      });
    }

  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id } = req.params;

    if (req.session.User.role === "dev") {
      if (message) {
        await Message.create({
          message,
          receiver: id,
          transmitter: req.session.User._id,
          transmitterModel: "Dev",
          receiverModel: "Company",
        });
      }

      res.redirect(`/message/${id}`);
    } else if (req.session.User.role === "company") {
      if (message) {
        await Message.create({
          message,
          receiver: id,
          transmitter: req.session.User._id,
          transmitterModel: "Company",
          receiverModel: "Dev",
        });
      }

      res.redirect(`/message/${id}`);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:idForMsg/edit', async (req, res, next) => {
  try {
    const { msgId, updateMsg } = req.body;
    const { idForMsg } = req.params;
    
    const message = await Message.findById(msgId);
    if (req.session.User._id == message.transmitter) {
      await Message.findByIdAndUpdate(msgId, {
        message: updateMsg
      })
    }
    res.redirect(`/message/${idForMsg}`);
  } catch (error) {
    next(error)
  }
});

router.post("/:idForMsg/delete", async (req, res, next) => {
  try {
    const { messageId } = req.body;
    const { idForMsg } = req.params;

    //Validation of true transmitter
    const message = await Message.findById(messageId);
    if (req.session.User._id == message.transmitter) { 
      await Message.findByIdAndDelete(messageId);
    }

    res.redirect(`/message/${idForMsg}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

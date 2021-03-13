const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const badgeSchema = new Schema({
    badgeName: { type: String, required: true },
    badgeType: { type: String, required: true },
    disabled: Boolean
});

const Badges = mongoose.model('Badge', badgeSchema);

module.exports = Badges;
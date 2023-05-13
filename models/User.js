const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
            validate: {
                validator: function(v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                messaage: props => `${props.value} is not a valid email address!`
            },
            required: [true, 'User email required']
        },
        thoughts: [thoughtSchema],
        friends: [userSchema],
    }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
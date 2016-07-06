// jshint node: true
'use strict';

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true,
    max: 90,
    min: -90
  },
  longitude: {
    type: Number,
    required: true,
    max: 180,
    min: -180
  },
  country: {
    type: String,
  }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

placeSchema.virtual('isNorthernHemisphere').get(function() {
  if(this.latitude > 0){
    return true;
  } else {
    return false;
  }
});

placeSchema.virtual('isWesternHemisphere').get(function() {
  if(this.longitude < 0){
    return true;
  } else {
    return false;
  }
});

// model
let Place = mongoose.model('Place', placeSchema);

module.exports = Place;

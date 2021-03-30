/*
  Reference:
  Matt Tytel, lissa, (2013), GitHub repository, https://github.com/mtytel/lissa
  This was used for inspiration and guidance
 */

lissa.utils ={};

lissa.utils.random_int = function(low, high) {
  return Math.floor((high - low + 1) * Math.random()) + low;
};
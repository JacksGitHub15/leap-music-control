lissa.utils ={};

lissa.utils.random_int = function(low, high) {
  return Math.floor((high - low + 1) * Math.random()) + low;
};
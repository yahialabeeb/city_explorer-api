'use strict';

class Cache {
  constructor() { 
    this.datacached= []
    this.timeStamp = Date.now();
  }
}

module.exports=Cache;
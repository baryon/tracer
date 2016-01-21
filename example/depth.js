"use strict";
var config = {
	strategy : 'console',
	setting : {
		level : 'log',
		inspectOpt : {
			showHidden : true, //the object's non-enumerable properties will be shown too
			depth : null
		}
	}
};


var obj =  {Request: 
	 [ { IsValid: [ 'True' ],
			ItemSearchRequest: 
				[ { ResponseGroup: [ 'Small', 'OfferSummary' ],
						Sort: [ 'salesrank' ],
						SearchIndex: [ 'DVD']
					}
				]
		 } ] };

var logger = require('tracer').console();
logger.log(obj);
logger.log("%s", obj);
logger.log("%t", obj);

// 2013-09-30T04:30:44.912Z <log> depth.js:23 (Object.<anonymous>) { Request: [ { IsValid: [Object], ItemSearchRequest: [Object] } ] }


var logger = require('tracer')[config.strategy](config.setting);
logger.log(obj);
// 
// 2013-09-30T04:30:44.927Z <log> depth.js:26 (Object.<anonymous>) { Request:
//    [ { IsValid: [ 'True', [length]: 1 ],
//        ItemSearchRequest:
//         [ { ResponseGroup: [ 'Small', 'OfferSummary', [length]: 2 ],
//             Sort: [ 'salesrank', [length]: 1 ],
//             SearchIndex: [ 'DVD', [length]: 1 ] },
//           [length]: 1 ] },
//      [length]: 1 ] }

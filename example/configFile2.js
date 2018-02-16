"use strict";

module.exports = {
    format : [
              "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
              {
                  error : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
              }	
    ],
    dateformat : "HH:MM:ss.L",
    preprocess :  function(data){
        data.title = data.title.toUpperCase();
    }
}
'use strict'

$(document).ready(() => {

    $('#pin').on('click', () => {

    if(pinIsDown){
        turnDialUP();
        console.log('moved-up')
    } else if (pinIsDown !== true) {
        turnDialDOWN();
        console.log('moved-down')
    }
        })

})
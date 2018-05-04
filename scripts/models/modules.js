'use strict'

$(document).ready(() => {

    $('#pin').css( 'cursor', 'pointer' );
    $('#pinLeft').css( 'cursor', 'pointer' );

    $('#pin').on('click', () => {

        if(pinIsDown){
            turnDialUP();
            console.log('moved-up')
        } else if (pinIsDown !== true) {
            turnDialDOWN();
            console.log('moved-down')
        }
            })

    $('#pinLeft').on('click', () => {

        if(pinIsDown){
            turnDialUP();
            console.log('moved-up')
        } else if (pinIsDown !== true) {
            turnDialDOWN();
            console.log('moved-down')
        }
            })

})
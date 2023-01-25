/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryBalanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idBalance + '-dataEntryBalanceController',
    url: CONTEXTPATH + '/SalesReport',
    paramsBalance: {},
    /**
     * Constructor
     */
    init: function(view) {

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */

    afterRender: function() {
        try{
            this.getDataInputs();
        }
        catch(ex){
            window.location.reload();
        }
    },
    OnBeforeShow: function () {
        prototype.idBalance = 'DataEntryBalance';
    },
    getDataInputs: function() {
        var p = this.view.params;
        var IN_AIRLIN = p.IN_AIRLIN;
        var IN_CIA = p.IN_CIA;
        var IN_FORMA = p.IN_FORMA;
        var IN_SERIE = p.IN_SERIE;
        var A720SEQ = p.A720SEQ;

        paramsBalance = {
            IN_AIRLIN: IN_AIRLIN,
            IN_CIA: IN_CIA,
            IN_FORMA: IN_FORMA,
            IN_SERIE: IN_SERIE,
            A1730SQ720: A720SEQ
        };
        console.log('prototype.idBalance:'+prototype.idBalance);
        Ext.Ajax.request({
            url: prototype.url + '/loadTicket_Balance',
            method: 'POST',
            timeout: 60000000,
            params: paramsBalance,
            beforerequest: Ext.getCmp(prototype.idBalance + '-dataEntryBalance').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstTKT_Balance = res.lstTKT_Balance;
                if(lstTKT_Balance.length > 0){
                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstTKT_Balance,
                        autoLoad: true
                    });
                    var file = lstTKT_Balance[0];
                    var grid = Ext.getCmp(prototype.idBalance + '-det-gridDataTktBalance');
                    grid.columns.forEach( function( col ) {
                       if( ( col.id === "Code1" ) || ( col.id === "PFC1" ) || ( col.id === "Tax1" ) ) {
                           if(file.CANTIDAD > 0){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code2" ) || ( col.id === "PFC2" ) || ( col.id === "Tax2" ) ) {
                           if(file.CANTIDAD > 1){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code3" ) || ( col.id === "PFC3" ) || ( col.id === "Tax3" ) ) {
                           if(file.CANTIDAD > 2){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code4" ) || ( col.id === "PFC4" ) || ( col.id === "Tax4" ) ) {
                           if(file.CANTIDAD > 3){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code5" ) || ( col.id === "PFC5" ) || ( col.id === "Tax5" ) ) {
                           if(file.CANTIDAD > 4){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code6" ) || ( col.id === "PFC6" ) || ( col.id === "Tax6" ) ) {
                           if(file.CANTIDAD > 5){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code7" ) || ( col.id === "PFC7" ) || ( col.id === "Tax7" ) ) {
                           if(file.CANTIDAD > 6){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code8" ) || ( col.id === "PFC8" ) || ( col.id === "Tax8" ) ) {
                           if(file.CANTIDAD > 7){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code9" ) || ( col.id === "PFC9" ) || ( col.id === "Tax9" ) ) {
                           if(file.CANTIDAD > 8){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code10" ) || ( col.id === "PFC10" ) || ( col.id === "Tax10" ) ) {
                           if(file.CANTIDAD > 9){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code11" ) || ( col.id === "PFC11" ) || ( col.id === "Tax11" ) ) {
                           if(file.CANTIDAD > 10){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code12" ) || ( col.id === "PFC12" ) || ( col.id === "Tax12" ) ) {
                           if(file.CANTIDAD > 11){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code13" ) || ( col.id === "PFC13" ) || ( col.id === "Tax13" ) ) {
                           if(file.CANTIDAD > 12){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code14" ) || ( col.id === "PFC14" ) || ( col.id === "Tax14" ) ) {
                           if(file.CANTIDAD > 13){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code15" ) || ( col.id === "PFC15" ) || ( col.id === "Tax15" ) ) {
                           if(file.CANTIDAD > 14){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code16" ) || ( col.id === "PFC16" ) || ( col.id === "Tax16" ) ) {
                           if(file.CANTIDAD > 15){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code17" ) || ( col.id === "PFC17" ) || ( col.id === "Tax17" ) ) {
                           if(file.CANTIDAD > 16){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code18" ) || ( col.id === "PFC18" ) || ( col.id === "Tax18" ) ) {
                           if(file.CANTIDAD > 17){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code19" ) || ( col.id === "PFC19" ) || ( col.id === "Tax19" ) ) {
                           if(file.CANTIDAD > 18){
                               col.setVisible( true );
                           }
                       }
                       else if( ( col.id === "Code20" ) || ( col.id === "PFC20" ) || ( col.id === "Tax20" ) ) {
                           if(file.CANTIDAD > 19){
                               col.setVisible( true );
                           }
                       }
                       else{
                          if(file.CANTIDAD > 20){
                              if( col.id === "Indicator" ){
                                  col.setVisible( true );
                              }
                          } 
                       }
                    });
                }else{
                    global.Msg({msg: 'Data not found.'});
                }
                Ext.getCmp(prototype.idBalance + '-det-gridDataTktBalance').bindStore(storeData);
                Ext.getCmp(prototype.idBalance + '-dataEntryBalance').unmask('Loading...', '');
            }
        });
 }
});



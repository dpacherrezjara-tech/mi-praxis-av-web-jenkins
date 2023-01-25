/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : SSIMComplementaryFilesController                  *                          
 * Created on : 16/02/2018, 09:49:15                              *               
 * Author     : Gregory Sánchez (gsanchez)                        *           
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

Ext.define('Ext.Praxis.controller.flown.SSIMComplementaryFiles.DataEntrySSIMComplementaryFilesController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySSIMComplementaryFilesController',
    searchParams: {},
    ciudades: {},
    aerolineas: {},
    beanTMP: {},

    init: function(view){
        var me = this;
        prototype.id = 'SSIMComplementaryFilesForm';
        prototype.id01 = 'DataEntrySSIMComplementaryFilesForm';
        prototype.url = CONTEXTPATH + '/SSIMComplementaryFiles';
        prototype.widthContenedor = 1400;
        prototype.widthGrid = 835;
        prototype.heightGrid = 529;
        
    },

    afterRender: function(){
        var p = this.view.params;
        
        switch( p.action ){
            case 'I':
                Ext.getCmp(prototype.id01+'-btn-save').show();
                Ext.getCmp(prototype.id01+'-btn-update').hide();
                Ext.getCmp(prototype.id01+'-btn-delete').hide();
                Ext.getCmp(prototype.id01+'-btn-cancel').show();
                Ext.getCmp(prototype.id01+'-txtA1707-NSEQ').focus();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id01+'-btn-save').hide();
                Ext.getCmp(prototype.id01+'-btn-update').show();
                Ext.getCmp(prototype.id01+'-btn-delete').show();
                Ext.getCmp(prototype.id01+'-btn-cancel').show();
                Ext.getCmp(prototype.id01+'-txtA1707-NSEQ').setEditable(false);
                Ext.getCmp(prototype.id01+'-txtA1707-NFLIGHT').setEditable(false);
                Ext.getCmp(prototype.id01+'-txtA1707-CDEPART').setEditable(false);
                Ext.getCmp(prototype.id01+'-txtA1707-CARRIVA').setEditable(false);
                Ext.getCmp(prototype.id01+'-txtA1707-TOPER').setEditable(false);
//                Ext.getCmp(prototype.id01+'-txtA1707-CARRIER').focus();
                break;
        }
        // global.AccessControlMaganer();
    },

    getDataInputs: function(){
        var p = this.view.params;
        rec = p.rec;
        Ext.getCmp(prototype.id01+'-txtA1707-NSEQ').setValue(rec.get('NSEQ'));
        Ext.getCmp(prototype.id01+'-txtA1707-NFLIGHT').setValue(rec.get('NFLIGHT'));
        Ext.getCmp(prototype.id01+'-txtA1707-CDEPART').setValue(rec.get('CDEPART'));
//        Ext.getCmp(prototype.id01+'-CDEPART-NAME').setValue(rec.get('strCDEPART'));
        Ext.getCmp(prototype.id01+'-txtA1707-CARRIVA').setValue(rec.get('CARRIVA'));
//        Ext.getCmp(prototype.id01+'-CARRIVA-NAME').setValue(rec.get('strCARRIVA'));
        
        Ext.getCmp(prototype.id01+'-txtA1707-CARRIER').setValue(rec.get('CARRIER'));
//        Ext.getCmp(prototype.id01+'-CARRIER-NAME').setValue(rec.get('CARRIVA'));
//        Ext.getCmp(prototype.id01+'-txtA1707-TOPER').setValue(rec.get('TOPER'));
        Ext.getCmp(prototype.id01+'-TOPER-NAME').setData(rec.get('TOPER'));
        Ext.getCmp(prototype.id01+'-txtA1707-LEG').setValue(rec.get('LEG'));
        Ext.getCmp(prototype.id01+'-txtA1707-FREQ').setValue(rec.get('FREQ'));
        
        Ext.getCmp(prototype.id01+'-txtA1707-NFLIGHTH').setValue(rec.get('NFLIGHTH'));
        Ext.getCmp(prototype.id01+'-txtA1707-CARRIERH').setValue(rec.get('CARRIERH'));
//        Ext.getCmp(prototype.id01+'-CARRIERH-NAME').setValue(rec.get('CARRIVA'));
        
        Ext.getCmp(prototype.id01+'-txt-USCR').setValue(rec.get('USCR'));
        Ext.getCmp(prototype.id01+'-txt-FECR').setValue(rec.get('FECR'));
        Ext.getCmp(prototype.id01+'-txt-HOCR').setValue(rec.get('HOCR'));
        Ext.getCmp(prototype.id01+'-txt-USUP').setValue(rec.get('USUP'));
        Ext.getCmp(prototype.id01+'-txt-FEUP').setValue(rec.get('FEUP'));
        Ext.getCmp(prototype.id01+'-txt-HOUP').setValue(rec.get('HOUP'));
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function(btn){
        if (Ext.getCmp(prototype.id01+'-txtA1707-NFLIGHT').getValue() === ""
                || Ext.getCmp(prototype.id01+'-txtA1707-CDEPART').getValue() === ""
                || Ext.getCmp(prototype.id01+'-txtA1707-CARRIVA').getValue() === ""
                || Ext.getCmp(prototype.id01+'-txtA1707-NSEQ').getValue() === ""){
            Ext.Msg.alert('.:PRAXIS:.', 'You must enter all required fields.', Ext.emptyFn);
            return false;
        }else{
            Ext.Msg.show({
                title:'.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn){
                    if (btn === 'yes'){
                        this.view.params.action = "I";
                        this.save();
                    }
                }
            });
        }
    },
    setParametros: function () {
        var NFLIGHT = Ext.getCmp(prototype.id+'-search-text').getValue();
        
        searchParams = {
            NFLIGHT: NFLIGHT
        };
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title:'.:PRAXIS:.',
            msg: 'Are you sure to update?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn){
                if (btn === 'yes'){
                    this.view.params.action = "U";
                    this.save();
                }
            }
        });
    },
    onDeleteClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.save();
                }
            }
        });
    },
    onFocusToper: function() {
        var cdepart = Ext.getCmp(prototype.id01 + '-txtA1707-CDEPART').getValue();
        var carriva = Ext.getCmp(prototype.id01 + '-txtA1707-CARRIVA').getValue();
        if (cdepart !== '' && carriva !== '') {
            if (cdepart === carriva) {
                Ext.getCmp(prototype.id01 + '-txtA1707-TOPER').setData("D");
                Ext.getCmp(prototype.id01 + '-TOPER-NAME').setData("Domestic");
            } else {
                Ext.getCmp(prototype.id01 + '-txtA1707-TOPER').setData("I");
                Ext.getCmp(prototype.id01 + '-TOPER-NAME').setData("International");
            }
        }
    },
    onFocusCarrier: function() {
        var valor = Ext.getCmp(prototype.id01 + '-txtA1707-CARRIER').getValue();
        if(valor==="AM" || valor==="5D"){
            Ext.getCmp(prototype.id01 + '-CARRIER-NAME').setData("");
            var codeCar = Ext.getCmp(prototype.id01 + '-txtA1707-CARRIER').getValue();
            Ext.Ajax.request({
                url: prototype.url + '/completeData',
                method: 'POST',
                timeout: 60000000,
                params: {
                    opcion: "aerolineas"
                },
                success: function(response, options) {
                    var resp = Ext.JSON.decode(response.responseText);
                    this.aerolineas = resp.lstA005;
                    var nameCarrier;
                    var exist = false;
                    for(var k in this.aerolineas) {
                        if (codeCar === this.aerolineas[k].A005KEY1) {
                            exist = true;
                            nameCarrier = this.aerolineas[k].A005KEY2;
                            break;
                        }
                    }
                    if (exist) {
                        console.log("prototype.id01: " + prototype.id01);
                        Ext.getCmp(prototype.id01+'-CARRIER-NAME').setData(nameCarrier);

                        if (Ext.getCmp(prototype.id01 + '-txtA1707-CARRIERH').getValue() !== '') {
                            if (Ext.getCmp(prototype.id01 + '-txtA1707-CARRIER').getValue() === Ext.getCmp(prototype.id01 + '-txtA1707-CARRIERH').getValue()) {
                                global.Msg({
                                    msg: 'This combination of airport is not allowed',
                                    fn: function() {
                                        Ext.getCmp(prototype.id01+'-txtA1707-CARRIER').focus(true);
                                    }
                                });
                            }
                        }
                    }
                }
            });
        }else{
            if (valor!=="") {
                global.Msg({
                    msg: 'Only allowed AM or 5D',
                    fn: function() {
                        Ext.getCmp(prototype.id01+'-txtA1707-CARRIER').focus(true);
                    }
                });
            }
            
        }
    },
    onFocusCarrierH: function() {
        var valor = Ext.getCmp(prototype.id01 + '-txtA1707-CARRIERH').getValue();
        if(valor==="AM" || valor==="5D"){
            Ext.getCmp(prototype.id01 + '-CARRIERH-NAME').setData("");
            var codeCar = Ext.getCmp(prototype.id01 + '-txtA1707-CARRIERH').getValue();
            Ext.Ajax.request({
                url: prototype.url + '/completeData',
                method: 'POST',
                timeout: 60000000,
                params: {
                    opcion: "aerolineas"
                },
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    this.aerolineas = res.lstA005;
                    var nameCarrier;
                    var exist = false;
                    for(var k in this.aerolineas) {
                        if (codeCar === this.aerolineas[k].A005KEY1) {
                            exist = true;
                            nameCarrier = this.aerolineas[k].A005KEY2;
                            break;
                        }
                    }
                    if (exist) {
                        Ext.getCmp(prototype.id01+'-CARRIERH-NAME').setData(nameCarrier);

                        if (Ext.getCmp(prototype.id01 + '-txtA1707-CARRIER').getValue() !== '') {
                            if (Ext.getCmp(prototype.id01 + '-txtA1707-CARRIER').getValue() === Ext.getCmp(prototype.id01 + '-txtA1707-CARRIERH').getValue()) {
                                global.Msg({
                                    msg: 'This combination of airport is not allowed',
                                    fn: function() {
                                        Ext.getCmp(prototype.id01+'-txtA1707-CARRIERH').focus(true);
                                    }
                                });
                            }
                        }
                    }
                }
            });
        }else{
            if (valor!=="") {
                global.Msg({
                    msg: 'Only allowed AM or 5D',
                    fn: function() {
                        Ext.getCmp(prototype.id01+'-txtA1707-CARRIERH').focus(true);
                    }
                });
            }
        }
    },
    onFocusDepartureAirport: function( ) {
        Ext.getCmp(prototype.id01 + '-CDEPART-NAME').setData("");
        var codeAir = Ext.getCmp(prototype.id01 + '-txtA1707-CDEPART').getValue();
        Ext.Ajax.request({
            url: prototype.url + '/completeData',
            method: 'POST',
            timeout: 60000000,
            params: {
                opcion: "ciudades"
            },
            success: function(response, options) {
                var resp = Ext.JSON.decode(response.responseText);
                
                this.ciudades = resp.lstA1007;
                this.aeropuertos = resp.lstA005;
                var nameAirport;
                var exist = false;
                for(var k in this.ciudades) {
                    if (codeAir === this.ciudades[k].A1007CTATO) {
                        exist = true;
                        nameAirport = this.ciudades[k].A1007NOMBR;
                        break;
                    }
                }
                if (exist) {
                    Ext.getCmp(prototype.id01+'-CDEPART-NAME').setData(nameAirport);

                    if (Ext.getCmp(prototype.id01 + '-txtA1707-CARRIVA').getValue() !== '') {
                        if (Ext.getCmp(prototype.id01 + '-txtA1707-CDEPART').getValue() === Ext.getCmp(prototype.id01 + '-txtA1707-CARRIVA').getValue()) {
                            global.Msg({
                                msg: 'This combination of airport is not allowed',
                                fn: function() {
                                    Ext.getCmp(prototype.id01+'-txtA1707-CDEPART').focus(true);
                                }
                            });
                        }
                    }
                } else {
                    global.Msg({
                        msg: 'This Airport does not exist',
                        fn: function() {
                            Ext.getCmp(prototype.id01+'-CDEPART-NAME').focus(true);
                        }
                    });
                }
            }
        });
    },
    onFocusArrivalAirport: function( ) {
        Ext.getCmp(prototype.id01 + '-CARRIVA-NAME').setData("");
        var codeAir = Ext.getCmp(prototype.id01 + '-txtA1707-CARRIVA').getValue();
        Ext.Ajax.request({
            url: prototype.url + '/completeData',
            method: 'POST',
            timeout: 60000000,
            params: {
                opcion: "ciudades"
            },
            success: function(response, options) {
                var resp = Ext.JSON.decode(response.responseText);
                
                this.ciudades = resp.lstA1007;
                var nameAirport;
                var exist = false;
                for(var k in this.ciudades) {
                    if (codeAir === this.ciudades[k].A1007CTATO) {
                        exist = true;
                        nameAirport = this.ciudades[k].A1007NOMBR;
                        break;
                    }
                }
                if (exist) {
                    Ext.getCmp(prototype.id01+'-CARRIVA-NAME').setData(nameAirport);

                    if (Ext.getCmp(prototype.id01 + '-txtA1707-CDEPART').getValue() !== '') {
                        if (Ext.getCmp(prototype.id01 + '-txtA1707-CDEPART').getValue() === Ext.getCmp(prototype.id01 + '-txtA1707-CARRIVA').getValue()) {
                            global.Msg({
                                msg: 'This combination of airport is not allowed',
                                fn: function() {
                                    Ext.getCmp(prototype.id01+'-txtA1707-CARRIVA').focus(true);
                                }
                            });
                        }
                    }
                } else {
                    global.Msg({
                        msg: 'This Airport does not exist',
                        fn: function() {
                            Ext.getCmp(prototype.id01+'-CARRIVA-NAME').focus(true);
                        }
                    });
                }
            }
        });
    },
    save: function(){
        var p = this.view.params;

        var strOption = p.action;
        
        var NFLIGHT = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-NFLIGHT').getValue());
        var CDEPART = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-CDEPART').getValue());
        var CARRIVA = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-CARRIVA').getValue());
        var NSEQ = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-NSEQ').getValue());
        var LEG = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-LEG').getValue());
        var FSSIM = Ext.String.trim(Ext.getCmp(prototype.id01+'-cbxA1707-FSSIM').getValue());//getData//getSelection
        var FREQ = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-FREQ').getValue());
        var CARRIER = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-CARRIER').getValue());
        var NFLIGHTH = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-NFLIGHTH').getValue());
        var CARRIERH = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-CARRIERH').getValue());
        var TOPER = Ext.String.trim(Ext.getCmp(prototype.id01+'-txtA1707-TOPER').getValue());
        
        Ext.Ajax.request({
            url: prototype.url + '/mantenimiento1707',
            method: 'POST',
            timeout: 60000000,
            params:{
                strOption: strOption,
                NFLIGHT: NFLIGHT,
                CDEPART: CDEPART,
                CARRIVA: CARRIVA,
                NSEQ: NSEQ,
                LEG: LEG,
                FSSIM: FSSIM,
                FREQ: FREQ,
                CARRIER: CARRIER,
                NFLIGHTH: NFLIGHTH,
                CARRIERH: CARRIERH,
                TOPER: TOPER
            },
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if(res.mensaje==="An Unexpected Error Ocurred(NF)."){
                    global.Msg({
                        msg: res.mensaje,
                        icon: 0,
                        fn:function(){//fail
                        }
                    });
                }else if(res.mensaje==="Operation was successful."){
                    global.Msg({
                        msg: res.mensaje,
                        icon:1,
                        fn:function(){
                            Ext.getCmp(prototype.id01 + '-btn-cancel').fireEvent('click',{});
                            Ext.getCmp(prototype.id + '-btn-search').fireEvent('click',{});
                        }
                    });
                } else if(res.mensaje==="DUPLICATED KEY, VERIY!") {
                    global.Msg({
                        msg: res.mensaje,
                        icon:2,
                        fn:function(){
                        }
                    });
                }
            }
        });
    }
    
});
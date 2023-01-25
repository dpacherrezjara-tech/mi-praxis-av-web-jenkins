/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.RegistroVentaOAL.RegistroVentaOALCrudController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id01 + '-dataEntryController',
    url: CONTEXTPATH + '/RegistroVentaOAL',
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //SET store Grid
        var grid01 = Ext.getCmp(prototype.id01 + '-gridData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {});
        grid01.setStore(storeGridDatas);
        this.get_ClearField();
        var p = this.view.params;
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-save').show();

                this.handlerEvent_setDisabled(true);
                Ext.getCmp(prototype.id01 + '-A4069TKTOR').focus();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').show();
                //Ext.getCmp(prototype.id01 + '-btn-delete').show(); (no hay opcion de quitar cliente) ??
                this.handlerEvent_setDisabled(false);
                break;
        }
    },
    handlerEvent_setDisabled: function (bflag) {
        //boton logo
        //Ext.getCmp(prototype.id01 + '-file').setDisabled(bflag);
        //Ext.getCmp(prototype.id01 + '-btn-upload').setDisabled(bflag);
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;
        //console.log(data);
        Ext.getCmp(prototype.id01 + '-A4069TKTOR').setValue(data.A4069TKTOR);
        Ext.getCmp(prototype.id01 + '-INTERNAL-NUMBER').setValue(data.A4069FORMA+data.A4069SERIE);
        Ext.getCmp(prototype.id01 + '-A4069CIA').setValue(data.A4069CIA);
        Ext.getCmp(prototype.id01 + '-A4069TRNCU').setValue(data.A4069TRNCU);
        Ext.getCmp(prototype.id01 + '-A4069GRUPO').setValue(data.A4069GRUPO);
                                 
        Ext.getCmp(prototype.id01 + '-A4069FEVTA').setValue(data.A4069FEVTA);
        Ext.getCmp(prototype.id01 + '-A4069IATA').setValue(data.A4069IATA);
        Ext.getCmp(prototype.id01 + '-A4069SERV').setValue(data.A4069SERV);
        Ext.getCmp(prototype.id01 + '-A4069PAX1').setValue(data.A4069PAX.split("/")[0]);
        Ext.getCmp(prototype.id01 + '-A4069PAX2').setValue(data.A4069PAX.split("/")[1]);
        
        Ext.getCmp(prototype.id01 + '-A4069MDLOC').setValue(data.A4069MDLOC); 
        Ext.getCmp(prototype.id01 + '-A4069FARE').setValue(Ext.util.Format.number(data.A4069FARE, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-A4069IVA').setValue(Ext.util.Format.number(data.A4069IVA, '0,000.00'));                                                          
        Ext.getCmp(prototype.id01 + '-A4069IVAP').setValue(data.A4069IVAP);
        Ext.getCmp(prototype.id01 + '-A4069TUA').setValue(Ext.util.Format.number(data.A4069TUA, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-A4069YR').setValue(Ext.util.Format.number(data.A4069YR, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-A4069YQ').setValue(Ext.util.Format.number(data.A4069YQ, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-A4069OTR').setValue(Ext.util.Format.number(data.A4069OTR, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-A4069TOTAL').setValue(Ext.util.Format.number(data.A4069TOTAL, '0,000.00'));
        
        Ext.getCmp(prototype.id01 + '-A4069MERNB').setValue(data.A4069MERNB);
        Ext.getCmp(prototype.id01 + '-A4069MERNM').setValue(data.A4069MERNM);
        Ext.getCmp(prototype.id01 + '-A4069ACCNB').setValue(data.A4069ACCNB);
        Ext.getCmp(prototype.id01 + '-A4069ACCNM').setValue(data.A4069ACCNM);
        Ext.getCmp(prototype.id01 + '-A4069CRDNB').setValue(data.A4069CRDNB);
        Ext.getCmp(prototype.id01 + '-A4069TTARJ').setValue(data.A4069TTARJ);       
        //console.log(data.A4069NTARJ.split("XXXXX"));
        Ext.getCmp(prototype.id01 + '-A4069NTARJ').setValue(data.A4069NTARJ.split("XXXXX")[0]);
        Ext.getCmp(prototype.id01 + '-A4069NTARJ2').setValue(data.A4069NTARJ.split("XXXXX")[1]);
        
        Ext.getCmp(prototype.id01 + '-A4069IDCON').setValue(data.A4069IDCON);
        Ext.getCmp(prototype.id01 + '-A4069FCONT').setValue(data.A4069FCONT);
        Ext.getCmp(prototype.id01 + '-A4069PCONT').setValue(data.A4069PCONT);
        Ext.getCmp(prototype.id01 + '-A4069FOP').setValue(data.A4069FOP);
        Ext.getCmp(prototype.id01 + '-A4069MPG').setValue(data.A4069MPG);
        Ext.getCmp(prototype.id01 + '-A4069CFDI').setValue(data.A4069CFDI);
        Ext.getCmp(prototype.id01 + '-A4069RFC').setValue(data.A4069RFC);
        Ext.getCmp(prototype.id01 + '-A4069FECTB').setValue(data.A4069FECTB);
        
        Ext.getCmp(prototype.id01 + '-A4069REGIS').setValue(data.A4069REGIS);
        Ext.getCmp(prototype.id01 + '-A4069FREGI').setValue(data.A4069FREGI);
        Ext.getCmp(prototype.id01 + '-A4069HREGI').setValue(data.A4069HREGI);
        Ext.getCmp(prototype.id01 + '-A4069REVIS').setValue(data.A4069REVIS);
        Ext.getCmp(prototype.id01 + '-A4069FREVI').setValue(data.A4069FREVI);
        Ext.getCmp(prototype.id01 + '-A4069HREVI').setValue(data.A4069HREVI);
        
        this.search_routing();
    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VL_A4069TKTOR = Ext.getCmp(prototype.id01 + '-A4069TKTOR').getValue();
        var VL_INTERNAL_NUMBER = Ext.getCmp(prototype.id01 + '-INTERNAL-NUMBER').getValue();
        var VL_A4069CIA = Ext.getCmp(prototype.id01 + '-A4069CIA').getValue();
        var VL_A4069FORMA = VL_INTERNAL_NUMBER.substring(0,4);
        var VL_A4069SERIE = VL_INTERNAL_NUMBER.substring(4,10);
        var VL_A4069SEQ = '00';
        var VL_A4069TRNCU = Ext.getCmp(prototype.id01 + '-A4069TRNCU').getValue();
        var VL_A4069GRUPO = Ext.getCmp(prototype.id01 + '-A4069GRUPO').getValue();        
        var VL_A4069FEVTA = Ext.util.Format.date(Ext.getCmp(prototype.id01 + '-A4069FEVTA').getValue(), 'Ymd');        
        var VL_A4069IATA = Ext.getCmp(prototype.id01 + '-A4069IATA').getValue();        
        var VL_A4069SERV = Ext.getCmp(prototype.id01 + '-A4069SERV').getValue();
        var VL_A4069PAX = Ext.getCmp(prototype.id01 + '-A4069PAX1').getValue().trim()+' / '+Ext.getCmp(prototype.id01 + '-A4069PAX2').getValue().trim();
        var VL_A4069RUTA = "";
        var VL_A4069CARR = "";  
        var VL_A4069FBAS = "";
        var VL_A4069FVLO = "";
        var VL_A4069MDLOC = Ext.getCmp(prototype.id01 + '-A4069MDLOC').getValue();
        var VL_A4069TCREV = 0;        
        var VL_A4069FARE = Ext.Number.parseFloat(Ext.getCmp(prototype.id01 + '-A4069FARE').getValue().replace(",", "").replace(",", ""));
        var VL_A4069IVA = Ext.Number.parseFloat(Ext.getCmp(prototype.id01 + '-A4069IVA').getValue().replace(",", "").replace(",", ""));        
        var VL_A4069IVAP = Ext.getCmp(prototype.id01 + '-A4069IVAP').getValue().replace("%","");
        var VL_A4069TUA = Ext.Number.parseFloat(Ext.getCmp(prototype.id01 + '-A4069TUA').getValue().replace(",", "").replace(",", ""));
        var VL_A4069YR = Ext.Number.parseFloat(Ext.getCmp(prototype.id01 + '-A4069YR').getValue().replace(",", "").replace(",", ""));
        var VL_A4069YQ = Ext.Number.parseFloat(Ext.getCmp(prototype.id01 + '-A4069YQ').getValue().replace(",", "").replace(",", ""));
        var VL_A4069OTR = Ext.Number.parseFloat(Ext.getCmp(prototype.id01 + '-A4069OTR').getValue().replace(",", "").replace(",", ""));
        var VL_A4069TOTAL = Ext.Number.parseFloat(Ext.getCmp(prototype.id01 + '-A4069TOTAL').getValue().replace(",", "").replace(",", ""));
        
        var VL_A4069MERNB = Ext.getCmp(prototype.id01 + '-A4069MERNB').getValue();
        var VL_A4069MERNM = Ext.getCmp(prototype.id01 + '-A4069MERNM').getValue();
        var VL_A4069ACCNB = Ext.getCmp(prototype.id01 + '-A4069ACCNB').getValue();
        var VL_A4069ACCNM = Ext.getCmp(prototype.id01 + '-A4069ACCNM').getValue();
        var VL_A4069CRDNB = Ext.getCmp(prototype.id01 + '-A4069CRDNB').getValue();
        var VL_A4069TTARJ = Ext.getCmp(prototype.id01 + '-A4069TTARJ').getValue();
        var VL_A4069NTARJ = '';
        if(Ext.getCmp(prototype.id01 + '-A4069NTARJ').getValue() !=='' ) 
        VL_A4069NTARJ = Ext.getCmp(prototype.id01 + '-A4069NTARJ').getValue()+Ext.getCmp(prototype.id01 + '-A4069NTARJ1').getValue()+Ext.getCmp(prototype.id01 + '-A4069NTARJ2').getValue();
        var VL_A4069IDCON = Ext.getCmp(prototype.id01 + '-A4069IDCON').getValue();
        var VL_A4069FCONT = Ext.getCmp(prototype.id01 + '-A4069FCONT').getValue();
        var VL_A4069PCONT = Ext.getCmp(prototype.id01 + '-A4069PCONT').getValue();        
        var VL_A4069FOP  = Ext.getCmp(prototype.id01 + '-A4069FOP').getValue();
        var VL_A4069MPG  = Ext.getCmp(prototype.id01 + '-A4069MPG').getValue();
        var VL_A4069CFDI  = Ext.getCmp(prototype.id01 + '-A4069CFDI').getValue();        
        var VL_A4069RFC  = Ext.getCmp(prototype.id01 + '-A4069RFC').getValue();
        var VL_A4069FECTB  = Ext.getCmp(prototype.id01 + '-A4069FECTB').getValue();
        
        return {
            VP_ACTION:VP_ACTION,
            A4069CIA:VL_A4069CIA, 
            A4069FORMA:VL_A4069FORMA, 
            A4069SERIE:VL_A4069SERIE,
            A4069SEQ:VL_A4069SEQ,
            A4069TRNCU:VL_A4069TRNCU,
            A4069GRUPO:VL_A4069GRUPO,
            A4069TKTOR:VL_A4069TKTOR,
            A4069FEVTA:VL_A4069FEVTA, 
            A4069IATA:VL_A4069IATA,
            A4069SERV:VL_A4069SERV,
            A4069PAX:VL_A4069PAX,
            A4069RUTA:VL_A4069RUTA,
            A4069CARR:VL_A4069CARR,
            A4069FBAS:VL_A4069FBAS,
            A4069FVLO:VL_A4069FVLO,
            A4069MDLOC:VL_A4069MDLOC,
            A4069TCREV:VL_A4069TCREV,
            A4069FARE:VL_A4069FARE, 
            A4069IVA:VL_A4069IVA,
            A4069IVAP:VL_A4069IVAP, 
            A4069TUA:VL_A4069TUA,
            A4069YR:VL_A4069YR,
            A4069YQ:VL_A4069YQ,
            A4069OTR:VL_A4069OTR, 
            A4069TOTAL:VL_A4069TOTAL, 
            A4069FARER:0, //CALCULO 
            A4069IVARV:0, //CALCULO, 
            A4069TUARV:0, //CALCULO, 
            A4069YRRV:0, //CALCULO, 
            A4069YQRV:0, //CALCULO, 
            A4069OTRRV:0, //CALCULO, 
            A4069TOTRV:0, //CALCULO,
            A4069MERNB:VL_A4069MERNB,
            A4069MERNM:VL_A4069MERNM,
            A4069ACCNB:VL_A4069ACCNB, 
            A4069ACCNM:VL_A4069ACCNM,
            A4069CRDNB:VL_A4069CRDNB,
            A4069TTARJ:VL_A4069TTARJ,
            A4069NTARJ:VL_A4069NTARJ,
            A4069IDCON:VL_A4069IDCON,
            A4069FCONT:VL_A4069FCONT,
            A4069PCONT:VL_A4069PCONT,
            A4069FOP:VL_A4069FOP,
            A4069MPG:VL_A4069MPG, 
            A4069CFDI:VL_A4069CFDI,
            A4069RFC:VL_A4069RFC,
            A4069FECTB:VL_A4069FECTB
        };
    },
    
    onSaveClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function () {
        var p = this.view.params;
        var strOption = p.action;
         var bFlag = false;
        
        var lstrouting = new Array();
        var AllRecords = this.getAllRecords(prototype.id01 + '-gridData');
        //console.log('AllRecords:');
        //console.log(AllRecords);
        AllRecords.data.items.forEach(function (rec) {
           if (rec.data.A4069RUTA.trim() === '')
                bFlag = true;
            lstrouting.push({
                "crudState": "I", //rec.crudState,
                "A4069RUTA": rec.data.A4069RUTA,
                "A4069CARR": rec.data.A4069CARR,
                "A4069FBAS": rec.data.A4069FBAS,
                "A4069FVLO": Ext.util.Format.date(rec.data.A4069FVLO, 'Ymd')
            });
        });
        
//        var RemovedRecords = this.getRemovedRecords(prototype.id01 + '-gridData');
//        console.log('RemovedRecords:');
//        console.log(RemovedRecords);
//        
//        RemovedRecords.forEach(function (rec) {
//            if (rec.data.A4069RUTA.trim() === '')
//                bFlag = true;
//            lstrouting.push({
//                "crudState": "D", //rec.crudState,
//                "A4069RUTA": rec.data.A4069RUTA,
//                "A4069CARR": rec.data.A4069CARR,
//                "A4069FBAS": rec.data.A4069FBAS,
//                "A4069FVLO": Ext.util.Format.date(rec.data.A4069FVLO, 'Ymd')
//            });
//        });
//
//        var NewRecords = this.getNewRecords(prototype.id01 + '-gridData');
//        console.log('NewRecords:');
//        console.log(NewRecords);
//        NewRecords.forEach(function (rec) {
//            if (rec.data.A4069RUTA.trim() === '')
//                bFlag = true;
//            lstrouting.push({
//                "crudState": "I", //rec.crudState,
//                "A4069RUTA": rec.data.A4069RUTA,
//                "A4069CARR": rec.data.A4069CARR,
//                "A4069FBAS": rec.data.A4069FBAS,
//                "A4069FVLO": Ext.util.Format.date(rec.data.A4069FVLO, 'Ymd')
//            });
//        });
//
//        var ModifiedRecords = this.getModifiedRecords(prototype.id01 + '-gridData');
//        console.log('UPDATE:');
//        console.log(ModifiedRecords); 
//        ModifiedRecords.forEach(function (rec) {
//            if (rec.data.A4069RUTA.trim() === '')
//                bFlag = true;
//            lstrouting.push({
//                "crudState": "U", //rec.crudState,
//                "A4069RUTA": rec.data.A4069RUTA,
//                "A4069CARR": rec.data.A4069CARR,
//                "A4069FBAS": rec.data.A4069FBAS,
//                "A4069FVLO": Ext.util.Format.date(rec.data.A4069FVLO, 'Ymd')
//            });
//        });

        // valida registro UATP
        if (bFlag) {
            global.Msg({
                msg: 'Ingrese Routing'
            });
            return;
        }

        var me = this;
        Ext.Ajax.request({
            url: this.url + '/set_crud',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption)),
                beanRouting: JSON.stringify(lstrouting)
            },
            beforerequest: Ext.getCmp(prototype.id01 + '-RegistroVentaOALCrud').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
//                console.log(objRtn);
                Ext.getCmp(prototype.id01 + '-RegistroVentaOALCrud').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        //culmino PROCESO
                        if (objRtn.dbException.SQLCODE !== '1') return;
                        Ext.getCmp(prototype.id01 + '-INTERNAL-NUMBER').setValue(objRtn.OU_INTERNAL_NUMBER);
                        me.search_routing(); //cagar desde la base de datos para generar STORE.
                        me.handlerEvent_setDisabled(false);
                        //PARA ACTUALIZAR DESPUES DE INSERTAR
                        if (strOption === "I") {
                            Ext.getCmp(prototype.id01 + '-btn-save').hide();
                            Ext.getCmp(prototype.id01 + '-btn-update').show();
                            me.view.params.action = "U";
                        }
                        //Ext.getCmp(prototype.id01 + '-RegistroVentaOALEntry').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });

    },
    onUpdateClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        }
    },
    onDeleteClick: function (btn) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.crud();
                }
            }
        });
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id01 + '-RegistroVentaOALCrud').close();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    onfocusleaveNumberfield: function (obj, error, eOpts) {
        obj.setValue( Ext.util.Format.number( Ext.Number.parseFloat( obj.getValue() ), '0,000.00'));
        //console.log(obj.id); //"RegistroVentaOALCrud-A4069FARE"
        if(obj.id === prototype.id01 + '-A4069FARE' || obj.id === prototype.id01 + '-A4069IVAP'  )
            this.calcular_iva();        
        this.calcula_total();
    },
    calcular_iva:function(){
        var fare =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069FARE').getValue().replace(",", "").replace(",", "") );
        var piva = Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069IVAP').getValue().replace("%","") );        
        var iva = fare * piva / 100;
        Ext.getCmp(prototype.id01 + '-A4069IVA').setValue( Ext.util.Format.number(iva, '0,000.00') );
    },
    calcula_total:function(){
        var fare =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069FARE').getValue().replace(",", "").replace(",", "") );
        var iva =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069IVA').getValue().replace(",", "").replace(",", "") );
        var tua =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069TUA').getValue().replace(",", "").replace(",", "") );
        var yq =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069YQ').getValue().replace(",", "").replace(",", "") );
        var yr =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069YR').getValue().replace(",", "").replace(",", "") );
        var otr =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069OTR').getValue().replace(",", "").replace(",", "") );
        var total = (fare+iva+tua+yq+yr+otr);
        Ext.getCmp(prototype.id01 + '-A4069TOTAL').setValue( Ext.util.Format.number(total, '0,000.00') );
    },
    IsNumeric: function(input){
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return (RE.test(input));
    },   
    fn_completar_cia: function(obj, error, eOpts){
        var vl_cia = obj.getValue().substring(0,3);
        if(this.IsNumeric(vl_cia))
        Ext.getCmp(prototype.id01 + '-A4069CIA').setValue( vl_cia );
    },
    validateForm: function (params) {
//        console.log(params);
        var mensaje = "";
        if (params.A4069TKTOR === '') {
            mensaje = 'INGRESE TICKET NUMBER';
            Ext.getCmp(prototype.id01 + '-A4069TKTOR').focus();
            return mensaje;
        }
        if (params.A4069CIA === '') {
            mensaje = 'INGRESE AIRLINE CODE';
            Ext.getCmp(prototype.id01 + '-A4069CIA').focus();
            return mensaje;
        }
        if (params.A4069FEVTA === '') {
            mensaje = 'INGRESE FECHA DE VENTA';
            Ext.getCmp(prototype.id01 + '-A4069FEVTA').focus();
            return mensaje;
        }
        if (params.A4069PAX === '' || params.A4069PAX === null) {
            mensaje = 'INGRESE NOMBRE PAX';
            Ext.getCmp(prototype.id01 + '-A4069PAX1').focus();
            return mensaje;
        }
        return mensaje;
    },
    get_ClearField: function () {
        //Initialize data INPUTS
//        Ext.getCmp(prototype.id01 + '-A3953CDCLI').setValue('');
//        Ext.getCmp(prototype.id01 + '-A3953RSOCI').setValue('');
//        Ext.getCmp(prototype.id01 + '-A3953NCOME').setValue('');
//        Ext.getCmp(prototype.id01 + '-A3953RFC').setValue('');
//        Ext.getCmp(prototype.id01 + '-A3953DIRE1').setValue('');      
    },

    /*
     * lista ROUTING
     */
    search_routing: function () {
        var bean = {};        
        var VP_ticket_numb = Ext.getCmp(prototype.id01 + '-INTERNAL-NUMBER').getValue();
        bean.VP_A4069CIA   = Ext.getCmp(prototype.id01 + '-A4069CIA').getValue();
        bean.VP_A4069FORMA = VP_ticket_numb.substring(0,4); 
        bean.VP_A4069SERIE = VP_ticket_numb.substring(4,10);
        bean.VP_A4069SEQ = "00";
       
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
            proxy: {
                url: prototype.url + '/search_routing'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id01 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id01 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id01 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id01 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found routing'
                        });
                    }
                    global.clear();
                }
            }
        });
        
//        var panel = Ext.getCmp(prototype.id01 + '-panel-contenedor-grid');
//        panel.removeAll();
//        var gridPanel = Ext.create({
//            region: 'center',
//            xtype: prototype.id01 + '-info01',
//            id: prototype.id01 + '-content-info01'
//        });
//        panel.add(gridPanel);       
        Ext.getCmp(prototype.id01 + '-gridData').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id01 + '-gridData').getStore().reload();
    },

    onClickAdd: function () {
        var grid01 = Ext.getCmp(prototype.id01 + '-gridData');
//        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.RegistroVentaOAL.GridDataUatp',{});
//        grid01.setStore(storeGridDatas);        
        var beanGrid = {};
        beanGrid.A4069RUTA = '';
        beanGrid.A4069CARR = '';
        beanGrid.A4069FBAS = '';
        beanGrid.A4069FVLO = '';
        grid01.getStore().add(beanGrid);

    },
    onClickRemove: function (grid, rowIndex, colIndex) {
        //var me = this;
        global.Msg({
            msg: 'Quitar registro?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    grid.getStore().removeAt(rowIndex);
                    //me.onSumaTaxGrid();
                }
            }
        });
    },

    PadLeft: function (number, width) {
        width -= number.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number + ""; // siempre devuelve tipo cadena
    },
    
    /*
     * 
     * @param {type} objGrid
     * @returns {Returns all phantom records in this store.}
     */
    getAllRecords: function (objGrid) {
        var allRecords = Ext.getCmp(objGrid).getStore();
        return allRecords;
    },
    /*
     * 
     * @param {type} objGrid
     * @returns {Returns all phantom records in this store.}
     */
    getNewRecords: function (objGrid) {
        var newRecords = Ext.getCmp(objGrid).getStore().getNewRecords();
        return newRecords;
    },
    /*
     * @param {type} objGrid
     * @returns { Returns all valid, non-phantom Model instances that have been
     *  updated in the Store but not yet synchronized with the Proxy }
     */
    getModifiedRecords: function (objGrid) {
        var modified = Ext.getCmp(objGrid).getStore().getUpdatedRecords();
        //console.log(modified);        
        return modified;
    },
    /*
     * @param {type} objGrid
     * @returns {Returns any records that have been removed from the store but not yet destroyed on the proxy.}
     */
    getRemovedRecords: function (objGrid) {
        //var RemovedTrack = Ext.getCmp(prototype.id01 + '-gridData-uatp').getStore().getTrackRemoved(); //si existe REC removed R
        var Removed = Ext.getCmp(objGrid).getStore().getRemovedRecords();
        //console.log(Removed);
        return Removed;
    }
});




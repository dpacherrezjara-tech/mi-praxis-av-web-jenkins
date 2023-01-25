/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.CatalogoCliente.CatalogoClienteEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/CatalogoCliente',
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
        var grid01 = Ext.getCmp(prototype.id + '-gridData-uatp');
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp', {});
        grid01.setStore(storeGridDatas);
              

        this.get_ClearField();
        var p = this.view.params;
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btnDet-contrato').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                
                this.handlerEvent_setDisabled(true);
                Ext.getCmp(prototype.id + '-A3953RSOCI').focus();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btnDet-contrato').show();
                //Ext.getCmp(prototype.id + '-btn-delete').show(); (no hay opcion de quitar cliente) ??
                this.handlerEvent_setDisabled(false);
                break;
        }
    },
    handlerEvent_setDisabled: function (bflag) {
        //boton logo
        Ext.getCmp(prototype.id + '-file').setDisabled(bflag);
        Ext.getCmp(prototype.id + '-btn-upload').setDisabled(bflag);
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;
        //console.log(data);
        Ext.getCmp(prototype.id + '-A3953CDCLI').setValue(data.A3953CDCLI);
        Ext.getCmp(prototype.id + '-A3953RSOCI').setValue(data.A3953RSOCI.trim());
        Ext.getCmp(prototype.id + '-A3953NCOME').setValue(data.A3953NCOME.trim());
        Ext.getCmp(prototype.id + '-A3953RFC').setValue(data.A3953RFC.trim());
        Ext.getCmp(prototype.id + '-A3953DIRE1').setValue(data.A3953DIRE1.trim());
        //""; //Ext.getCmp(prototype.id + '-A3953DIRE2').getValue();                          
        //""; //Ext.getCmp(prototype.id + '-A3953REFER').getValue();                          
        Ext.getCmp(prototype.id + '-A3953COLON').setValue(data.A3953COLON.trim());
        Ext.getCmp(prototype.id + '-A3953DELEG').setValue(data.A3953DELEG.trim());
        Ext.getCmp(prototype.id + '-A3953CIUDA').setValue(data.A3953CIUDA.trim());
        Ext.getCmp(prototype.id + '-A3953ESTAD').setValue(data.A3953ESTAD.trim());
        Ext.getCmp(prototype.id + '-A3953PAIS').setValue(data.A3953PAIS.trim());
        //""; //Ext.getCmp(prototype.id + '-A3953NPAIS').getValue();                          
        Ext.getCmp(prototype.id + '-A3953CP').setValue(data.A3953CP.trim());
        Ext.getCmp(prototype.id + '-A3953TELE1').setValue(data.A3953TELE1.trim());
        //"";                                                                                 
        Ext.getCmp(prototype.id + '-A3953CDMTR').setValue(data.A3953CDMTR.trim());
        Ext.getCmp(prototype.id + '-A3953TCLIN').setValue(data.A3953TCLIN);
        Ext.getCmp(prototype.id + '-A3953TORGN').setValue(data.A3953TORGN);
        Ext.getCmp(prototype.id + '-A3953CONTR').setValue(data.A3953CONTR.trim());
        Ext.getCmp(prototype.id + '-A3953CTAMA').setValue(data.A3953CTAMA.trim());
        Ext.getCmp(prototype.id + '-A3953CDORA').setValue(data.A3953CDORA.trim());
        Ext.getCmp(prototype.id + '-A3953BANCO').setValue(data.A3953BANCO.trim());
        Ext.getCmp(prototype.id + '-A3953CTABC').setValue(data.A3953CTABC.trim());
        Ext.getCmp(prototype.id + '-A3953INDPE').setValue(data.A3953INDPE);
        Ext.getCmp(prototype.id + '-A3953INDPL').setValue(data.A3953INDPL);
        Ext.getCmp(prototype.id + '-A3953INDPP').setValue(data.A3953INDPP);
        Ext.getCmp(prototype.id + '-A3953DIAPP').setValue(data.A3953DIAPP);
        Ext.getCmp(prototype.id + '-A3953PLZCR').setValue(data.A3953PLZCR);
        Ext.getCmp(prototype.id + '-A3953FALTA').setValue(data.A3953FALTA);
        Ext.getCmp(prototype.id + '-A3953FBAJA').setValue(data.A3953FBAJA);
        //Check    
        if (data.A3953ARCPD === 'S')
            Ext.getCmp(prototype.id + '-A3953ARCPD').setValue(true);
        if (data.A3953ARCTX === 'S')
            Ext.getCmp(prototype.id + '-A3953ARCTX').setValue(true);
        if (data.A3953ARCEC === 'S')
            Ext.getCmp(prototype.id + '-A3953ARCEC').setValue(true);
        if (data.A3953ARCFZ === 'S')
            Ext.getCmp(prototype.id + '-A3953ARCFZ').setValue(true);
        if (data.A3953ARCFX === 'S')
            Ext.getCmp(prototype.id + '-A3953ARCFX').setValue(true);
        Ext.getCmp(prototype.id + '-A3962CONT1').setValue(data.A3962CONT1);
        Ext.getCmp(prototype.id + '-A3962CONT1_E').setValue(data.A3962CONT1_E);
        
        //console.log('data.A3953LOGO: ' + data.A3953LOGO);
        Ext.getCmp(prototype.id + '-A3953LOGO').setValue(data.A3953LOGO);
        if (data.A3953LOGO.trim() !== '')
            Ext.getCmp(prototype.id + '-A3953LOGO_chk').setValue(true);

        if (data.A3953STSID.trim() === 'S')
            Ext.getCmp(prototype.id + '-A3953STSID').setValue(true);
        if (data.A3953STSDV.trim() === 'S')
            Ext.getCmp(prototype.id + '-A3953STSDV').setValue(true);

        //load detalle Nbr TARJETA UATPs
        //setTimeout( this.search_uatp(), 500);
        this.search_uatp();
        this.search_identif();
        this.onbtn_searchImage();
        this.search_calendario();
    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VL_A3953CDCLI = Ext.getCmp(prototype.id + '-A3953CDCLI').getValue();
        var VL_A3953RSOCI = Ext.getCmp(prototype.id + '-A3953RSOCI').getValue();
        var VL_A3953NCOME = Ext.getCmp(prototype.id + '-A3953NCOME').getValue();
        var VL_A3953RFC = Ext.getCmp(prototype.id + '-A3953RFC').getValue();
        var VL_A3953DIRE1 = Ext.getCmp(prototype.id + '-A3953DIRE1').getValue();
        var VL_A3953DIRE2 = ""; //Ext.getCmp(prototype.id + '-A3953DIRE2').getValue();
        var VL_A3953REFER = ""; //Ext.getCmp(prototype.id + '-A3953REFER').getValue();
        var VL_A3953COLON = Ext.getCmp(prototype.id + '-A3953COLON').getValue();
        var VL_A3953DELEG = Ext.getCmp(prototype.id + '-A3953DELEG').getValue();
        var VL_A3953CIUDA = Ext.getCmp(prototype.id + '-A3953CIUDA').getValue();
        var VL_A3953ESTAD = Ext.getCmp(prototype.id + '-A3953ESTAD').getValue();
        var VL_A3953PAIS = Ext.getCmp(prototype.id + '-A3953PAIS').getValue();
        var VL_A3953NPAIS = ""; //Ext.getCmp(prototype.id + '-A3953NPAIS').getValue();
        var VL_A3953CP = Ext.getCmp(prototype.id + '-A3953CP').getValue();
        var VL_A3953TELE1 = Ext.getCmp(prototype.id + '-A3953TELE1').getValue();
        var VL_A3953TELE2 = "";
        var VL_A3953CDMTR = Ext.getCmp(prototype.id + '-A3953CDMTR').getValue();
        var VL_A3953TCLIN = Ext.getCmp(prototype.id + '-A3953TCLIN').getValue();
        var VL_A3953TORGN = Ext.getCmp(prototype.id + '-A3953TORGN').getValue();
        var VL_A3953CONTR = Ext.getCmp(prototype.id + '-A3953CONTR').getValue();
        var VL_A3953CTAMA = Ext.getCmp(prototype.id + '-A3953CTAMA').getValue();
        var VL_A3953CDORA = Ext.getCmp(prototype.id + '-A3953CDORA').getValue();
        var VL_A3953BANCO = Ext.getCmp(prototype.id + '-A3953BANCO').getValue();
        var VL_A3953CTABC = Ext.getCmp(prototype.id + '-A3953CTABC').getValue();
        var VL_A3953INDPE = Ext.getCmp(prototype.id + '-A3953INDPE').getValue();
        var VL_A3953INDPL = Ext.getCmp(prototype.id + '-A3953INDPL').getValue();
        var VL_A3953INDPP = Ext.getCmp(prototype.id + '-A3953INDPP').getValue();
        var VL_A3953DIAPP = Ext.getCmp(prototype.id + '-A3953DIAPP').getValue();
        var VL_A3953PLZCR = Ext.getCmp(prototype.id + '-A3953PLZCR').getValue();
        var VL_A3953FALTA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-A3953FALTA').getValue(), 'Ymd');
        var VL_A3953FBAJA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-A3953FBAJA').getValue(), 'Ymd');
        var VL_A3953ARCPD = 'N';
        var VL_A3953ARCTX = 'N';
        var VL_A3953ARCEC = 'N';
        var VL_A3953ARCFZ = 'N';
        var VL_A3953ARCFX = 'N';
        if (Ext.getCmp(prototype.id + '-A3953ARCPD').getValue())
            VL_A3953ARCPD = 'S';
        if (Ext.getCmp(prototype.id + '-A3953ARCTX').getValue())
            VL_A3953ARCTX = 'S';
        if (Ext.getCmp(prototype.id + '-A3953ARCEC').getValue())
            VL_A3953ARCEC = 'S';
        if (Ext.getCmp(prototype.id + '-A3953ARCFZ').getValue())
            VL_A3953ARCFZ = 'S';
        if (Ext.getCmp(prototype.id + '-A3953ARCFX').getValue())
            VL_A3953ARCFX = 'S';
        var VL_A3953LOGO = Ext.getCmp(prototype.id + '-A3953LOGO').getValue();

        var VL_A3953STSID = 'N';
        if (Ext.getCmp(prototype.id + '-A3953STSID').getValue())
            VL_A3953STSID = 'S';
        
        var VL_A3953STSDV = 'N';
        if (Ext.getCmp(prototype.id + '-A3953STSDV').getValue())
            VL_A3953STSDV = 'S';
        

        return {
            VP_ACTION: VP_ACTION,
            A3953CDCLI: VL_A3953CDCLI,
            A3953RSOCI: VL_A3953RSOCI,
            A3953NCOME: VL_A3953NCOME,
            A3953RFC: VL_A3953RFC,
            A3953DIRE1: VL_A3953DIRE1,
            A3953DIRE2: VL_A3953DIRE2,
            A3953REFER: VL_A3953REFER,
            A3953COLON: VL_A3953COLON,
            A3953DELEG: VL_A3953DELEG,
            A3953CIUDA: VL_A3953CIUDA,
            A3953ESTAD: VL_A3953ESTAD,
            A3953PAIS: VL_A3953PAIS,
            A3953NPAIS: VL_A3953NPAIS,
            A3953CP: VL_A3953CP,
            A3953TELE1: VL_A3953TELE1,
            A3953TELE2: VL_A3953TELE2,
            A3953CDMTR: VL_A3953CDMTR,
            A3953TCLIN: VL_A3953TCLIN,
            A3953TORGN: VL_A3953TORGN,
            A3953CONTR: VL_A3953CONTR,
            A3953CTAMA: VL_A3953CTAMA,
            A3953CDORA: VL_A3953CDORA,
            A3953BANCO: VL_A3953BANCO,
            A3953CTABC: VL_A3953CTABC,
            A3953INDPE: VL_A3953INDPE,
            A3953INDPL: VL_A3953INDPL,
            A3953INDPP: VL_A3953INDPP,
            A3953DIAPP: VL_A3953DIAPP,
            A3953PLZCR: VL_A3953PLZCR,
            A3953FALTA: VL_A3953FALTA,
            A3953FBAJA: VL_A3953FBAJA,
            A3953ARCPD: VL_A3953ARCPD,
            A3953ARCTX: VL_A3953ARCTX,
            A3953ARCEC: VL_A3953ARCEC,
            A3953ARCFZ: VL_A3953ARCFZ,
            A3953ARCFX: VL_A3953ARCFX,
            A3953LOGO: VL_A3953LOGO,
            A3953STSID: VL_A3953STSID,
            A3953STSDV: VL_A3953STSDV
        };
    },
    getDataEntry_det_identif: function () {
        var lstArray = new Array();
        var RemovedRecords = this.getRemovedRecords(prototype.id + '-gridData-identif');
        //console.log('REMOVED:');
        //console.log(RemovedRecords); 
        //var bFlag_identif = false;
        RemovedRecords.forEach(function (rec) {
            //if(rec.data.A3979IDCLI.trim() === '') bFlag_identif = true;
            lstArray.push({
                "crudState": "D", //rec.crudState,
                "A3979SEQID": rec.data.A3979SEQID,
                "A3979DESCR": rec.data.A3979DESCR,
                "A3979IDCLI": rec.data.A3979IDCLI,
                "A3979FALTA": Ext.util.Format.date(rec.data.A3979FALTA, 'Ymd'),
                "A3979FBAJA": Ext.util.Format.date(rec.data.A3979FBAJA, 'Ymd')
            });
        });

        var NewRecords = this.getNewRecords(prototype.id + '-gridData-identif');
        //console.log('NewRecords:');
        //console.log(NewRecords);
        NewRecords.forEach(function (rec) {
            //if(rec.data.A3979IDCLI.trim() === '') bFlag_identif = true;
            lstArray.push({
                "crudState": "I", //rec.crudState,
                "A3979SEQID": rec.data.A3979SEQID,
                "A3979DESCR": rec.data.A3979DESCR,
                "A3979IDCLI": rec.data.A3979IDCLI,
                "A3979FALTA": Ext.util.Format.date(rec.data.A3979FALTA, 'Ymd'),
                "A3979FBAJA": Ext.util.Format.date(rec.data.A3979FBAJA, 'Ymd')
            });
        });

        var ModifiedRecords = this.getModifiedRecords(prototype.id + '-gridData-identif');
        //console.log('UPDATE:');
        //console.log(ModifiedRecords); 
        ModifiedRecords.forEach(function (rec) {
            ///if(rec.data.A3979IDCLI.trim() === '') bFlag_identif = true;            
            lstArray.push({
                "crudState": "U", //rec.crudState,
                "A3979SEQID": rec.data.A3979SEQID,
                "A3979DESCR": rec.data.A3979DESCR,
                "A3979IDCLI": rec.data.A3979IDCLI,
                "A3979FALTA": Ext.util.Format.date(rec.data.A3979FALTA, 'Ymd'),
                "A3979FBAJA": Ext.util.Format.date(rec.data.A3979FBAJA, 'Ymd')
            });
        });
        return lstArray;
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
        //Detalle UATP
        var lstuatp = new Array();
        var RemovedRecords = this.getRemovedRecords(prototype.id + '-gridData-uatp');
        //console.log('REMOVED:');
        //console.log(RemovedRecords); 
        var bFlag_Nbr_uatp = false;
        RemovedRecords.forEach(function (rec) {
            if (rec.data.A3954TCUAT.trim() === '')
                bFlag_Nbr_uatp = true;
            lstuatp.push({
                "crudState": "D", //rec.crudState,
                "A3954TCUAT": rec.data.A3954TCUAT,
                "A3954DESCR": rec.data.A3954DESCR,
                //"A3954IDUAT": rec.data.A3954IDUAT,
                //"A3954TCUAM": rec.data.A3954TCUAM,
                "A3954FALTA": Ext.util.Format.date(rec.data.A3954FALTA, 'Ymd'),
                "A3954FBAJA": Ext.util.Format.date(rec.data.A3954FBAJA, 'Ymd')
            });
        });

        var NewRecords = this.getNewRecords(prototype.id + '-gridData-uatp');
        //console.log('NewRecords:');
        //console.log(NewRecords);
        NewRecords.forEach(function (rec) {
            if (rec.data.A3954TCUAT.trim() === '')
                bFlag_Nbr_uatp = true;
            lstuatp.push({
                "crudState": "I", //rec.crudState,
                "A3954TCUAT": rec.data.A3954TCUAT,
                "A3954DESCR": rec.data.A3954DESCR,
                //"A3954IDUAT": rec.data.A3954IDUAT,
                //"A3954TCUAM": rec.data.A3954TCUAM,
                "A3954FALTA": Ext.util.Format.date(rec.data.A3954FALTA, 'Ymd'),
                "A3954FBAJA": Ext.util.Format.date(rec.data.A3954FBAJA, 'Ymd')
            });
        });

        var ModifiedRecords = this.getModifiedRecords(prototype.id + '-gridData-uatp');
        //console.log('UPDATE:');
        //console.log(ModifiedRecords); 
        ModifiedRecords.forEach(function (rec) {
            if (rec.data.A3954TCUAT.trim() === '')
                bFlag_Nbr_uatp = true;
            lstuatp.push({
                "crudState": "U", //rec.crudState,
                "A3954TCUAT": rec.data.A3954TCUAT,
                "A3954DESCR": rec.data.A3954DESCR,
                //"A3954IDUAT": rec.data.A3954IDUAT,
                //"A3954TCUAM": rec.data.A3954TCUAM,
                "A3954FALTA": Ext.util.Format.date(rec.data.A3954FALTA, 'Ymd'),
                "A3954FBAJA": Ext.util.Format.date(rec.data.A3954FBAJA, 'Ymd')
            });
        });

        // valida registro UATP
        if (bFlag_Nbr_uatp) {
            global.Msg({
                msg: 'Ingrese Numero UATP'
            });
            return;
        }
        //Detalle identif.
        var lst_identif = this.getDataEntry_det_identif();

        //Detalle contactos 
        //...
        //Detalle contactos AM


        var me = this;
        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption)),
                beanuatp: JSON.stringify(lstuatp),
                bean_identif: JSON.stringify(lst_identif),
            },
            beforerequest: Ext.getCmp(prototype.id + '-CatalogoClienteEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
//                console.log(objRtn);
                Ext.getCmp(prototype.id + '-CatalogoClienteEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {
                        //culmino PROCESO
                        Ext.getCmp(prototype.id + '-A3953CDCLI').setValue(objRtn.OU_A3953CDCLI);
                        //carga logo(pendiente)
//                        Ext.getCmp(prototype.id + '-btn-upload').disable(true);
//                        me.setuploadLogo();
                        me.search_uatp(); //cagar desde la base de datos para generar STORE.
                        me.search_identif();
                        me.handlerEvent_setDisabled(false);
                        //PARA ACTUALIZAR DESPUES DE INSERTAR
                        if (strOption === "I") {
                            Ext.getCmp(prototype.id + '-btn-save').hide();
                            Ext.getCmp(prototype.id + '-btn-update').show();
                            Ext.getCmp(prototype.id + '-btnDet-contrato').show();
                            this.view.params.action = "U";
                        }
                        //Ext.getCmp(prototype.id + '-CatalogoClienteEntry').close();
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
        Ext.getCmp(prototype.id + '-CatalogoClienteEntry').close();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    validateForm: function (params) {
//        console.log(params);
        var mensaje = "";
        if (params.A3953RSOCI === '') {
            mensaje = 'INGRESE RAZÓN SOCIAL';
            Ext.getCmp(prototype.id + '-A3953RSOCI').focus();
            return mensaje;
        }
        if (params.A3953NCOME === '') {
            mensaje = 'INGRESE NOMBRE COMERCIAL';
            Ext.getCmp(prototype.id + '-A3953NCOME').focus();
            return mensaje;
        }
        if (params.A3953RFC === '') {
            mensaje = 'INGRESE RFC DEL CONTRIBUYENTE ';
            Ext.getCmp(prototype.id + '-A3953RFC').focus();
            return mensaje;
        }
        if (params.A3953TCLIN === '' || params.A3953TCLIN === null ) {
            mensaje = 'SELECCIONE TIPO CLIENTE';
            Ext.getCmp(prototype.id + '-A3953TCLIN').focus();
            return mensaje;
        }
        if (params.A3953PLZCR === 0) {
            mensaje = 'INGRESE DIAS PLAZO CREDITO';
            Ext.getCmp(prototype.id + '-A3953PLZCR').focus();
            return mensaje;
        }
        if (params.A3953INDPL === null) {
            mensaje = 'SELECCIONE INDICADOR PERIODO REPORTE VENTA';
            Ext.getCmp(prototype.id + '-A3953INDPL').focus();
            return mensaje;
        }
        if (params.A3953INDPE === null) {
            mensaje = 'SELECCIONE INDICADOR PERIODO EECC';
            Ext.getCmp(prototype.id + '-A3953INDPE').focus();
            return mensaje;
        }
        
        if (params.A3953INDPP === null) {
            mensaje = 'SELECCIONE INDICADOR PERIODO COMPLEMENTO PAGO';
            Ext.getCmp(prototype.id + '-A3953INDPP').focus();
            return mensaje;
        }
        
        var Count = Ext.getCmp(prototype.id + '-gridData-uatp').getStore().getCount();
        if (Count === 0) {
            mensaje = 'INGRESE DETALLE TARJETA UATP';
            return mensaje;
        }

        if (Ext.getCmp(prototype.id + '-A3953STSID').getValue()) {
            var Count1 = Ext.getCmp(prototype.id + '-gridData-identif').getStore().getCount();
            if (Count1 === 0) {
                mensaje = 'INGRESE DETALLE IDENTIFICADOR';
                Ext.getCmp(prototype.id + '-panel-contenedor-grid-detalles').setActiveTab(1);
                return mensaje;
            }
//            if (Count1 < 2) {
//                mensaje = 'INGRESE AL MENOS 2 REGISTROS DE IDENTIFICADOR';
//                return mensaje;
//            }
        }

        return mensaje;
    },
    get_ClearField: function () {
        //Initialize data INPUTS
        Ext.getCmp(prototype.id + '-A3953CDCLI').setValue('');
        Ext.getCmp(prototype.id + '-A3953RSOCI').setValue('');
        Ext.getCmp(prototype.id + '-A3953NCOME').setValue('');
        Ext.getCmp(prototype.id + '-A3953RFC').setValue('');
        Ext.getCmp(prototype.id + '-A3953DIRE1').setValue('');
        //""; //Ext.getCmp(prototype.id + '-A3953DIRE2').getValue();                          
        //""; //Ext.getCmp(prototype.id + '-A3953REFER').getValue();                          
        Ext.getCmp(prototype.id + '-A3953COLON').setValue('');
        Ext.getCmp(prototype.id + '-A3953DELEG').setValue('');
        Ext.getCmp(prototype.id + '-A3953CIUDA').setValue('');
        Ext.getCmp(prototype.id + '-A3953ESTAD').setValue('');
        Ext.getCmp(prototype.id + '-A3953PAIS').setValue('');
        //A3953NPAIS; //Ext.getCmp(prototype.id + '-A3953NPAIS').getValue();                          
        Ext.getCmp(prototype.id + '-A3953CP').setValue('');
        Ext.getCmp(prototype.id + '-A3953TELE1').setValue('');
        //A3953TELE2;
        Ext.getCmp(prototype.id + '-A3953CDMTR').setValue('');
        Ext.getCmp(prototype.id + '-A3953TCLIN').setValue('C'); //DEFAULT
        Ext.getCmp(prototype.id + '-A3953TORGN').setValue('NAC');
        Ext.getCmp(prototype.id + '-A3953CONTR').setValue('');
        Ext.getCmp(prototype.id + '-A3953CTAMA').setValue('');
        Ext.getCmp(prototype.id + '-A3953CDORA').setValue('');
        Ext.getCmp(prototype.id + '-A3953BANCO').setValue('');
        Ext.getCmp(prototype.id + '-A3953CTABC').setValue('');
        Ext.getCmp(prototype.id + '-A3953INDPE').setValue('S');
        Ext.getCmp(prototype.id + '-A3953INDPL').setValue('S');
        Ext.getCmp(prototype.id + '-A3953INDPP').setValue('M');
        Ext.getCmp(prototype.id + '-A3953DIAPP').setValue(10);
        Ext.getCmp(prototype.id + '-A3953PLZCR').setValue(20);
        Ext.getCmp(prototype.id + '-A3953FALTA').setValue(new Date());
        Ext.getCmp(prototype.id + '-A3953FBAJA').setValue('20991231');
        //Check    
        Ext.getCmp(prototype.id + '-A3953ARCPD').setValue(false);
        Ext.getCmp(prototype.id + '-A3953ARCTX').setValue(false);
        Ext.getCmp(prototype.id + '-A3953ARCEC').setValue(false);
        Ext.getCmp(prototype.id + '-A3953ARCFZ').setValue(false);
        Ext.getCmp(prototype.id + '-A3953ARCFX').setValue(false);        
    },
    /*
     * Upload file logo
     */
    onbtn_uploadClick: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Cargar archivo seleccionado?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.getCmp(prototype.id + '-btn-upload').disable(true);
                    this.setuploadLogo();
                }
            }
        });
    },
    setuploadLogo: function () {
        var me = this;
        var file = Ext.getCmp(prototype.id + '-file').getValue();
        //console.log('file>' + file);
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "Seleccione archivo", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-file').focus();", 100);
            });
            return;
        }
        var VL_OPCION = 'I';
        if (Ext.getCmp(prototype.id + '-A3953LOGO').getValue().trim())
            VL_OPCION = 'U';
        var lparams = {
            VP_OPCION: VL_OPCION,
            VP_CDCLI: Ext.getCmp(prototype.id + '-A3953CDCLI').getValue()
        };
        var form = Ext.getCmp(prototype.id + '-form01').getForm();
        form.submit({
            url: prototype.url + '/uploadLogo',
            waitMsg: 'Uploading your sure to upload the logo...',
            params: {beanString: JSON.stringify(lparams)},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-btn-upload').enable(true);
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {
                        //Logo cargado
                        Ext.getCmp(prototype.id + '-A3953LOGO_chk').setValue(true);
                        me.onbtn_searchImage();
                    }
                });
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    onbtn_searchImage: function () {
        var VL_CDCLI = Ext.getCmp(prototype.id + '-A3953CDCLI').getValue();
        Ext.Ajax.request({
            url: prototype.url + '/getImagen',
            method: 'POST',
            timeout: 60000000,
            //beforerequest: Ext.getCmp(prototype.id + '-CatalogoClienteEntry').mask('Loading...'),            
            params: {
                VP_CDCLI: VL_CDCLI
            },
            success: function (response, options) {
                var responseText = Ext.JSON.decode(response.responseText);
                var res = responseText.lstImagenes;
                Ext.getCmp(prototype.id + '-imgImage').setSrc('');
                Ext.getCmp(prototype.id + '-imgImage').setSrc('data:image/png;base64,' + res + '');
                if (res.length === 0)
                    Ext.getCmp(prototype.id + '-imgImage').setSrc('resources/img/not_picture.png');
                //Ext.getCmp(prototype.id + '-CatalogoClienteEntry').unmask();
                //global.clear();
            }
        });
    },
    /*
     * lista UATP's
     */
    search_uatp: function () {
        var bean = {};
        bean.VP_OPCION = "3";
        bean.VP_A3954TCUAT = "";
        bean.VP_A3954CDCLI = Ext.getCmp(prototype.id + '-A3953CDCLI').getValue();
        bean.VP_A3954DESCR = "";
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp', {
            proxy: {
                url: prototype.url + '/search_uatp'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found uatp'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid-uatp');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info-uatp',
            id: prototype.id + '-content-info-uatp'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData-uatp').setStore(storeGridDatas);
    },

    onClickAdd_uatp: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData-uatp');
//        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp',{});
//        grid01.setStore(storeGridDatas);        
        var beanGrid = {};
        beanGrid.A3954TCUAT = '';
        beanGrid.A3954DESCR = '';
        beanGrid.A3954IDUAT = '';
        beanGrid.A3954TCUAM = '';
        beanGrid.A3954FALTA = '';
        beanGrid.A3954FBAJA = '';
        grid01.getStore().add(beanGrid);

    },
    onClickRemove_uatp: function (grid, rowIndex, colIndex) {
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
    /*
     * ID identif.
     */
    search_identif: function () {
        var bean = {};
        bean.VP_OPCION = "1";
        bean.VP_A3979CDCLI = Ext.getCmp(prototype.id + '-A3953CDCLI').getValue();
        bean.VP_A3979IDCLI = "";
        bean.VP_A3979DESCR = "";
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataIdentif', {
            proxy: {
                url: prototype.url + '/search_identif'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found uatp'
//                        });
//                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData-identif').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData-identif').getStore().reload();
    },
    PadLeft: function (number, width) {
        width -= number.toString().length;
        if (width > 0){
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number + ""; // siempre devuelve tipo cadena
    },
    onClickAdd_identif: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData-identif');
        var items = grid01.getStore().data.items;
        //console.log(items);
        var VL_A3979SEQID = 0;
        items.forEach(function (rec) {            
            VL_A3979SEQID = rec.data.A3979SEQID;
        });
        VL_A3979SEQID = parseFloat(VL_A3979SEQID) + 1;        
        var beanGrid = {};
        beanGrid.A3979SEQID = this.PadLeft(VL_A3979SEQID, 3);
        beanGrid.A3979DESCR = '';
        beanGrid.A3979IDCLI = '';
        beanGrid.A3979FALTA = '';
        beanGrid.A3979FBAJA = '';
        grid01.getStore().add(beanGrid);

    },
    onClickRemove_identif: function (grid, rowIndex, colIndex) {
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
    
    search_calendario: function () {
        var bean = {};
        bean.VP_OPCION = "1";
        bean.VP_A3965CDCLI = Ext.getCmp(prototype.id + '-A3953CDCLI').getValue();
        bean.VP_A3965PERIO = "";
        bean.VP_A3965FEJEC = "2021";
        bean.limit = "-1";
        bean.page = "-1";
        //cambiar STORE ***OJO
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataIdentif', {
            proxy: {
                url: prototype.url + '/search_calendario'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found uatp'
//                        });
//                    }
                    global.clear();
                }
            }
        });        
        Ext.getCmp(prototype.id + '-gridData-GridCalendario').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData-GridCalendario').getStore().reload();
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
        //var RemovedTrack = Ext.getCmp(prototype.id + '-gridData-uatp').getStore().getTrackRemoved(); //si existe REC removed R
        var Removed = Ext.getCmp(objGrid).getStore().getRemovedRecords();
        //console.log(Removed);
        return Removed;
    },
    //No usado
    crud_uatpAdd: function () {
        var lstuatp = new Array();
        var griduatp = Ext.getCmp(prototype.id + '-gridData-uatp');
        griduatp.store.data.each(function (rec) {
            lstuatp.push({
                "A3954TCUAT": rec.data.A3954TCUAT,
                "A3954DESCR": rec.data.A3954DESCR,
                "A3954IDUAT": rec.data.A3954IDUAT,
                "A3954TCUAM": rec.data.A3954TCUAM,
                "A3954FALTA": rec.data.A3954FALTA,
                "A3954FBAJA": rec.data.A3954FBAJA
            });
        });
        Ext.Ajax.request({
            url: this.url + '/mantenimiento_uatp',
            method: 'POST',
            timeout: 60000000,
            params: {
                VP_ACTION: 'I',
                VP_A3954CDCLI: Ext.getCmp(prototype.id + '-A3953CDCLI').getValue(),
                beanuatp: JSON.stringify(lstuatp)
            },
            beforerequest: Ext.getCmp(prototype.id + '-CatalogoClienteEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-CatalogoClienteEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {
                        //exito
                        //Ext.getCmp(prototype.id + '-CatalogoClienteEntry').close();
                        //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    btnDetContrato_click:function(){
        this.winDataEntry('U');
    },
    winDataEntry: function(action) {
        action = action === null || action === undefined ? 'U' : action;        
        var VL_CDCLI = Ext.getCmp(prototype.id + '-A3953CDCLI').getValue();
        Ext.create('Ext.Praxis.view.eecta.CatalogoClienteForm.CatalogoClienteContrato', {
            id: prototype.id02 + '-CatalogoClienteContrato',
            params: {
                action: action,
                rec: {
                  CDCLI:VL_CDCLI
                }
            }
        }).show();
    }

});




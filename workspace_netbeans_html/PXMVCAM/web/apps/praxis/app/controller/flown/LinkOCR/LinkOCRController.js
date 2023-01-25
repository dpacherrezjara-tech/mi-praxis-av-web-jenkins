/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.LinkOCR.LinkOCRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LinkOCRController',
    fecha: new Date(),
    strTicket: '',
    me: '',
    imageParams: {},
    searchParams: {},
    saveParams: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'LinkOCRForm';
        prototype.url = CONTEXTPATH + '/LinkOCR';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#LinkOCRForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#LinkOCRForm-btnSearch': {
                click: this.btnSearchImage_click
            },
            '#LinkOCRForm-btnClear': {
                click: this.btnClear_click
            },
            '#LinkOCRForm-btnFilter': {
                click: this.btnFilter_click
            },
            //-----------------Eventos Especificos -------------------

            '#LinkOCRForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear
            },
            '#LinkOCRForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            },
            '#LinkOCRForm-cmbDateFromDay': {
                afterrender: this.afterRenderDay,
                select: this.btnSearchImage_click
            },
            '#LinkOCRForm-imgNext': {
                click: this.btnNext
            },
            '#LinkOCRForm-btnSave': {
                click: this.btnSave
            },
            '#LinkOCRForm-txtCDEPART': {
                change: this.onUpperValue
            },
            '#LinkOCRForm-txtCARRIVA': {
                change: this.onUpperValue
            },
            '#LinkOCRForm-cmbType': {
                change: this.cmbTypeChange
            },
            '#LinkOCRForm-txtTicket': {
                change: this.onValidarChange,
                keyup: this.eventKeySave
            }


        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusLeaveOpe: function(obj) {
        var flightNum = Ext.getCmp(prototype.id + '-txtNFLIGHT');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    },
    // ---------- Eventos de consistencia de los combos---------------
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    afterRenderDay: function(obj) {
        var dia = (this.fecha.getDay() + 1);
        if (("" + dia).length === 1) {
            dia = "0" + dia;
        }
        obj.setValue(dia);
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    }
    ,
    onValidarChange: function(obj) {
        var list = obj.getValue().replace(/\s/g, "").split("");

        var txtTicket = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txtTicket += list[i];
            }
        }
        obj.setValue(txtTicket.substring(0, 14));
    },
    esNumero: function(valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    selectComboFromMonth: function(obj) {

        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function(obj) {

        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayC');
        comboToDay.setValue(obj.getValue());
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(false);
        var storeComboDataDay = win.getStoreDays(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-txtFROM').setValue('');
        Ext.getCmp(prototype.id + '-txtTO').setValue('');
        var cmbType = Ext.getCmp(prototype.id + '-cmbType');
        cmbType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["T", "Ticket OCR"],
                ["M", "MCO/EMD"],
                ["F", "Fim"]
            ]
        }));
        cmbType.setValue("T");
    },
    cmbTypeChange: function() {
        var opc = Ext.getCmp(prototype.id + '-cmbType').getValue();
        var txtQTYPAX = Ext.getCmp(prototype.id + '-txtQTYPAX');
        var txtCARR = Ext.getCmp(prototype.id + '-txtCARR');
        var txtCARRLabel = Ext.getCmp(prototype.id + '-txtCARRLabel');
        var txtCARRLabel2 = Ext.getCmp(prototype.id + '-txtCARRLabel2');
        var txtRECODE = Ext.getCmp(prototype.id + '-txtRECODE');
        var txtRFIC = Ext.getCmp(prototype.id + '-txtRFIC');
        var txtTKTASO = Ext.getCmp(prototype.id + '-txtTKTASO');
        if (opc === 'F') {
            txtQTYPAX.setReadOnly(false);
            txtQTYPAX.setDisabled(false);
            txtCARR.hide(true);
            win.setValue('txtCARR', '');
            txtCARRLabel.hide(true);
            txtCARRLabel2.hide(true);
            txtRECODE.setReadOnly(true);
            txtRECODE.setDisabled(true);
            win.setValue('txtRECODE', '');
            txtRFIC.setReadOnly(true);
            txtRFIC.setDisabled(true);
            win.setValue('txtRFIC', '');
            txtTKTASO.setReadOnly(true);
            txtTKTASO.setDisabled(true);
            win.setValue('txtTKTASO', '');
        } else if (opc === 'T') {
            txtQTYPAX.setReadOnly(true);
            txtQTYPAX.setDisabled(true);
            win.setValue('txtQTYPAX', '');
            txtCARR.hide(true);
            win.setValue('txtCARR', '');
            txtCARRLabel.hide(true);
            txtCARRLabel2.hide(true);
            txtRECODE.setReadOnly(true);
            txtRECODE.setDisabled(true);
            win.setValue('txtRECODE', '');
            txtRFIC.setReadOnly(true);
            txtRFIC.setDisabled(true);
            win.setValue('txtRFIC', '');
            txtTKTASO.setReadOnly(true);
            txtTKTASO.setDisabled(true);
            win.setValue('txtTKTASO', '');
        } else if (opc === 'M') {
            txtQTYPAX.setReadOnly(true);
            txtQTYPAX.setDisabled(true);
            win.setValue('txtQTYPAX', '');
            txtCARR.show();
            txtCARRLabel.show();
            txtCARRLabel2.show();
            txtCARR.setReadOnly(false);
            txtCARR.setDisabled(false);
            txtRECODE.setReadOnly(false);
            txtRECODE.setDisabled(false);
            txtRFIC.setReadOnly(false);
            txtRFIC.setDisabled(false);
            txtTKTASO.setReadOnly(false);
            txtTKTASO.setDisabled(false);
        }
    }
    ,
    btnSearchImage_click: function(obj, e) {
        this.searchImage(obj, e);
    },
    setFormatParameter: function() {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var txtFROM = Ext.getCmp(prototype.id + '-txtFROM');
        var txtTO = Ext.getCmp(prototype.id + '-txtTO');
        var strFrom = '';
        var strTo = '';
        var strFechaScan = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        if (txtFROM.getValue() !== null) {
            strFrom = txtFROM.getValue();
        }
        if (txtTO.getValue() !== null) {
            strTo = txtTO.getValue();
        }
        searchParams = {
            strFechaScan: strFechaScan,
            strFrom: strFrom,
            strTo: strTo
        };
        console.log(searchParams);
        return searchParams;
    },
    searchImage: function(obj, val) {
        this.setFormatParameter();
        console.log("URL : " + prototype.url + '/searchImage');
        Ext.Ajax.request({
            url: prototype.url + '/searchImage',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: this.setFormatParameter(),
            error: function(err) {
                    lg(err);
            },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstImagenes = res.lstImagenes;
                var listaOK = res.listaOK;
                var fechaScan = res.fechaScan;
                var strImgTodas = res.strImgTodas;
                Ext.getCmp(prototype.id + '-lblCorrelativo').setText("Found :" + strImgTodas);
                me.imageParams = {
                    lstImagenes: lstImagenes,
                    fechaScan: fechaScan,
                    actual: 0
                };
                console.log('inicio imagen');
                console.log(res);
                console.log(listaOK);
                console.log(me.imageParams);
                console.log('fin imagen');
                if (lstImagenes.length > 0) {
                    me.getImagen(0, lstImagenes, fechaScan);
                } else {
                    Ext.getCmp(prototype.id + '-imgImage').setSrc('resources/img/not_picture.png');
                    global.Msg({
                        msg: 'Images Not Found for that Scan Date.'
                    });
                }

                Ext.getBody().unmask();
                global.clear();
            }
        });
    },
    getImagen: function(i, lstImagenes, fechaScan) {

        var numImagenes = lstImagenes.length;
        if (numImagenes === 0) {
            return;
        }

        if (i >= 0 && i < numImagenes) {
            var img = Ext.getCmp(prototype.id + '-pnlImage');
            var mask = new Ext.LoadMask(img, {
                msg: 'Loading...'
            });
            mask.show();
            var strImagen = lstImagenes[i];
            me.imageParams = {
                strImagen: strImagen,
                lstImagenes: lstImagenes,
                fechaScan: fechaScan,
                actual: i
            };
            Ext.Ajax.request({
                url: prototype.url + '/getImagen',
                params: {strOption: 'AM_IMG_LNK', strImagen: strImagen, fechaScan: fechaScan},
                method: 'GET',
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    res = res.data;
                    Ext.getCmp(prototype.id + '-imgImage').setSrc('data:image/jpeg;base64,' + res + '');
                    mask.hide();
                }
            });
        }
    },
    btnSave: function() {
        var ticket = Ext.getCmp(prototype.id + '-txtTicket').getValue().trim();
        var strMsgVal = '';
        if (ticket !== '' && ticket.length === 14) {
            if (this.strTicket === '') {
                this.strTicket = ticket;
                Ext.getCmp(prototype.id + '-txtTicket').setValue('');
                Ext.getCmp(prototype.id + '-txtTicket').focus();
            } else {
                if (this.strTicket === ticket) {
                    strMsgVal = this.validateParams();
                    if (strMsgVal === '') {
                        this.strTicket = '';
                        Ext.Ajax.request({
                            url: prototype.url + '/saveImg',
                            params: this.saveParams,
                            method: 'GET',
                            success: function(response, options) {
                                var res = Ext.JSON.decode(response.responseText);
                                var msg = res.msjRes;
                                me.onResultSave(msg);

                            }
                        });

                    } else {
                        global.Msg({
                            msg: strMsgVal
                        });
                    }
                } else {
                    this.strTicket = '';
                    global.Msg({
                        msg: 'The Ticket Number entered is not the same.'
                    });
                }
            }

        } else {
            global.Msg({
                msg: 'Invalid Ticket Number.'
            });
        }

    },
    onResultSave: function(msj) {

        console.log(msj);
        if (msj.indexOf('SECUENCIA 00 ENCONTRADA') !== -1) {
            msj = msj + ". Desea ingresar duplicado VOLADO como secuencia 99?";
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: msj,
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.saveDuplicated();
                    }
                }
            });
        } else {
            global.Msg({
                msg: msj
            });
            if (msj.indexOf('success', 0) !== -1 || msj.indexOf('correctly', 0) !== -1) {
                //Si se guardó correctamente pasa la siguiente imagen
                global.Msg({
                    msg: "Successful saving"
                });
                me.btnNext();
                Ext.getCmp(prototype.id + '-txtTicket').setValue('');
                Ext.getCmp(prototype.id + '-txtTicket').focus();
            }
        }

    },
    saveDuplicated: function() {
        Ext.Ajax.request({
            url: prototype.url + '/saveDupli',
            params: this.saveParams,
            method: 'GET',
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msjRes;

                global.Msg({
                    msg: msg
                });
                if (msg.indexOf('success', 0) !== -1 || msg.indexOf('correctly', 0) !== -1) {
                    //Si se guardó correctamente pasa la siguiente imagen
                    me.btnNext();
                    Ext.getCmp(prototype.id + '-txtTicket').setValue('');
                    Ext.getCmp(prototype.id + '-txtTicket').focus();
                }

            }
        });
    },
    validateParams: function() {
        var strMsg = '';
        //Comentado a criterio mio(SAP08) en ccordinación con ENS 20150904
        /*if(app.trim(txtPRDA.text) == '' && txtDFLIGHT.text.length == 8){
         beanOption.FCONT = app.trim(txtDFLIGHT.text);
         }else{
         beanOption.FCONT = app.trim(txtPRDA.text);
         }*/



        var strTicket = Ext.getCmp(prototype.id + '-txtTicket').getValue().trim();
        var CDEPART = Ext.getCmp(prototype.id + '-txtCDEPART').getValue().toUpperCase().trim();
        var CARRIVA = Ext.getCmp(prototype.id + '-txtCARRIVA').getValue().toUpperCase().trim();
        var NFLIGHT = global.fillZero(Ext.getCmp(prototype.id + '-txtNFLIGHT').getValue(), 4).trim();
        var DFLIGHT = Ext.getCmp(prototype.id + '-txtDFLIGHT').getValue().trim();
        var TDOC = Ext.getCmp(prototype.id + '-cmbType').getValue().trim();
        var QTYPAX = Ext.getCmp(prototype.id + '-txtQTYPAX').getValue().trim();
        if (QTYPAX === '') {
            QTYPAX = '0';
        }
        //beanOption.QTYPAX = Number(app.trim(txtQTYPAX.text).replace(',', '').replace('.', ''));
        var FBASE = Ext.getCmp(prototype.id + '-txtFBASE').getValue().trim();
        var CLAS = Ext.getCmp(prototype.id + '-txtCLAS').getValue().trim();
        var CABI = Ext.getCmp(prototype.id + '-txtCABI').getValue().trim();
        var CARR = Ext.getCmp(prototype.id + '-txtCARR').getValue().trim();
        var FOPERZUL = Ext.getCmp(prototype.id + '-txtFOPERZUL').getValue().trim();
        var RECODE = Ext.getCmp(prototype.id + '-txtRECODE').getValue().trim();
        var RFIC = Ext.getCmp(prototype.id + '-txtRFIC').getValue().trim();
        var TKTASO = Ext.getCmp(prototype.id + '-txtTKTASO').getValue().trim();
        if (FOPERZUL === '') {
            FOPERZUL = DFLIGHT;
        }

        if (strTicket !== '' && CDEPART !== '' && CARRIVA !== '' && NFLIGHT !== '' && DFLIGHT !== '') {
            if (CDEPART.length !== 3) {
                strMsg = "Invalid Departure City.";
                return strMsg;
            }
            if (CARRIVA.length !== 3) {
                strMsg = "Invalid Arrival City.";
                return strMsg;
            }
            if (!Ext.getCmp(prototype.id + '-txtDFLIGHT').isValid()) {
                strMsg = "Invalid Flight Number.";
                return strMsg;
            }
            if (TDOC === 'M') {
                if (CARR === '') {
                    strMsg = "Carrier value is required.";
                    return strMsg;
                }
            }
//            if (msjResult == '') {
//                var fechaHoy:String = Util.parseStringToDate(app.getToday());
//                        if (Number(beanOption.DFLIGHT) > Number(fechaHoy)) {
//                    msjResult = "Flight Date cannot be higher than Current Date";
//                }
//            }
            if (Ext.getCmp(prototype.id + '-cmbType').getValue() === 'E') {
                if (Ext.getCmp(prototype.id + '-txtTKTASO').getValue().length < 13) {
                    strMsg = "Invalid Associate ticket Number.";
                    return strMsg;
                }
            }
        } else {
            strMsg = "You must enter all required fields.";
        }



        if (strMsg === "") {
            this.saveParams = {
                strTicket: strTicket,
                CDEPART: CDEPART,
                CARRIVA: CARRIVA,
                NFLIGHT: NFLIGHT,
                DFLIGHT: DFLIGHT,
                TDOC: TDOC,
                QTYPAX: QTYPAX,
                FBASE: FBASE,
                CLAS: CLAS,
                CABI: CABI,
                CARR: CARR,
                FOPERZUL: FOPERZUL,
                RECODE: RECODE,
                RFIC: RFIC,
                TKTASO: TKTASO,
                fechaScaneo: me.imageParams.fechaScan,
                source: me.imageParams.strImagen
            };
        }
        console.log(this.saveParams);
        return strMsg;
    }
    ,
    btnNext: function() {
        this.imageParams.actual++;
        me.getImagen(this.imageParams.actual, this.imageParams.lstImagenes, this.imageParams.fechaScan);
    }
    ,
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.searchImage();
        }
    },
    eventKeySave: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSave();
        }
    },
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var txtFROM = Ext.getCmp(prototype.id + '-txtFROM');
        var txtTO = Ext.getCmp(prototype.id + '-txtTO');
        var imgImage = Ext.getCmp(prototype.id + '-imgImage').setSrc('resources/img/not_picture.png');
        yearFrom.setValue(this.fecha.getFullYear());

        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            monthFrom.setValue('0' + month);
        } else {
            monthFrom.setValue((month));
        }
        dayFrom.setValue(this.fecha.getDay());
        txtFROM.setValue("");
        txtTO.setValue("");
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-txtCDEPART').setValue('');
        Ext.getCmp(prototype.id + '-txtCARRIVA').setValue('');
        Ext.getCmp(prototype.id + '-txtNFLIGHT').setValue('');
        Ext.getCmp(prototype.id + '-txtDFLIGHT').setValue('');
        Ext.getCmp(prototype.id + '-cmbType').setValue('T');
        Ext.getCmp(prototype.id + '-txtQTYPAX').setValue('0');
        Ext.getCmp(prototype.id + '-txtFBASE').setValue('');
        Ext.getCmp(prototype.id + '-txtCARR').setValue('');
        Ext.getCmp(prototype.id + '-txtCLAS').setValue('');
        Ext.getCmp(prototype.id + '-txtCABI').setValue('');
        Ext.getCmp(prototype.id + '-txtFOPERZUL').setValue('');
        Ext.getCmp(prototype.id + '-txtRECODE').setValue('');
        Ext.getCmp(prototype.id + '-txtRFIC').setValue('');
        Ext.getCmp(prototype.id + '-txtTKTASO').setValue('');
    }

    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-panelDateFilters');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    },
    btnBack_click: function(obj, e) {
        var heightMenu = 400;
        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
    }
});

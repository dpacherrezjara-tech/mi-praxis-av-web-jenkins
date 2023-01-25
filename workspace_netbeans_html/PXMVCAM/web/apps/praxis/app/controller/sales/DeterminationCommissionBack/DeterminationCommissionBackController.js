/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.DeterminationCommissionBack.DeterminationCommissionBackController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeterminationCommissionBackController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'DeterminationCommissionBackForm';
        prototype.url = CONTEXTPATH + '/DeterminationCommissionBack';
        me = this;
        me.gridActual = '-gridData';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#DeterminationCommissionBackForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DeterminationCommissionBackForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DeterminationCommissionBackForm-btnClear': {
                click: this.btnClear_click
            },
            '#DeterminationCommissionBackForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DeterminationCommissionBackForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DeterminationCommissionBackForm-btnBack': {
                click: this.btnBack_click
            },
            //-----------------Eventos Especificos -------------------            
            '#DeterminationCommissionBackForm-cmbtypeperiod': {
                change: this.onChangePeriod
            },
            '#DeterminationCommissionBackForm-cmbSelectBy': {
                change: this.onChangeSelectBy
            },
            '#DeterminationCommissionBackForm-txtChema': {
                change: this.onChangeSchema
            },
            '#DeterminationCommissionBackForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear
            }

        });
    },
    xpanel_afterrender: function(obj, e) {

        this.setStoreData();
        //this.btnSearch_click();
    },
    hideComponents: function() {
        Ext.getCmp(prototype.id + '-txtLABEL').hide();
        Ext.getCmp(prototype.id + '-txtIATA').hide();
        Ext.getCmp(prototype.id + '-txtTicket').hide();
        Ext.getCmp(prototype.id + '-cmbSelectTypeIATA').hide();
        Ext.getCmp(prototype.id + '-txtProccess').hide();
        Ext.getCmp(prototype.id + '-txtIATAH').hide();
        Ext.getCmp(prototype.id + '-cmbEnvironment').hide();
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);

        var cmbtypeperiod = Ext.getCmp(prototype.id + '-cmbtypeperiod');
        cmbtypeperiod.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["M", "MONTHLY"],
                ["B", "BIMESTER"],
                ["Q", "QUARTERLY"],
                ["S", "SEMESTER"]
            ]
        }));
        cmbtypeperiod.setValue("Q");

        var cmbPeriod = Ext.getCmp(prototype.id + '-cmbPeriod');
        cmbPeriod.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "1ST QUARTER"],
                ["2", "2ND QUARTER"],
                ["3", "3RD QUARTER"],
                ["4", "4TH QUARTER"]
            ]
        }));
        cmbPeriod.setValue("1");
        var cmbSelectTypeIATA = Ext.getCmp(prototype.id + '-cmbSelectTypeIATA');
        cmbSelectTypeIATA.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["H", "IATA Home"]
            ]
        }));
        cmbSelectTypeIATA.setValue("");
        var cmbSelectBy = Ext.getCmp(prototype.id + '-cmbSelectBy');
        cmbSelectBy.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["3", "IATA Home"],
                ["2", "Ticket"],
                ["4", "IATA"]
            ]
        }));
        cmbSelectBy.setValue("3");
        var cmbEnvironment = Ext.getCmp(prototype.id + '-cmbEnvironment');
        cmbEnvironment.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["P", "Production"],
                ["T", "Testing"]
            ]
        }));
        cmbEnvironment.setValue("P");

        Ext.Ajax.request({
            url: prototype.url + '/getListCountry',
            method: 'POST',
            timeout: 60000000,
            params: '',
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...', ''),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-centerC').unmask('Loading...', '');
                var res = Ext.JSON.decode(response.responseText);
                var listaPaises = res.listaPaises;
                var storeData = Ext.create('Ext.data.Store', {
                    data: listaPaises,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbPais').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbPais').setValue('');
            }
        });
        Ext.Ajax.request({
            url: prototype.url + '/getListSchema',
            method: 'POST',
            timeout: 60000000,
            params: {
                VP_CIA: '139',
                A2845INDAC: 'B'
            },
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...', ''),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-centerC').unmask('Loading...', '');
                var res = Ext.JSON.decode(response.responseText);
                var listaEsquema = res.listaEsquema;
                console.log(listaEsquema);
                var storeData = Ext.create('Ext.data.Store', {
                    data: listaEsquema,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-txtChema').bindStore(storeData);
                Ext.getCmp(prototype.id + '-txtChema').setValue('');
            }
        });

    },
    onChangeSelectBy: function(obj, value) {
        this.hideComponents();
        switch (value) {
            case '3':
                Ext.getCmp(prototype.id + '-txtIATA').show();
                Ext.getCmp(prototype.id + '-cmbSelectTypeIATA').show();
                Ext.getCmp(prototype.id + '-txtChema').show();
                Ext.getCmp(prototype.id + '-txtProccess').show();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-cmbEnvironment').show();
                Ext.getCmp(prototype.id + '-txtTicket').show();
                break;
            case '4':
                Ext.getCmp(prototype.id + '-txtIATAH').show();
                Ext.getCmp(prototype.id + '-txtIATA').show();
                break;
        }
    },
    onChangeSchema: function(obj, value) {
        var schema = Ext.getCmp(prototype.id + '-txtChema').getValue();
        var VP_CIA = schema.substring(0, 3);
        var VP_CODAC = schema.substring(3, 9);
        var VP_INDAC = schema.substring(9, 10);
        var VP_VRSAC = schema.substring(10, 14);
        var VP_NAME = '';

        console.log(" VP_CIA :" + VP_CIA);
        console.log(" VP_CODAC :" + VP_CODAC);
        console.log(" VP_INDAC :" + VP_INDAC);
        console.log(" VP_VRSAC :" + VP_VRSAC);
        console.log(" VP_NAME :" + VP_NAME);
        Ext.Ajax.request({
            url: prototype.url + '/getListTypeProccessCMB',
            method: 'POST',
            timeout: 60000000,
            params: {
                VP_CIA: VP_CIA,
                VP_CODAC: VP_CODAC,
                VP_INDAC: VP_INDAC,
                VP_VRSAC: VP_VRSAC,
                VP_NAME: VP_NAME
            },
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...', ''),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-centerC').unmask('Loading...', '');
                var res = Ext.JSON.decode(response.responseText);
                var listaProc = res.listaProc;
                console.log(listaProc);
                var storeData = Ext.create('Ext.data.Store', {
                    data: listaProc,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-txtProccess').bindStore(storeData);
                Ext.getCmp(prototype.id + '-txtProccess').setValue('');
            }
        });

    },
    onChangePeriod: function(obj, value) {
        var cmbPeriod = Ext.getCmp(prototype.id + '-cmbPeriod');
        switch (value) {
            case 'M':
                cmbPeriod.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["1", "Jan"],
                        ["2", "Feb"],
                        ["3", "Mar"],
                        ["4", "Apr"],
                        ["5", "May"],
                        ["6", "Jun"],
                        ["7", "Jul"],
                        ["8", "Aug"],
                        ["9", "Sep"],
                        ["10", "Oct"],
                        ["11", "Nov"],
                        ["12", "Dec"]
                    ]
                }));
                cmbPeriod.setValue("1");
                break;
            case 'B':
                cmbPeriod.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["1", "1ST BIMESTER"],
                        ["2", "2ND BIMESTER"],
                        ["3", "3ER BIMESTER"],
                        ["4", "4TO BIMESTER"],
                        ["5", "5TO BIMESTER"],
                        ["6", "6TO BIMESTER"]
                    ]
                }));
                cmbPeriod.setValue("1");
                break;
                break;
            case 'Q':
                cmbPeriod.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["1", "1ST QUARTER"],
                        ["2", "2ND QUARTER"],
                        ["3", "3RD QUARTER"],
                        ["4", "4TH QUARTER"]
                    ]
                }));
                cmbPeriod.setValue("1");
                break;
            case 'S':
                cmbPeriod.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["1", "1ST SEMESTRE"],
                        ["2", "2ND SEMESTRE"]
                    ]
                }));
                cmbPeriod.setValue("1");
                break;
        }

    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        var msj = this.validParams();
        if (msj === '') {
            this.setGridData(obj, e);
        } else {
            global.Msg({
                msg: msj
            });
        }
    },
    validParams: function() {
        var msj = '';
        var params = searchParams;
        console.log('------------');
        console.log(params);

        if (params.FLAG === '1') {
            if (params.TRANSACTION === '') {
                msj = 'Selected Transaction';
                return msj;
            }
            if (params.TKT.length < 13) {
                msj = 'Enter a Valid Ticket';
                return msj;
            }
            if (params.SEQ.length < 2) {
                msj = 'Enter a Valid Sequence';
                return msj;
            }

//            	lblMessage.includeInLayout = false;
// 		lblMessage.visible = false;
// 		txtMessage.includeInLayout = false;
// 		txtMessage.visible = false;
// 		txtMessage.text = '';
//	 	totalTicket.visible = false;
//		lblTotalTicket.text = '';
//		if(lstData!=null)lstData.removeAll();
//		if(lstTkt!=null)lstTkt.removeAll();            
        }
        else {
            if (params.FLAG === '2' || params.FLAG === '3') {
                if (params.FROM.length !== 8) {
                    msj = 'Selected Date From';
                    return msj;
                }
                if (params.TO.length !== 8) {
                    msj = 'Selected Date To';
                    return msj;
                }

                if (params.FUENTE === 'BSP') {
                    me.searchParams.PAIS = Ext.getCmp(prototype.id + '-txtPais').getValue();
                }
                if (params.FUENTE === 'ASR') {
                    me.searchParams.CHANNEL = Ext.getCmp(prototype.id + '-cmbChannel').getValue();
                }
                if (params.TRANSACTION === '') {
                    msj = 'Selected Transaction';
                    return msj;
                }
                if (params.FLAG === '3') {
                    if (Ext.getCmp(prototype.id + '-txtSeqTran').getValue() === '') {
                        msj = 'Enter the Sequence Transaction';
                        return msj;
                    } else {
                        me.searchParams.SEQTRAN = Ext.getCmp(prototype.id + '-txtSeqTran').getValue();
                    }
                }
            }
        }

        return msj;
    },
   
    setFormatParameter: function() {

        var AIRLINE = '139';
        var MODE = Ext.getCmp(prototype.id + '-cmbMode').getValue();
        var TRANSACTION = Ext.getCmp(prototype.id + '-cmbTransaction').getValue();
        var TKT = Ext.getCmp(prototype.id + '-txtCia').getValue().trim() + Ext.getCmp(prototype.id + '-txtTicket').getValue().trim();
        var SEQ = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var CUPON1 = Ext.getCmp(prototype.id + '-txtCupon1').getValue();
        var CUPON2 = Ext.getCmp(prototype.id + '-txtCupon2').getValue();
        var CUPON3 = Ext.getCmp(prototype.id + '-txtCupon3').getValue();
        var CUPON4 = Ext.getCmp(prototype.id + '-txtCupon4').getValue();
        var FROM = Ext.getCmp(prototype.id + '-txtFPRDA_FROM').getValue();
        var TO = Ext.getCmp(prototype.id + '-txtFPRDA_TO').getValue();
        var FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        var PAIS = '';
        var CHANNEL = Ext.getCmp(prototype.id + '-cmbChannel').getValue();
        var STERROR = Ext.getCmp(prototype.id + '-rbgCtlStpro').lastValue.rb;
        var FLAG = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var SEQTRAN = 0;


        FROM = Ext.util.Format.date(FROM, 'Ymd');
        TO = Ext.util.Format.date(TO, 'Ymd');
        if (MODE === '1') {
            MODE = 'VIEW ACCU';
        }
        if (MODE === '2') {
            MODE = 'PRO10253';
        }
        if (MODE === '3') {
            MODE = '';
        }


        searchParams = {
            AIRLINE: AIRLINE,
            MODE: MODE,
            TRANSACTION: TRANSACTION,
            TKT: TKT,
            SEQ: SEQ,
            CUPON1: CUPON1,
            CUPON2: CUPON2,
            CUPON3: CUPON3,
            CUPON4: CUPON4,
            FROM: FROM,
            TO: TO,
            FUENTE: FUENTE,
            PAIS: PAIS,
            CHANNEL: CHANNEL,
            STERROR: STERROR,
            FLAG: FLAG,
            SEQTRAN: SEQTRAN

        };

    },
   
    setGridData: function(obj, val) {
//        Ext.Ajax.request({
//            url: this.url + '/search',
//            method: 'POST',
//            timeout: 60000000,
//            params: me.searchParams,
//            success: function(response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                var lstData = res.lstData;
//
//                if (lstData.lenght > 0) {
//                    var storeData = Ext.create('Ext.data.Store', {
//                        data: lstData,
//                        autoLoad: true
//                    });
//                    Ext.getCmp(prototype.id + '-gridData').bindStore(storeData);
//                    
//                    
//                    
//                    
//                    
//                } else {
//                    global.Msg({
//                        msg: 'Data not found.'
//                    });
//                }
//
//
//
//            }
//        });
        if (searchParams.FLAG === '1') {

            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ViewTicketAccounting.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        console.log(obj.data.length === 0);
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var bean = obj.data.items[0].data;
                            me.setData(bean);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridDatas);
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ViewTicketAccounting.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        console.log(obj.data.length === 0);
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(obj.data.length, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var bean = obj.data.items[0].data;
                        }
                    }
                }
            });
            global.clear();

            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            var storeData = Ext.create('Ext.data.Store', {
                data: {},
                autoLoad: true
            });
            this.clearField();
            Ext.getCmp(prototype.id + '-gridData2').bindStore(storeData);
        }


    },
    setData: function(bean) {
        if (searchParams.FLAG === '1') {
            Ext.getCmp(prototype.id + '-txtGRUPO').setValue(bean.GRUPO.trim());
            Ext.getCmp(prototype.id + '-txtSTGRUPO').setValue(bean.STATUS.trim());
            Ext.getCmp(prototype.id + '-txtSOURCE').setValue(bean.FUENTE.trim());
            Ext.getCmp(prototype.id + '-txtCOUNTRY').setValue(bean.PAIS.trim());
            Ext.getCmp(prototype.id + '-txtSUBSOURCE').setValue(bean.SUBFUENTE.trim());
            Ext.getCmp(prototype.id + '-txtCURRENCY').setValue(bean.MONEDA.trim());
            Ext.getCmp(prototype.id + '-txtIATA').setValue(bean.IATA.trim());
            Ext.getCmp(prototype.id + '-txtPNR').setValue(bean.PNR.trim());
            Ext.getCmp(prototype.id + '-txtTRNN').setValue(bean.TRANSACTION.trim());
            Ext.getCmp(prototype.id + '-txtCIATKT').setValue(bean.TKT.substr(0, 3));
            Ext.getCmp(prototype.id + '-txtTKT').setValue(bean.TKT.substr(3, 10));
            Ext.getCmp(prototype.id + '-txtSQ').setValue(bean.SEQ);
        }
    },    
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.gridActual = me.drillDown.pop();
            this.showGridActual();
            this.getPaggin();
            var pag = Ext.getCmp(prototype.id + me.pagginActual);
            var pagData = pag.getPageData();
            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbDate').setValue("");
        Ext.getCmp(prototype.id + '-cmbMode').setValue("1");
        Ext.getCmp(prototype.id + '-txtCia').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-txtSeq').setValue('');
        Ext.getCmp(prototype.id + '-txtSeqTran').setValue('');
        Ext.getCmp(prototype.id + '-txtFPRDA_FROM').setValue('');
        Ext.getCmp(prototype.id + '-txtFPRDA_TO').setValue('');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        //Ext.getCmp(prototype.id + '-rbgCtlStpro').;
        Ext.getCmp(prototype.id + '-txtTotalTran').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon1').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon2').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon3').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon4').setValue('');
        Ext.getCmp(prototype.id + '-txtPais').setValue('');
        Ext.getCmp(prototype.id + '-cmbChannel').setValue('');

        Ext.getCmp(prototype.id + '-cmbTransaction').setValue('SALE');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        Ext.getCmp(prototype.id + '-txtGRUPO').setValue("");
        Ext.getCmp(prototype.id + '-txtSTGRUPO').setValue("");
        Ext.getCmp(prototype.id + '-txtSOURCE').setValue("");
        Ext.getCmp(prototype.id + '-txtSUBSOURCE').setValue("");
        Ext.getCmp(prototype.id + '-txtCOUNTRY').setValue("");
        Ext.getCmp(prototype.id + '-txtCURRENCY').setValue("");
        Ext.getCmp(prototype.id + '-txtIATA').setValue("");
        Ext.getCmp(prototype.id + '-txtPNR').setValue("");
        Ext.getCmp(prototype.id + '-txtTRNN').setValue("");
        Ext.getCmp(prototype.id + '-txtCIATKT').setValue("");
        Ext.getCmp(prototype.id + '-txtTKT').setValue("");
        Ext.getCmp(prototype.id + '-txtSQ').setValue("");

    },
    clearField: function() {
        Ext.getCmp(prototype.id + '-txtGRUPO').setValue("");
        Ext.getCmp(prototype.id + '-txtSTGRUPO').setValue("");
        Ext.getCmp(prototype.id + '-txtSOURCE').setValue("");
        Ext.getCmp(prototype.id + '-txtSUBSOURCE').setValue("");
        Ext.getCmp(prototype.id + '-txtCOUNTRY').setValue("");
        Ext.getCmp(prototype.id + '-txtCURRENCY').setValue("");
        Ext.getCmp(prototype.id + '-txtIATA').setValue("");
        Ext.getCmp(prototype.id + '-txtPNR').setValue("");
        Ext.getCmp(prototype.id + '-txtTRNN').setValue("");
        Ext.getCmp(prototype.id + '-txtCIATKT').setValue("");
        Ext.getCmp(prototype.id + '-txtTKT').setValue("");
        Ext.getCmp(prototype.id + '-txtSQ').setValue("");
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function() {

        switch (me.gridActual) {
            case  '-gridData':
//                global.getFile(prototype.url + '/getXLSX?IN_A1879CCUST=' + searchParams.IN_A1879CCUST
//                        + '&IN_A1879FECHA=' + searchParams.IN_A1879FECHA
//                        + '&IN_A1879PERIO=' + searchParams.IN_A1879PERIO);
//                break;
        }
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    }

});

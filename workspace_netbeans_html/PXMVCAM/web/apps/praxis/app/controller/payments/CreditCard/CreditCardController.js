/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.CreditCard.CreditCardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CreditCardController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    init: function(view) {
        me = this;
        prototype.id = 'CreditCardForm';
        prototype.url = CONTEXTPATH + '/CreditCard';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();

        this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#CreditCardForm-xpanel': {
//                afterrender: this.xpanel_afterrender            
//            },
            '#CreditCardForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CreditCardForm-btnClear': {
                click: this.btnClear_click
            },
            '#CreditCardForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CreditCardForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CreditCardForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CreditCardForm-btnBack': {
                click: this.btnBack_click
            },
            '#CreditCardForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CreditCardForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CreditCardForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CreditCardForm-btn-pag-last': {
                click: this.pagLast
            }
//            //-----------------Eventos Especificos -------------------    
//
//
        });
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onChangeCmbType: function(obj, value) {

        Ext.getCmp(prototype.id + '-panelFilter1').hide();
        Ext.getCmp(prototype.id + '-panelFilter2').hide();
        Ext.getCmp(prototype.id + '-panelFilter3').hide();
        Ext.getCmp(prototype.id + '-panelFilter4').hide();
        Ext.getCmp(prototype.id + '-panelFilter5').hide();
        Ext.getCmp(prototype.id + '-panelFilter6').hide();
        Ext.getCmp(prototype.id + '-panelFilter7').hide();
        Ext.getCmp(prototype.id + '-panelFilter8').hide();

        if (value !== '') {
            Ext.getCmp(prototype.id + '-panelFilter' + value).show();
        }

    },
    cmbTranType_changeHandler: function() {
        this.btnSearch_click();
    },
    obtainData: function() {

        var cmbCurrency = Ext.getCmp(prototype.id + '-cmbCurrency');
        cmbCurrency.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["USD", "USD"],
                ["EUR", "EUR"],
                ["MXN", "MXN"]
            ]
        }));
        cmbCurrency.setValue("");

        this.dataObtain.COUNTRY = 2;
        this.dataObtain.CARD = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    me.lstCountry = res.lstCountry;
                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                    Ext.getCmp(prototype.id + '-cmbCode').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbCode').setValue('');
                    me.btnSearch_click();

                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    setFormatParameter: function() {

        me.bean = {};
        me.bean.CODE = Ext.getCmp(prototype.id + '-cmbCode').getValue();
        me.bean.CURRENC = Ext.getCmp(prototype.id + '-cmbCurrency').getValue();
        me.bean.COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
//        console.log(searchParams);
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        var check = Ext.getCmp(prototype.id + '-rbgType').getValue();
        if (check.rbgType === 'CARD') {
            console.log('CARD');
            this.setGridData();
        } else {
            console.log('COMM');
            this.setGridDataComm();
        }

    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: A2280");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });

//            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAirport').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>

    setGridDataComm: function() {
        win.lblUser_toolTip("Estructura: A2280");
        me.panelActual = '-boxCommData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();
        this.setFormatParameter();

//        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
//            proxy: {
//                url: prototype.url + '/searchComm'
//            }, listeners: {
//                beforeload: function(obj) {
//                    obj.proxy.extraParams = searchParams;
//                },
//                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found.'
//                        });
//                    }
//                }
//            }
//        });
//
//        global.clear();
//        Ext.getCmp(prototype.id + '-gridCommData').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);


        var cadena = searchParams.beanString;

        Ext.Ajax.request({
            url: prototype.url + '/searchComm',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            params: {beanString: cadena},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);


                if (res.data.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                } else {
//                    me.drillDown.push(me.panelActual);
//                    me.panelActual = '-boxCardData';
//                    global.selectedChild(me.childs, prototype.id + me.panelActual);

//                    var data = res.data[0];
                    var lstData = res.data;
                    console.log(lstData);
//                    console.log(data.lngTotDocs);
//                    var bean = res.data.items[0].data;

                    var a = [];
                    var dataRoot = {text: '.', expanded: false, children: []};

                    Ext.Object.each(lstData, function(index, value) {
//                        console.log(value);
                        if (a.indexOf(value.strAgrupacion) < 0) {
                            var x = [];

                            var TOT_pos = 0;
                            var TOT_VFOP = 0;
                            var TOT_TOTCUP = 0;
                            var TOT_AUTAMOUNT = 0;

                            a.push(value.strAgrupacion);                            
                            dataRoot.children.push({
                                strAgrupacion: value.strAgrupacion.substr(0,18),
                                COUNTRY: '',
                                CODEBANK: '',
                                CODE: '',
                                CURRENC: '',
                                TCOMIS: '',
                                DCOMIS: '',
                                FECFROM: value.FECFROM,
                                FECTO: value.FECTO,
                                BASEC: '',
                                RATE: '',
                                RATEIVA: '',
                                MONTO: '',
                                MESES: '',
                                CODEQUIV: '',
                                expanded: false, children: []
                            });
                            var b = [];
                            Ext.Object.each(lstData, function(index, value01) {
                                if (value.strAgrupacion === value01.strAgrupacion) {
                                    dataRoot.children[a.indexOf(value.strAgrupacion)].children.push({
                                        strAgrupacion: value01.strAgrupacion.substr(0,18),
                                        COUNTRY: value01.COUNTRY,
                                        CODEBANK: value01.CODEBANK,
                                        CODE: value01.CODE,
                                        CURRENC: value01.CURRENC,
                                        TCOMIS: value01.TCOMIS,
                                        DCOMIS: value01.DCOMIS,
                                        FECFROM: value01.FECFROM,
                                        FECTO: value01.FECTO,
                                        BASEC: value01.BASEC,
                                        RATE: value01.RATE,
                                        RATEIVA: value01.RATEIVA,
                                        MONTO: value01.MONTO,
                                        MESES: value01.MESES,
                                        CODEQUIV: value01.CODEQUIV,
                                        leaf: true
                                    });
                                }
                            });
                        }
                    });
                    console.log(dataRoot);

                    var storeTree = Ext.create('Ext.data.TreeStore', {
                        root: dataRoot
                    });

                    console.log(storeTree);

                    Ext.getCmp(prototype.id + '-gridCommData').setStore(storeTree);
                }

            }
        });


    },
    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function() {
        var check = Ext.getCmp(prototype.id + '-rbgType').getValue();
        if (check.rbgType === 'CARD') {
            console.log('CARD');
            this.winDataEntry('I');
        } else {
            console.log('COMM');
            this.winDataEntry2('I');
        }
        
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.CreditCardForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    onEditClick2: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.data.children === null || rec.data.children === undefined) {
            this.winDataEntry2('U', rec);
        } else {
            global.Msg({msg: 'Please Select Detail'});
        }
    },
    winDataEntry2: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.CreditCardForm.DataEntryComm', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();

            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
        Ext.getCmp(prototype.id + '-cmbCurrency').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

    },
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
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
        }
    },
    exportExcel: function() {

        this.setFormatParameter();
//        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    onDownloadFile: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function(obj) {
//        console.log('btnFilter_click');
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case  '-boxCommData':
//                me.pagginActual = '-paggin';
                break;
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


}
);

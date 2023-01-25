/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.LastConciliation.LastConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LastConciliationController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    reg99: 0,
    me: '',
    dup: '',
    searchParams: {},
    paramsObtainData: {},
    beanProMasterTicket: {},
    paramsDetail: {},
    paramsDetailCard: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    beanDetCard: {},
    dataGrid: [],
    init: function(view) {
        me = this;
        prototype.id = 'LastConciliationForm';
        prototype.url = CONTEXTPATH + '/LastConciliation';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        prototypeProgram.view = 'payments-last-conciliation-form';
        prototypeProgram.nprog = 'PX00000565';
        prototypeProgram.title = 'Last Conciliation with Sales';
        prototypeProgram.modulo = '';


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#LastConciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#LastConciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#LastConciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#LastConciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#LastConciliationForm-btnMassiveEmission': {
                click: this.btnMassiveEmission_click
            },
            '#LastConciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#LastConciliationForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#LastConciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#LastConciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#LastConciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#LastConciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#LastConciliationForm-btn-pag-last': {
                click: this.pagLast
            },
//            '#LastConciliationForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
//                select: this.selectComboFromYear
//            },
//            '#LastConciliationForm-cmbDateToYear': {
//                afterrender: this.afterRenderYear
//            },
            '#LastConciliationForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            },
            '#LastConciliationForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            }
//            '#LastConciliationForm-cmbDateFromDay': {
//                select: this.selectComboFromDay
//            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        //var option = Ext.getCmp(prototype.id + '-contFilter');
        //option.setVisible(false);
        this.obtainData();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    obtainData: function() {
        
        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);
        
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbSVFOPSG');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["+", "+"],
                ["-", "-"],
            ]
        }));
        cmbFecFiltro.setValue("+");

        var cmbSTAAVIS = Ext.getCmp(prototype.id + '-cmbSTAAVIS');
        cmbSTAAVIS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["9", "All"],
                ["", "Pending"],
                ["0", "Emission"],
                ["1", "Payment"],
                ["2", "Reject"],
            ]
        }));
        cmbSTAAVIS.setValue("9");

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SDATE", "Sales Date"],
                ["DATAVIS", "Notice Date"]
            ]
        }));
        cmbFecFiltro.setValue("SDATE");

        this.paramsObtainData.BANK = 2;
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.CARD = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            //beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function(response, options) {
                //Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);


                me.lstBank = res.lstBank;
                me.lstCard = res.lstCard;
                me.lstCountry = res.lstCountry;

                var storeData2 = Ext.create('Ext.data.Store', {
                    data: me.lstCard,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-cmbCardType').bindStore(storeData2);
                Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
                global.clear();
                //me.btnSearch_click();
            }
        });

        this.btnSearch_click();
    },
    setFormatParameter: function() {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCardType').getValue();
        me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        me.bean.IN_SVFOPSG = Ext.getCmp(prototype.id + '-cmbSVFOPSG').getValue();
        me.bean.IN_STAAVIS = Ext.getCmp(prototype.id + '-cmbSTAAVIS').getValue();
        me.bean.IN_SPNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
        me.bean.strFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    BuscarPNR_keyDownHandler: function(obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                if (Ext.getCmp(prototype.id + '-txtPNR').getValue().length === 6) {
                    this.btnSearch_click();
                } else {
                    global.Msg({
                        msg: 'PNR must contain 6 characters.'
                    });
                }
                break;
        }
    },
    txtFilterValue_keyDownHandler: function(obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                this.btnSearch_click();
                break;
        }
    },
    buscarCard_keyDownHandler: function(e, eOpts, a, b, c) {
        if (Ext.getCmp(prototype.id + '-txtCard1').getValue() !== '' || Ext.getCmp(prototype.id + '-txtCard2').getValue() !== '') {
//            console.log(eOpts.getKey());
            switch (eOpts.getKey()) {
                case 13:
                    if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim().length === 6
                            && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                        //this.eventKey(e, eOpts);
                        this.btnSearch_click();
                    } else {
                        global.Msg({
                            msg: 'Credit Card Number must contain 10 digits.'
                        });
                        //Ext.getCmp(prototype.id + '-txtCard1').setValue('');
                        //Ext.getCmp(prototype.id + '-txtCard2').setValue('');
                    }
            }
        } else {
            global.Msg({
                msg: 'Credit Card Number must contain 10 digits.'
            });
            //Ext.getCmp(prototype.id + '-txtCard1').setValue('');
            //Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        }
    },
    tarjeta_keyDownHandler: function(e, eOpts) {
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus();
            }
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        //this.paramsDetail.beanString = JSON.stringify(me.bean);
        this.setGridData();
    },
    setGridData: function() {
        win.lblUser_toolTip("Estructura: A3800");

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridMainData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    OnGridDetCard: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxCardData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetCard.IN_SDATE = rowData.data.SDATE;
        this.beanDetCard.IN_CARDN = rowData.data.SCARDN;
        this.beanDetCard.IN_SAUTHOC = rowData.data.SAUTHOC;
        console.log(this.beanDetCard)
        me.paramsDetailCard.beanString = JSON.stringify(this.beanDetCard);
        this.SetOnGridDetCardA2290();
        this.SetOnGridDetCardA2291();
        Ext.getCmp(prototype.id + '-gridCardDataA2290').setTitle('<center style="font-size:12px;">' + 'Sales Reconciliation By Ticket' + '</center>');
        Ext.getCmp(prototype.id + '-gridCardDataA2291').setTitle('<center style="font-size:12px;">' + 'Bank Reconciliation' + '</center>');
    },
    SetOnGridDetCardA2290: function() {
        win.lblUser_toolTip("Estructura: A2290 - A2291");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardA2290'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailCard;
                },
                load: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-boxCardData').setTitle('<center style="font-size:12px;">' + ' Sale Date : ' + data.IN_SDATE + ' - ' + 'Card: ' + data.IN_CARDN + ' - ' + 'Authorizacion Code: ' + data.IN_SAUTHOC + '</center>');

                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridCardDataA2290').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridCardDataA2290').setStore(storeGridDatas);
    },
    SetOnGridDetCardA2291: function() {
        win.lblUser_toolTip("Estructura: A2290 - A2291");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardA2291'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailCard;
                },
                load: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        //Ext.getCmp(prototype.id + '-boxCardData').setTitle('<center style="font-size:12px;">' + ' Sale Date : ' + data.IN_SDATE + ' - ' + 'Card: ' + data.IN_CARDN + ' - ' + 'Authorizacion Code: ' + data.IN_SAUTHOC + '</center>');

                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridCardDataA2291').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridCardDataA2291').setStore(storeGridDatas);
    },
    showTicket: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        console.log('RowData');
        console.log(rowData.data);
        me.viewMasterTkt(rowData.data);
    },
    viewMasterTkt: function(data) {

        prototypeProgram.view = 'payments-last-conciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Last Conciliation with Sales';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = data.CCIA;
        beanProMasterTicket.IN_FORMA = data.FORMA;
        beanProMasterTicket.IN_SERIE = data.SERIE;
        beanProMasterTicket.IN_SEQ = data.SEQRO;


        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    getPDF: function(grid, rowIndex, colIndex) {

        this.beanDetail = grid.getStore().getAt(rowIndex).data;

        this.beanDetCard.IN_SDATE = this.beanDetail.SDATE;
        this.beanDetCard.IN_CARDN = this.beanDetail.SCARDN;
        this.beanDetCard.IN_SAUTHOC = this.beanDetail.SAUTHOC;
        console.log(this.beanDetCard)
        me.paramsDetailCard.beanString = JSON.stringify(this.beanDetCard);

        global.getFile(prototype.url + '/getPDF?beanString=' + me.paramsDetailCard.beanString);

        setTimeout(function() {
            me.btnSearch_click();
        }, 4000);

        //setTimeout(this.btnSearch_click(), 5000);

    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log(rec);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.LastConciliationForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry,
                lstCard: me.lstCard,
                lstBank: me.lstBank
            }
        }).show();
    },
    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
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
        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        Ext.getCmp(prototype.id + '-cmbSVFOPSG').setValue('+');
        Ext.getCmp(prototype.id + '-txtPNR').setValue('');
        Ext.getCmp(prototype.id + '-txtSAGENT').setValue('');
        Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
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
    btnMassiveEmission_click: function(obj, e){
        Ext.create('Ext.Praxis.view.payments.LastConciliationForm.DataEntryMassiveEmission', {
            id: prototype.id + '-dataEntryMassiveEmission' }).show();
    },
    exportExcel: function() {
        me.bean = {};
        this.setFormatParameter();
        if (dup) {
            me.bean.strOrden = '1';
            me.paramsDetail.beanString = JSON.stringify(me.bean);
        } else {
            me.bean.strOrden = '0';
            me.paramsDetail.beanString = JSON.stringify(me.bean);
        }

        switch (me.panelActual) {
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + me.paramsDetail.beanString);
                break;

        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
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
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
            case '-boxMainDataDupli':
                me.pagginActual = '-paggin2';
                break;
        }
    },
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
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
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
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
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
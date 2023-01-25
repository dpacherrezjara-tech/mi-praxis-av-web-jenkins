/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.SourceControl.SourceControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SourceControlController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    dataGrid: [],
    init: function(view) {
        me = this;
        prototype.id = 'SourceControlForm';
        prototype.url = CONTEXTPATH + '/SourceControl';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#SourceControlForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#SourceControlForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#SourceControlForm-btnClear': {
                click: this.btnClear_click
            },
            '#SourceControlForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#SourceControlForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#SourceControlForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#SourceControlForm-btnBack': {
                click: this.btnBack_click
            },
//            '#SourceControlForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
//                select: this.selectComboFromYear
//            },
//            '#SourceControlForm-cmbDateToYear': {
//                afterrender: this.afterRenderYear
//            },
            '#SourceControlForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
            },
            '#SourceControlForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
//                select: this.selectComboToMonth
            },
            '#SourceControlForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        
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
    cbxDateFromMonth_Change: function() {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    obtainData: function() {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(false);
        var storeComboDataDay = win.getStoreDays(true);
        
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('0' + month);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('0' + month);
        } else {
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue((month));
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue((month));
        }

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('12');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');


        var cmbSource = Ext.getCmp(prototype.id + '-cmbSource');
        cmbSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["S", "Sales"],
                ["R", "Refund"]
            ]
        }));
        cmbSource.setValue("S");

        this.dataObtain.SOURCEA1691 = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...'),
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-centerC').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.lstSOURCEA1691 = res.lstSOURCEA1691;
                    Ext.getCmp(prototype.id + '-cmbSourceNom').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstSOURCEA1691, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-cmbSourceNom').setValue('A1692');
                    me.btnSearch_click();
                } else
                    global.Msg({msg: res.sesion});
            }
        });

    },
    setFormatParameter: function() {

        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        me.bean.NOMFILE = Ext.getCmp(prototype.id + '-cmbSourceNom').getValue();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
//        console.log(searchParams);
    },
    btnSearch_click: function(obj, e) {
        this.setGridData();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: A2366");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

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
                        if (obj.data.length === 0) {
                            global.Msg({msg: 'Data not found.'});
                            Ext.getCmp(prototype.id + '-tot_QCPNOD').setText('');
                            Ext.getCmp(prototype.id + '-tot_QCPNVC').setText('');
                            Ext.getCmp(prototype.id + '-tot_QCPNOCR').setText('');
                            Ext.getCmp(prototype.id + '-tot_QCPNMA').setText('');
                            Ext.getCmp(prototype.id + '-tot_QCPNTOT').setText('');
                        } else {
                            me.dataGrid = obj.data;
                            var data = obj.data.items[0].data;
                            var title = 'Total Control : ' + Ext.util.Format.number(data.totORACLE, '0,000') + '\t Create Date : ' + data.strFormatDate2;

                            Ext.getCmp(prototype.id + '-columnTitle').setText(title);
                            Ext.getCmp(prototype.id + '-tot_QCPNOD').setText(Ext.util.Format.number(data.totQCPNOD, '0,000'));
                            Ext.getCmp(prototype.id + '-tot_QCPNVC').setText(Ext.util.Format.number(data.totQCPNVC, '0,000'));
                            Ext.getCmp(prototype.id + '-tot_QCPNOCR').setText(Ext.util.Format.number(data.totQCPNOCR, '0,000'));
                            Ext.getCmp(prototype.id + '-tot_QCPNMA').setText(Ext.util.Format.number(data.totQCPNMA, '0,000'));
                            Ext.getCmp(prototype.id + '-tot_QCPNTOT').setText(Ext.util.Format.number(data.totQCPNTOT, '0,000'));
                            me.reg99 = data.totORACLE;
                            me.imgCant_clickHandler();
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAirport').bindStore(storeGridDatas);
            
        }
    },
    imgCant_clickHandler: function() {
        Ext.Ajax.request({
            url: prototype.url + '/searchCant',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: searchParams.beanString},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var cant = res.listaCompleteDetail;
                    var msg = '';
                    if (me.reg99 !== cant) {
                        msg = 'The amounts are different' + '\n' + 'Recod = ' + Ext.util.Format.number(me.reg99, '0,000') + '\n' + 'Record Table =' + Ext.util.Format.number(cant, '0,000');
                        global.Msg({msg: msg});
                    }
                } else {
                    global.Msg({msg: res.msg});
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
        this.winDataEntry('I');
    },
//    onEditClick: function(grid, rowIndex, colIndex) {
//        var rec = grid.getStore().getAt(rowIndex);
//        this.winDataEntry('U', rec);
//    },
    onEditClick: function(rowIndex) {
        var rec = me.dataGrid.items[rowIndex];
        console.log(rec);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.SourceControlForm.DataEntry', {
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
            //me.setWidthPie();

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
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('S');
        Ext.getCmp(prototype.id + '-cmbSourceNom').setValue('A1692');

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
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
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
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
}
);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.Waiver.WaiverController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.WaiverController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        me = this;
        prototype.id = 'WaiverForm';
        prototype.url = CONTEXTPATH + '/Waiver';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#WaiverForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#WaiverForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#WaiverForm-btnClear': {
                click: this.btnClear_click
            },
            '#WaiverForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#WaiverForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#WaiverForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#WaiverForm-btnBack': {
                click: this.btnBack_click
            },
            '#WaiverForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#WaiverForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#WaiverForm-btn-pag-next': {
                click: this.pagNext
            },
            '#WaiverForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------    
            '#WaiverForm-cmbType': {
                change: this.onChangeCmbType
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        //this.btnSearch_click();
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
    setStoreData: function() {

        var cmbType = Ext.getCmp(prototype.id + '-cmbType');
        cmbType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "Request Date"],
                ["2", "Rfnd Date"],
                ["3", "Emission Date"],
                ["4", "Flown Date"],
                ["5", "System Date"],
                ["6", "Iata Date"],
                ["7", "Ticket"],
                ["8", "Tour Code"]
            ]
        }));
        cmbType.setValue('');
        var cmbstatus = Ext.getCmp(prototype.id + '-cmbstatus');
        cmbstatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["0", "Active"],
                ["1", "Inactive"]
            ]
        }));
        cmbstatus.setValue('');
    },
    setFormatParameter: function() {

        me.bean = {};
        me.bean.VP_FILTER = Ext.getCmp(prototype.id + '-cmbType').getValue();
        me.bean.VP_IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        me.bean.VP_Frma = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substring(0, 4);
        me.bean.VP_Serie = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue().substring(4, 10);
        me.bean.VP_TourCode = Ext.getCmp(prototype.id + '-Tour').getValue();
        me.bean.VP_Country = Ext.getCmp(prototype.id + '-Country').getValue();
        me.bean.A2537STAT = Ext.getCmp(prototype.id + '-cmbstatus').getValue();

        me.bean.VP_Request1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-Request1').getValue(), 'Ymd');
        me.bean.VP_Request2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-Request2').getValue(), 'Ymd');
        me.bean.VP_Rfnd1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-Rfnd1').getValue(), 'Ymd');
        me.bean.VP_Rfnd2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-Rfnd2').getValue(), 'Ymd');
        me.bean.VP_Emission1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-Emission1').getValue(), 'Ymd');
        me.bean.VP_Emission2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-Emission2').getValue(), 'Ymd');
        me.bean.VP_Flown1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-Flown1').getValue(), 'Ymd');
        me.bean.VP_Flown2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-Flown2').getValue(), 'Ymd');
        me.bean.VP_System1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-System1').getValue(), 'Ymd');
        me.bean.VP_System2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-System2').getValue(), 'Ymd');

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(me.bean);
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: A2537");

        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.salesAudit.GridData', {
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
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>



    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;


        return msj;
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.salesaudit.WaiverForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
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
        Ext.getCmp(prototype.id + '-cmbType').setValue('');
        Ext.getCmp(prototype.id + '-Request1').setValue('');
        Ext.getCmp(prototype.id + '-Request2').setValue('');
        Ext.getCmp(prototype.id + '-Rfnd1').setValue('');
        Ext.getCmp(prototype.id + '-Rfnd2').setValue('');
        Ext.getCmp(prototype.id + '-Emission1').setValue('');
        Ext.getCmp(prototype.id + '-Emission2').setValue('');
        Ext.getCmp(prototype.id + '-Flown1').setValue('');
        Ext.getCmp(prototype.id + '-Flown2').setValue('');
        Ext.getCmp(prototype.id + '-System1').setValue('');
        Ext.getCmp(prototype.id + '-System2').setValue('');
        Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        Ext.getCmp(prototype.id + '-txtCia').setValue('');
        Ext.getCmp(prototype.id + '-txtFrmaSerie').setValue('');
        Ext.getCmp(prototype.id + '-txtFrmaSerie').setValue('');
        Ext.getCmp(prototype.id + '-Tour').setValue('');
        Ext.getCmp(prototype.id + '-Country').setValue('');
        Ext.getCmp(prototype.id + '-cmbstatus').setValue('');

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
        var option = Ext.getCmp(prototype.id + '-panelFilters1');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
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


});

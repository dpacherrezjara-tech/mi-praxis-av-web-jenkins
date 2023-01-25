/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.ITBulk.ITBulkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ITBulkController',
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
        prototype.id = 'ITBulkForm';
        prototype.url = CONTEXTPATH + '/ITBulk';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#ITBulkForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ITBulkForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ITBulkForm-btnClear': {
                click: this.btnClear_click
            },
            '#ITBulkForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ITBulkForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ITBulkForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ITBulkForm-btnBack': {
                click: this.btnBack_click
            },
            '#ITBulkForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ITBulkForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ITBulkForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ITBulkForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------    
            '#ITBulkForm-cbxFiltro': {
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

        switch (value) {
            case 'I':
                Ext.getCmp(prototype.id + '-panelFilter1').show();
                Ext.getCmp(prototype.id + '-txtcampo').show();
                Ext.getCmp(prototype.id + '-txtSeq').show();

                break;
            case 'T':
                Ext.getCmp(prototype.id + '-panelFilter1').show();
                Ext.getCmp(prototype.id + '-txtcampo').show();
                Ext.getCmp(prototype.id + '-txtSeq').hide();

                break;
            case 'C':
                Ext.getCmp(prototype.id + '-panelFilter1').show();
                Ext.getCmp(prototype.id + '-txtcampo').show();
                Ext.getCmp(prototype.id + '-txtSeq').hide();

                break;
            case 'D':
                Ext.getCmp(prototype.id + '-panelFilter2').show();
                break;
            case 'A':
                Ext.getCmp(prototype.id + '-panelFilter1').show();
                Ext.getCmp(prototype.id + '-txtcampo').show();
                Ext.getCmp(prototype.id + '-txtSeq').hide();
                break;

        }



    },
    setStoreData: function() {

        var cbxFiltro = Ext.getCmp(prototype.id + '-cbxFiltro');
        cbxFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["I", "ID"],
                ["T", "Type"],
                ["C", "Tour Code"],
                ["D", "Effective Date"],
                ["A", "IATA"]
            ]
        }));
        cbxFiltro.setValue('');

    },
    setFormatParameter: function() {

        me.bean = {};
        var selectedValue = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var txtcampo = Ext.getCmp(prototype.id + '-txtcampo').getValue();
        var txtFilterDateFrom = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue(), 'Ymd');
        var txtFilterDateTo = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue(), 'Ymd');
        me.bean.VP_OPCION = '';
        me.bean.VP_A2644ID = '';
        me.bean.VP_A2644TIPO = '';

        if (selectedValue === '') {
            me.bean.VP_OPCION = '';
            me.bean.VP_A2644ID = '';
            me.bean.VP_A2644TIPO = '';
        } else if (selectedValue === 'I' && txtSeq !== '') {
            me.bean.VP_OPCION = 'Q';
            me.bean.A2644SEQ = txtSeq;
            me.bean.VP_A2644ID = txtcampo;
        } else if (selectedValue === 'T') {
            me.bean.VP_OPCION = 'T';
            me.bean.VP_A2644TIPO = txtcampo;
        } else if (selectedValue === 'I' && txtSeq === "") {
            me.bean.VP_OPCION = 'I';
            me.bean.VP_A2644ID = txtcampo;
        } else if (selectedValue === 'D' && txtSeq.text === "") {
            me.bean.VP_OPCION = 'D';
            me.bean.VP_A2644ID = txtFilterDateFrom;
            me.bean.VP_A2644TIPO = txtFilterDateTo;
        } else if (selectedValue === 'A') {
            me.bean.VP_OPCION = 'A';
            me.bean.VP_A2644TCODE = txtcampo;
        } else {
            me.bean.VP_OPCION = 'C';
            me.bean.VP_A2644TCODE = txtcampo;
        }

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
        win.lblUser_toolTip("Estructura: A2644");

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
        if (bean.VP_OPCION === 'D') {
            if (bean.VP_A2644ID === "" || bean.VP_A2644TIPO === "") {
                msj = 'Insert Ranges of Dates';
            }
        }
        if (bean.VP_OPCION === 'A') {
            if (bean.VP_A2644TCODE === "") {
                msj = 'Insert IATA';
            }
        }

        return msj;
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        var rec2 = rowData.data;
        var bean = {};
        bean.VP_A2644ID = rowData.data.A2644ID;
        bean.VP_A2644SEQ = rowData.data.A2644SEQ;
        bean.A2644ID = rowData.data.A2644ID;
        bean.A2644FAMI = rowData.data.A2644FAMI;
        bean.A2644SFAMI = rowData.data.A2644SFAMI;
        bean.A2644SEQ = rowData.data.A2644SEQ;
        bean.A2644TIPO = rowData.data.A2644TIPO;
        bean.A2644INDIC = rowData.data.A2644INDIC;
        bean.A2643TCODE = rowData.data.A2643TCODE;
        var beanString = JSON.stringify(bean);
        me.paramsDetail = {
            bean: bean,
            beanString: beanString
        };
        console.log(me.paramsDetail);
        Ext.Ajax.request({
            url: prototype.url + '/searchDetalle',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...')
                var res = Ext.JSON.decode(response.responseText);
                var rec = {};
                rec.data = res.beanDetalle;
                rec.data2 = rec2;
                me.winDataEntry('U', rec);
            }
        });



    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.salesaudit.ITBulkForm.DataEntry', {
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

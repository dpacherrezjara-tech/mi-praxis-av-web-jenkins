/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ControlProcess.ControlProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ControlProcessController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'ControlProcessForm';
        prototype.url = CONTEXTPATH + '/ControlProcess';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ControlProcessForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ControlProcessForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ControlProcessForm-btnClear': {
                click: this.btnClear_click
            },
            '#ControlProcessForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ControlProcessForm-btnBack': {
                click: this.btnBack_click
            },
            '#ControlProcessForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ControlProcessForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ControlProcessForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ControlProcessForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ControlProcessForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            

            '#ControlProcessForm-txt_A1530PSVTA': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
//      this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue('');

        var cmb_TIPO = Ext.getCmp(prototype.id + '-cmb_TIPO');
        cmb_TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Ending Date"],
                ["2", "Processing Date"]

            ]
        }));
        cmb_TIPO.setValue("1");

        var cbm_A1530FUENT = Ext.getCmp(prototype.id + '-cbm_A1530FUENT');
        cbm_A1530FUENT.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["ARC", "ARC"],
                ["BSP", "BSP"],
                ["ASR", "ASR"]

            ]
        }));
        cbm_A1530FUENT.setValue("ARC");

    },
    btnSearch_click: function(obj, e) {
        //this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {

        var year = Ext.getCmp(prototype.id + '-cmbDateYear').getValue();
        var month = Ext.getCmp(prototype.id + '-cmbDateMonth').getValue();
        var VP_FECHA = year + month;
        var VP_TIPO = Ext.getCmp(prototype.id + '-cmb_TIPO').getValue();
        var VP_A1530FUENT = Ext.getCmp(prototype.id + '-cbm_A1530FUENT').getValue();
        var VP_A1530PSVTA = Ext.getCmp(prototype.id + '-txt_A1530PSVTA').getValue().trim();

        searchParams = {
            VP_FECHA: VP_FECHA,
            VP_TIPO: VP_TIPO,
            VP_A1530FUENT: VP_A1530FUENT,
            VP_A1530PSVTA: VP_A1530PSVTA,
            year: year,
            month: month
        };
        console.log(searchParams);
    },
    setGridData: function(obj, val) {
        //win.lblUser_toolTip("Estructura: A2024");
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
//                        var pag = Ext.getCmp(prototype.id + '-paggin');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
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
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    validateFields: function() {
        var msj = '';
        console.log(searchParams.VP_FECHA);
        if (searchParams.VP_FECHA === '') {
            msj = 'PARAMETER REQUIRED, YEAR AND MONTH';
        }
        return msj;
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmb_TIPO').setValue('1');
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue('');
        Ext.getCmp(prototype.id + '-cbm_A1530FUENT').setValue('ARC');
        Ext.getCmp(prototype.id + '-txt_A1530PSVTA').setValue('');
    },
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
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
        global.getFile(prototype.url + '/getXLSX?VP_FECHA=' + searchParams.VP_FECHA
                + '&VP_TIPO=' + searchParams.VP_TIPO
                + '&VP_A1530FUENT=' + searchParams.VP_A1530FUENT
                + '&VP_A1530PSVTA=' + searchParams.VP_A1530PSVTA
                + '&year=' + searchParams.year
                + '&month=' + searchParams.month
                );
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    onDetailNotAssigned: function(obj, metaData, rowNum, column, obj2, rowData) {
        var data = rowData.data;

//        if (data.VL_GROUP_NOT_ASIG === 0) {
//            global.Msg({
//                msg: 'Data not found.'
//            });
//        } else {
        Ext.create('Ext.Praxis.view.sales.ControlProcessForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                data: data,
                searchParams: searchParams
            }
        }).show();
//       } 
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
    }



});

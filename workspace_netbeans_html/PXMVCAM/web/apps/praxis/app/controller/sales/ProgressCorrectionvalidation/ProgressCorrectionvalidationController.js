/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ProgressCorrectionvalidation.ProgressCorrectionvalidationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProgressCorrectionvalidationController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    init: function(view) {
        prototype.id = 'ProgressCorrectionvalidationForm';
        prototype.url = CONTEXTPATH + '/ProgressCorrectionvalidation';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ProgressCorrectionvalidationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ProgressCorrectionvalidationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ProgressCorrectionvalidationForm-btnClear': {
                click: this.btnClear_click
            },
            '#ProgressCorrectionvalidationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ProgressCorrectionvalidationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ProgressCorrectionvalidationForm-btnBack': {
                click: this.btnBack_click
            },
            '#ProgressCorrectionvalidationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ProgressCorrectionvalidationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ProgressCorrectionvalidationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ProgressCorrectionvalidationForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#ProgressCorrectionvalidationForm-cmbTypeDate': {
                change: this.onChangeSearch
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        //this.btnSearch_click();
        win.lblUser_toolTip("Estructura: A1530,A1720");
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
        var cmbTypeDate = Ext.getCmp(prototype.id + '-cmbTypeDate');
        cmbTypeDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["2", "Processing Date"],
                ["3", "Ending From"],
                ["1", "Ending To"]
            ]
        }));
        cmbTypeDate.setValue("2");
        var cmbSource = Ext.getCmp(prototype.id + '-cmbSource');
        cmbSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["ARC", "ARC"],
                ["BSP", "BSP"],
                ["ASR", "ASR"],
                ["MAN", "MAN"]
            ]
        }));
        cmbSource.setValue("");
    },
    onChangeSearch: function(obj, value) {
        this.clearField();
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);

    },
    setFormatParameter: function() {

        var VP_TIPO = Ext.getCmp(prototype.id + '-cmbTypeDate').getValue();
        var VP_A1530FUENT = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        var VP_A1530STPRO = Ext.getCmp(prototype.id + '-rbgCtlStpro').lastValue.rb;
        var VP_FECHA_00 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtTypeOfDate_00').getValue(), 'Ymd');
        var VP_FECHA_01 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtTypeOfDate_01').getValue(), 'Ymd');

        searchParams = {
            VP_TIPO: VP_TIPO,
            VP_A1530FUENT: VP_A1530FUENT,
            VP_A1530STPRO: VP_A1530STPRO,
            VP_FECHA_00: VP_FECHA_00,
            VP_FECHA_01: VP_FECHA_01
        };

        console.log(searchParams);
    },
    setGridData: function(obj, val) {
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
    validateFields: function() {
        var msj = '';
        if (searchParams.VP_FECHA_00 === '' || searchParams.VP_FECHA_01 === '') {
            msj = 'Required Field Date';
        }
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
        Ext.create('Ext.Praxis.view.sales.ProgressCorrectionvalidationForm.DataEntry', {
            id: prototype.id + '-DataEntryProgressCorrectionvalidationForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbTypeDate').setValue('2');
        this.clearField();
    },
    clearField: function() {
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        Ext.getCmp(prototype.id + '-txtTypeOfDate_00').setValue('');
        Ext.getCmp(prototype.id + '-txtTypeOfDate_01').setValue('');
        Ext.getCmp(prototype.id + '-rbgCtlStpro').setValue({rb: ''});
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
        global.getFile(prototype.url + '/getXLSX?VP_TIPO=' + searchParams.VP_TIPO
                + '&VP_A1530FUENT=' + searchParams.VP_A1530FUENT
                + '&VP_A1530STPRO=' + searchParams.VP_A1530STPRO
                + '&VP_FECHA_00=' + searchParams.VP_FECHA_00
                + '&VP_FECHA_01=' + searchParams.VP_FECHA_01
                );
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
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
    }



});
